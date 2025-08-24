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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-[#1E3A8A] p-4 rounded-lg shadow-md">
  {/* Title */}
  <h1 className="text-lg font-semibold text-white">Transactions</h1>

  {/* Filters */}
  <ToggleGroup
    className="bg-white rounded-lg shadow-md p-2 flex flex-wrap justify-center sm:align-center gap-2"
    type="single"
    value={filter}
    onValueChange={(val) => val && setFilter(val)}
  >
    <ToggleGroupItem
      value="all"
      className="data-[state=on]:bg-blue-500 data-[state=on]:text-white data-[state=on]:shadow-md transition rounded-xl px-3 py-1 text-sm sm:px-4 sm:py-2"
    >
      All
    </ToggleGroupItem>
    <ToggleGroupItem
      value="lending"
      className="data-[state=on]:bg-blue-500 data-[state=on]:text-white data-[state=on]:shadow-md transition rounded-xl px-3 py-1 text-sm sm:px-4 sm:py-2"
    >
      Lending
    </ToggleGroupItem>
    <ToggleGroupItem
      value="payment"
      className="data-[state=on]:bg-blue-500 data-[state=on]:text-white data-[state=on]:shadow-md transition rounded-xl px-3 py-1 text-sm sm:px-4 sm:py-2"
    >
      Payment
    </ToggleGroupItem>
  </ToggleGroup>

  {/* Search + Button */}
  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
    <Input
      placeholder="Search name..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="text-black bg-white w-full sm:w-48"
    />

    <Button
      asChild
      className="bg-[#FFFDEB] rounded-lg shadow-md text-[#1E3A8A] hover:bg-[#FFFFFF] hover:text-[#1E3A8A] w-full sm:w-auto"
    >
      <Link href="/transactions/create">Create Transaction</Link>
    </Button>
  </div>
</div>


      <Table>
        <TableHeader>
          <TableRow className="bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]">
            <TableHead className="text-white">Borrower</TableHead>
            <TableHead className="text-white">Type</TableHead>
            <TableHead className="text-white">Amount</TableHead>
            <TableHead className="text-white">Date</TableHead>
            <TableHead className="text-white text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((t) => (
            <TableRow key={t.id}>
              <TableCell>
                <Link
                //TODO: Update this link to point to the borrower's detail page
                  href={`/borrower/${t.borrower.id}`}
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
