// app/borrowers/page.tsx

"use client";


import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const mockBorrowers = [
  {
    id: 1,
    name: "Juan Dela Cruz",
    totalBorrowed: 5000,
    lastTransaction: "2025-07-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Maria Clara",
    totalBorrowed: 3000,
    lastTransaction: "2025-06-10",
    status: "Paid",
  },
  // Add more mock data as needed
]

export default function BorrowersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBorrowers = mockBorrowers.filter((borrower) =>
    borrower.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-4 space-y-4 color-white">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Borrowers</h2>
        <Input
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm text-white"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">Name</TableHead>
            <TableHead className="text-white">Total Borrowed</TableHead>
            <TableHead className="text-white">Last Transaction</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBorrowers.map((borrower) => (
            <TableRow key={borrower.id} className="text-white">
              <TableCell>{borrower.name}</TableCell>
              <TableCell>₱{borrower.totalBorrowed.toLocaleString()}</TableCell>
              <TableCell>{borrower.lastTransaction}</TableCell>
              <TableCell>{borrower.status}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button size="sm" variant="outline" className="text-black">View</Button>
                <Button size="sm" variant="ghost">Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
