// app/dashboard/page.tsx
import { Progress } from "./components/ui/progress";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold text-gray-700">Total Borrowers</h2>
          <p className="text-2xl font-bold text-blue-600">25</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold text-gray-700">Active Loans</h2>
          <p className="text-2xl font-bold text-green-600">12</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold text-gray-700">Total Lent</h2>
          <p className="text-2xl font-bold text-purple-600">₱45,000</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold text-gray-700">Payments Received</h2>
          <p className="text-2xl font-bold text-emerald-600">₱28,300</p>
        </div>
      </div>

      {/* Loan Repayment Progress */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Loan Repayment Progress</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">John Doe - ₱10,000 / ₱15,000</p>
            <Progress value={(10000 / 15000) * 100} />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Jane Smith - ₱5,000 / ₱5,000</p>
            <Progress value={100} />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Carlos Reyes - ₱2,500 / ₱8,000</p>
            <Progress value={(2500 / 8000) * 100} />
          </div>
        </div>
      </div>
    </div>
  );
}
