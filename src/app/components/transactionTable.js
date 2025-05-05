import Image from "next/image";

export default function TransactionTable({ data, openTransactionDetail }) {
  return (
    <div className="overflow-x-auto bg-white rounded-t mt-6">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-[var(--neutral-grey1)] border-0 text-left text-black font-medium">
          <tr>
            <th className="px-4 py-3">No Order</th>
            <th className="px-4 py-3">Order Date</th>
            <th className="px-4 py-3">Order Type</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Customer Name</th>
            <th className="px-4 py-3">Detail</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-black border-b border-[var(--neutral-grey1)]">
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-4 py-3">{item.no_order}</td>
              <td className="px-4 py-3">
                {new Date(item.date).toLocaleDateString("id-ID")}
              </td>
              <td className="px-4 py-3">{item.order_type}</td>
              <td className="px-4 py-3">{item.menu_category}</td>
              <td className="px-4 py-3">{item.customer_name}</td>
              <td className="px-4 py-3">
                <button onClick={() => openTransactionDetail(item)}>
                  <Image
                    src="/assets/icons/export.svg"
                    alt="detail"
                    width={18}
                    height={18}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}