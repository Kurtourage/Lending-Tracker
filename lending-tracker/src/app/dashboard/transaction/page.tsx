'use client'
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

const transactions = [
  {
    id: 1,
    borrower: { id: "1", name: "Juan Dela Cruz" },
    type: "Lending",
    amount: 5000,
    date: "2025-08-05",
  },
  {
    id: 2,
    borrower: { id: "2", name: "Maria Clara" },
    type: "Payment",
    amount: 2000,
    date: "2025-08-06",
  },
  {
    id: 3,
    borrower: { id: "3", name: "Pepe Herrera" },
    type: "Lending",
    amount: 1500,
    date: "2025-03-02",
  },
  {
    id: 4,
    borrower: { id: "4", name: "Pepe Herrera" },
    type: "Payment",
    amount: 2000,
    date: "2025-04-03",
  },
  {
    id: 5,
    borrower: { id: "5", name: "Maria Clara" },
    type: "Payment",
    amount: 2000,
    date: "2025-08-06",
  },
  {
    id: 6,
    borrower: { id: "6", name: "Maria Clara" },
    type: "Lending",
    amount: 2000,
    date: "2025-08-06",
  },
  {
    id: 7,
    borrower: { id: "7", name: "Maria Clara" },
    type: "Payment",
    amount: 2000,
    date: "2025-08-06",
  },

];

export default function TransactionsPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState('');

  const filteredTransactions = transactions.filter((t) => {
  const matchesType = filter === "all" || t.type.toLowerCase() === filter;
  const matchesSearch = t.borrower.name.toLowerCase().includes(search.toLowerCase());
  return matchesType && matchesSearch;
});

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between bg-[#1E3A8A] p-4 rounded-lg shadow-md">
        <h1 className="text-lg font-semibold text-white">Transactions</h1>
        <ToggleGroup
          className="bg-white rounded-lg shadow-md p-2"
          type="single"
          value={filter}
          onValueChange={(val) => val && setFilter(val)}
        >
          <ToggleGroupItem value="all"
          className="data-[state=on]:bg-blue-500 data-[state=on]:text-white data-[state=on]:shadow-md transition rounded-xl px-4 py-2" >All</ToggleGroupItem>
          <ToggleGroupItem value="lending"
          className="data-[state=on]:bg-blue-500 data-[state=on]:text-white data-[state=on]:shadow-md transition rounded-xl px-4 py-2">Lending</ToggleGroupItem>
          <ToggleGroupItem value="payment"
          className="data-[state=on]:bg-blue-500 data-[state=on]:text-white data-[state=on]:shadow-md transition rounded-xl px-4 py-2">Payment</ToggleGroupItem>
        </ToggleGroup>
    
      
        
      <Input
        placeholder="Search name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm text-black bg-white"
      />

        <Button asChild className="bg-[#FFFDEB] rounded-lg shadow-md text-[#1E3A8A] hover:bg-[#FFFFFF] hover:text-[#1E3A8A]">
          <Link href="/transactions/create">Create Transaction</Link>
        </Button>
      
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Borrower</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((t) => (
            <TableRow key={t.id}>
              <TableCell>
                <Link
                  href={`/borrowers/${t.borrower.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {t.borrower.name}
                </Link>
              </TableCell>
              <TableCell>{t.type}</TableCell>
              <TableCell>₱{t.amount.toLocaleString()}</TableCell>
              <TableCell>{t.date}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button size="sm" variant="outline">
                  View
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => console.log("Edit", t.id)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
