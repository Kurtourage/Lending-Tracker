'use client';
import { useState } from "react";
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
  const [selected, setSelected] = useState<Borrower | null>(null);

  const filtered = dummyBorrowers.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 bg-[#FFFDEB] min-h-screen">
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
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
            <TableHead className="text-white">Phone</TableHead>
            <TableHead className="text-white">Total Loan</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((borrower) => (
            <TableRow key={borrower.id}>
              <TableCell>{borrower.name}</TableCell>
              <TableCell>{borrower.phone}</TableCell>
              <TableCell>₱{borrower.totalLoan.toLocaleString()}</TableCell>
              <TableCell>{borrower.status}</TableCell>
              <TableCell className="space-x-2">
                <Button
                  variant="outline"
                  className="border-[#1E3A8A] text-[#1E3A8A] hover:bg-[#3B82F6] hover:text-white"
                  onClick={() => setSelected(borrower)}
                >
                  View
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-500 text-gray-600 hover:bg-gray-200"
                  onClick={() => console.log('Edit', borrower)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selected && (
        <div className="p-4 mt-6 bg-white border border-gray-300 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-[#1E3A8A]">Borrower Details</h2>
          <p><strong>Name:</strong> {selected.name}</p>
          <p><strong>Phone:</strong> {selected.phone}</p>
          <p><strong>Total Loan:</strong> ₱{selected.totalLoan.toLocaleString()}</p>
          <p><strong>Status:</strong> {selected.status}</p>

          <div className="mt-4">
            <Button
              variant="ghost"
              onClick={() => setSelected(null)}
              className="text-red-600 hover:bg-red-100"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}