'use client'

import AddRecordDialog from './AddRecordDialog'

export default function TopNav() {
  return (
    <header className="w-full p-4 bg-white shadow flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">Lending Tracker</h1>
      <div className="text-sm text-gray-600">v0.1.0</div>
      <AddRecordDialog/>
    </header>
  )
}
