"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const dummyTransactions = [
  {
    id: 1,
    borrower: "Juan Dela Cruz",
    amount: "₱5,000",
    date: "2025-08-01",
    status: "Pending",
  },
  {
    id: 2,
    borrower: "Maria Clara",
    amount: "₱3,200",
    date: "2025-07-28",
    status: "Paid",
  },
  {
    id: 3,
    borrower: "Jose Rizal",
    amount: "₱10,000",
    date: "2025-07-20",
    status: "Overdue",
  },

  {
    id: 4,
    borrower: "Juan Dela Cruz",
    amount: "₱25,000",
    date: "2025-03-21",
    status: "Cleared"
  }
]

export default function TransactionsPage() {
  const [search, setSearch] = useState("")

  const filteredTransactions = dummyTransactions.filter((tx) =>
    tx.borrower.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4">
      <div className="mb-4">
        <Input
          placeholder="Search by borrower name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm text-white"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">Borrower</TableHead>
            <TableHead className="text-white">Amount</TableHead>
            <TableHead className="text-white">Date</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-righ text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((tx) => (
            <TableRow key={tx.id} className="text-white">
              <TableCell>{tx.borrower}</TableCell>
              <TableCell>{tx.amount}</TableCell>
              <TableCell>{tx.date}</TableCell>
              <TableCell>{tx.status}</TableCell>
              <TableCell className="text-right text-black">
                <Button variant="outline" size="sm">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
