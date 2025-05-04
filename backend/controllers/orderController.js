// order_controller.js
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
    amountPaid,
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
    !amountPaid ||
    !amountReceived
  ) {
    return res.status(400).json({ message: "Data order atau transaksi tidak lengkap." });
  }

  let connection;
  try {
    connection = await db.getConnection();
    await connection.beginTransaction();

    const noOrder = generateOrderCode();
    const orderDate = new Date();

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
        "pending",
        userId,
      ]
    );
    const orderId = orderResult.insertId;

    // 2. Insert ke tabel order_item
    for (const item of items) {
      await connection.execute(
        "INSERT INTO order_item (order_id, menu_id, quantity, notes, price) VALUES (?, ?, ?, ?, ?)",
        [orderId, item.menuId, item.quantity, item.notes, item.price]
      );
    }

    // 3. Insert ke tabel transactions
    const transactionDate = new Date();
    const [transactionResult] = await connection.execute(
      "INSERT INTO transaction (order_id, amount_change, amount_received, transaction_status, transaction_date) VALUES (?, ?, ?, ?, ?)",
      [orderId, amountPaid, amountReceived, "success", transactionDate]
    );

    // 4. Update status order jadi 'paid'
    await connection.execute("UPDATE `order` SET status = ? WHERE id = ?", [
      "paid",
      orderId,
    ]);

    await connection.commit();
    connection.release();

    res.status(201).json({
      message: "Order dan transaksi berhasil dibuat",
      orderId,
      noOrder,
      transactionId: transactionResult.insertId,
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
