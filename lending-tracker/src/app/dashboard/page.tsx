// app/dashboard/page.tsx
'use client'

import SummaryCard from './components/SummaryCard'
import ProgressBar from '../components/ProgressBar'
import LendingTable from './components/LendingTable'
import BorrowerList from '../components/BorrowerList'
import TopNav from '../components/TopNav'
import { DollarSign, Clock, CheckCircle } from 'lucide-react'

export default function Dashboard() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4"> <TopNav /></h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <SummaryCard title="Total Lent" value="₱25,000" icon={<DollarSign />} color="bg-blue-600" />
        <SummaryCard title="Due" value="₱5,500" icon={<Clock />} color="bg-yellow-500" />
        <SummaryCard title="Collected" value="₱19,500" icon={<CheckCircle />} color="bg-green-600" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="overflow-auto rounded-2xl shadow-md bg-white p-4">
          <h2 className="text-lg font-semibold mb-2">Repayment Progress</h2>
          <ProgressBar label="August Collection" value={78} />
          <ProgressBar label="Loan Repayment" value={43} color="bg-yellow-500" />
        </div>

        {/* Right column placeholder for table or chart */}
        
          <LendingTable />
          <BorrowerList />
        
      </div>
    </main>
  )
}