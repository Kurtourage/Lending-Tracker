// app/components/LendingTable.tsx

type Transaction = {
  id: string
  borrower: string
  amount: number
  dueDate: string
  status: "Paid" | "Due" | "Overdue"
}

const sampleData: Transaction[] = [
  { id: "TX001", borrower: "Juan Dela Cruz", amount: 2500, dueDate: "2025-08-05", status: "Paid" },
  { id: "TX002", borrower: "Maria Santos", amount: 1500, dueDate: "2025-08-10", status: "Due" },
  { id: "TX003", borrower: "Pedro Reyes", amount: 5000, dueDate: "2025-07-30", status: "Overdue" },
]

function getStatusColor(status: string) {
  switch (status) {
    case "Paid":
      return "bg-green-500"
    case "Due":
      return "bg-yellow-500"
    case "Overdue":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

export default function LendingTable() {
  return (
    <div className="overflow-auto rounded-2xl shadow-md bg-white p-4">
      <h2 className="text-lg font-semibold mb-4 text-black">Recent Transactions</h2>
      <table className="min-w-full text-sm text-left">
        <thead className="border-b text-gray-600">
          <tr>
            <th className="px-4 py-2">Borrower</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Due Date</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map(tx => (
            <tr key={tx.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2 font-medium text-black">{tx.borrower}</td>
              <td className="px-4 py-2 text-black">₱{tx.amount.toLocaleString()}</td>
              <td className="px-4 py-2 text-black">{tx.dueDate}</td>
              <td className="px-4 py-2">
                <span className={`text-white text-xs px-2 py-1 rounded-full ${getStatusColor(tx.status)}`}>
                  {tx.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
