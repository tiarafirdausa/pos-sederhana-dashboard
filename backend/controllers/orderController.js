const db = require("../models/db");

function generateOrderCode() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}`;
  return `ORD${timestamp}`;
}

exports.createOrder = async (req, res) => {
  const {
    customerName,
    tableNumber,
    orderType,
    items,
    subtotal,
    tax,
    total,
    userId,
    amountReceived,
  } = req.body;

  console.log("Request body di backend:", req.body);

  if (
    !customerName ||
    !orderType ||
    !items ||
    items.length === 0 ||
    !subtotal ||
    !tax ||
    !total ||
    !userId ||
    !amountReceived
  ) {
    return res
      .status(400)
      .json({ message: "Data order atau transaksi tidak lengkap." });
  }

  let connection;
  try {
    connection = await db.getConnection();
    await connection.beginTransaction();

    const noOrder = generateOrderCode();
    const orderDate = new Date();
    let orderStatus = "pending"; // Default status

    // 1. Insert ke tabel orders
    const [orderResult] = await connection.execute(
      "INSERT INTO `order` (no_order, no_table, date, type, customer_name, sub_total, tax, total, status, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        noOrder,
        tableNumber || null,
        orderDate,
        orderType,
        customerName,
        subtotal,
        tax,
        total,
        orderStatus,
        userId,
      ]
    );
    const orderId = orderResult.insertId;

    // 2. Insert ke tabel order_item dan validasi item
    for (const item of items) {
      if (
        !item.menuId ||
        !item.quantity ||
        item.quantity <= 0 ||
        item.price === undefined
      ) {
        await connection.rollback();
        connection.release();
        return res
          .status(400)
          .json({ message: "Data item order tidak valid." });
      }
      await connection.execute(
        "INSERT INTO order_item (order_id, menu_id, quantity, notes, price) VALUES (?, ?, ?, ?, ?)",
        [orderId, item.menuId, item.quantity, item.notes || null, item.price]
      );
    }

    // 3. Insert ke tabel transactions
    const transactionDate = new Date();
    const amountChange = amountReceived - total;
    const transactionStatus = "success"; 

    const [transactionResult] = await connection.execute(
      "INSERT INTO transaction (order_id, amount_change, amount_received, transaction_status, transaction_date) VALUES (?, ?, ?, ?, ?)",
      [
        orderId,
        amountChange,
        amountReceived,
        transactionStatus,
        transactionDate,
      ]
    );

    // 4. Update status order berdasarkan kecukupan pembayaran
    if (amountReceived >= total) {
      orderStatus = "paid";
    }

    await connection.execute("UPDATE `order` SET status = ? WHERE id = ?", [
      orderStatus,
      orderId,
    ]);

    await connection.commit();
    connection.release();

    res.status(201).json({
      message: "Order dan transaksi berhasil dibuat",
      orderId,
      noOrder,
      transactionId: transactionResult.insertId,
      orderStatus,
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
      connection.release();
    }
    console.error("Gagal membuat order & transaksi:", error);
    res.status(500).json({
      message: "Gagal membuat order dan transaksi",
      error: error.message,
    });
  }
};

exports.getAllOrders = async (req, res) => {
    try {
      const [rows] = await db.execute(`
        SELECT 
          o.id AS order_id,
          o.no_order,
          o.no_table,
          o.date,
          o.type AS order_type,
          o.customer_name,
          o.sub_total,
          o.tax,
          o.total,
          o.status AS order_status,
          o.user_id,
          t.id AS transaction_id,
          t.amount_change,
          t.amount_received,
          t.transaction_status,
          t.transaction_date,
          m.id AS menu_id,
          m.name AS menu_name,
          m.category AS menu_category,
          oi.quantity,
          oi.notes,
          oi.price
        FROM \`order\` o
        LEFT JOIN transaction t ON t.order_id = o.id
        LEFT JOIN order_item oi ON oi.order_id = o.id
        LEFT JOIN menu m ON m.id = oi.menu_id
        ORDER BY o.date DESC
      `);
  
      res.status(200).json({ orders: rows });
    } catch (error) {
      console.error("Error saat mengambil semua order:", error);
      res.status(500).json({
        message: "Terjadi kesalahan server saat mengambil data order lengkap.",
        error: error.message,
      });
    }
  };
  

// Fungsi untuk mengambil order berdasarkan kategori
exports.getOrderStatCategory = async (req, res) => {
  const category = req.params.category; // ambil kategori dari URL
  try {
    const [rows] = await db.execute(
      `
            SELECT 
              m.name AS name,
              SUM(oi.quantity) AS total
            FROM 
              \`order_item\` oi
            JOIN 
              \`order\` o ON oi.order_id = o.id
            JOIN 
              menu m ON oi.menu_id = m.id
            WHERE 
              m.category = ?
            GROUP BY 
              m.name
          `,
      [category]
    );

    res.status(200).json({
      details: rows,
    });
  } catch (err) {
    console.error("Error getOrderStatCategory:", err);
    res.status(500).json({
      message: "Gagal mengambil statistik",
      error: err.message,
    });
  }
};
