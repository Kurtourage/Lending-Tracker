// src/app/borrower/borrower-detail.tsx
type Borrower = {
  id: string;
  name: string;
  status: 'cleared' | 'active';
  transactions: {
    id: string;
    amount: number;
    date: string;
    due: string;
    status: 'unpaid' | 'paid';
  }[];
};

export function BorrowerDetail({ borrower }: { borrower: Borrower }) {
  return (
    <div className="p-4 space-y-2">
      <h2 className="text-lg font-bold">{borrower.name}</h2>
      <p>Status: <span className="capitalize">{borrower.status}</span></p>

      <h3 className="font-semibold mt-4">Transactions:</h3>
      <ul className="space-y-1">
        {borrower.transactions.map((txn) => (
          <li key={txn.id} className="border p-2 rounded-md">
            <p>Amount: ₱{txn.amount}</p>
            <p>Date: {txn.date}</p>
            <p>Due: {txn.due}</p>
            <p>Status: {txn.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
