'use client'

type Borrower = {
  name: string
  totalDebt: number
  status: 'Active' | 'Cleared' | 'Delinquent'
}

// Sample data for demonstration purposes
// In a real application, this would be fetched from an API or database

const sampleBorrowers: Borrower[] = [
  { name: 'Juan Dela Cruz', totalDebt: 5000, status: 'Active' },
  { name: 'Maria Santos', totalDebt: 2000, status: 'Cleared' },
  { name: 'Pedro Reyes', totalDebt: 10000, status: 'Delinquent' },
]

export default function BorrowerList() {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-lg font-semibold mb-2 text-black">Top Borrowers</h2>
      <ul className="space-y-3">
        {sampleBorrowers.map((b, i) => (
          <li key={i} className="flex justify-between">
            <div>
              <div className="font-medium text-black">{b.name}</div>
              <div className="text-sm text-black">{b.status}</div>
            </div>
            <div className="font-semibold text-black">₱{b.totalDebt.toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
