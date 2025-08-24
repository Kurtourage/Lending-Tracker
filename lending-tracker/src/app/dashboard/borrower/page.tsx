'use client';
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const colors = {
  primary: "#1E3A8A",
  primaryLight: "#3B82F6",
  cream: "#FFFDEB",
}

type Borrower = {
  id: number;
  name: string;
  phone: string;
  totalLoan: number;
  status: 'Active' | 'Inactive';
};

// Dummy data for now
const dummyBorrowers: Borrower[] = [
  { id: 1, name: 'Juan Dela Cruz', phone: '09171234567', totalLoan: 15000, status: 'Active' },
  { id: 2, name: 'Maria Clara', phone: '09181234567', totalLoan: 25000, status: 'Active' },
  { id: 3, name: 'Pedro Penduko', phone: '09191234567', totalLoan: 10000, status: 'Inactive' },
  { id: 4, name: 'Jose Rizal', phone: '09981234567', totalLoan: 35000, status: 'Active' },
  { id: 5, name: 'Andres Bonifacio', phone: '09221234567', totalLoan: 20000, status: 'Active' },
  { id: 6, name: 'Emilio Aguinaldo', phone: '09172234567', totalLoan: 5000, status: 'Inactive' },
  { id: 7, name: 'Melchora Aquino', phone: '09183334567', totalLoan: 15000, status: 'Active' },
  { id: 8, name: 'Gregoria de Jesus', phone: '09194444567', totalLoan: 22000, status: 'Inactive' },
  { id: 9, name: 'Apolinario Mabini', phone: '09175555567', totalLoan: 18000, status: 'Active' },
  { id: 10, name: 'Antonio Luna', phone: '09176666567', totalLoan: 30000, status: 'Active' },
];

export default function BorrowerPage() {
  const [search, setSearch] = useState('');

  const filtered = dummyBorrowers.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 bg-[#FFFDEB] min-h-screen">
      <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md gap-4">
        <h1 className="text-2xl font-bold text-[#1E3A8A]">Borrowers</h1>

        <Input
          placeholder="Search borrowers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]">
            <TableHead className="text-white">Name</TableHead>
            <TableHead className="text-white">Contact details</TableHead>
            <TableHead className="text-white">Total Loan</TableHead>
            <TableHead className="text-white">Status</TableHead>
            
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((borrower) => (
            <TableRow key={borrower.id}>
              <TableCell>
                <Link
                //TODO: Update this link to point to the borrower's detail page
                  href={`/borrower/${borrower.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {borrower.name}
                </Link>
              </TableCell>
              <TableCell>{borrower.phone}</TableCell>
              <TableCell>₱{borrower.totalLoan.toLocaleString()}</TableCell>
              <TableCell>{borrower.status}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
