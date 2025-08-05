'use client'

import { Card, CardContent } from "@/components/ui/card";
import { CircleGauge, Users, HandCoins, CheckCircle, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AnimatedCircularProgress } from "./components/ui/AnimatedCircularProgress";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AddRecordDialog from "../components/AddRecordDialog";

export default function Dashboard() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="min-h-screen bg-cream-white p-4 text-black space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Lending Dashboard</h1>
        <AddRecordDialog open={openDialog} onOpenChange={setOpenDialog} />
       
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Total Lent</p>
                <p className="text-xl font-bold">₱125,000</p>
              </div>
              <HandCoins className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Total Repaid</p>
                <p className="text-xl font-bold">₱92,500</p>
              </div>
              <CheckCircle className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Active Borrowers</p>
                <p className="text-xl font-bold">34</p>
              </div>
              <Users className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Pending Payments</p>
                <p className="text-xl font-bold">₱21,000</p>
              </div>
              <CircleGauge className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        <Card className="bg-blue-100">
          <CardContent className="p-4 space-y-2">
            <h2 className="text-lg font-semibold mb-4">Repayment Progress</h2>
            <div className="flex gap-6">
              <div className="relative w-24 h-24">
                <AnimatedCircularProgress percentage={41} label="August Collection" />
              </div>
              <div className="relative w-24 h-24">
                <AnimatedCircularProgress percentage={30} label="Total Collection" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-100">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Juan Dela Cruz</TableCell>
                  <TableCell>₱2,000</TableCell>
                  <TableCell>Aug 1, 2025</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Maria Clara</TableCell>
                  <TableCell>₱3,500</TableCell>
                  <TableCell>Aug 3, 2025</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      
    </div>
  );
}
