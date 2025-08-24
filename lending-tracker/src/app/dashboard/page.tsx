'use client'

import { Card, CardContent } from "@/components/ui/card";
import { CircleGauge, Users, HandCoins, CheckCircle, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AnimatedCircularProgress } from "./components/ui/AnimatedCircularProgress";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AddRecordDialog from "../components/AddRecordDialog";
import PaymentCalendar from "../components/PaymentCalendar";
import { start } from "repl";

export default function Dashboard() {
  const [openDialog, setOpenDialog] = useState(false);
  const loans = [
    {
      id: 1,
      borrower: 'Juan Dela Cruz',
      startDate: new Date(2025, 4, 15), // May 15, 2025
      amount: 2000,
      months: 4,
    },
    {
      id: 2,
      borrower  : 'Maria Clara',
      startDate: new Date(2025, 5, 1), // June 1, 2025
      amount: 3000,
      months: 6,  
    },
    {
      id: 3,
      borrower: 'Maria Clara',
      startDate: new Date(2025, 2, 22 ), // March 22, 2025
      amount: 5000,
      month: 5
    }

  ]
  

  return (
    <div className="min-h-screen p-4 text-[#1E3A8A] space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Lending Dashboard</h1>
        <AddRecordDialog open={openDialog} onOpenChange={setOpenDialog} />
       
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-[#1E3A8A]">
        <CardContent className="p-3 sm:p-4 text-white">
          <div className="flex items-center justify-between ml-10 mr-10">
            <div>
              <p className="text-xs sm:text-sm">Total Lent</p>
              <p className="text-lg sm:text-xl font-bold">₱125,000</p>
            </div>
            <HandCoins className="h-10 w-10 sm:h-10 sm:w-10" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1E3A8A]">
        <CardContent className="p-3 sm:p-4 text-white">
          <div className="flex items-center justify-between ml-10 mr-10">
            <div>
              <p className="text-xs sm:text-sm">Total Repaid</p>
              <p className="text-lg sm:text-xl font-bold">₱92,500</p>
            </div>
            <CheckCircle className="h-10 w-10 sm:h-10 sm:w-10" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1E3A8A]">
        <CardContent className="p-3 sm:p-4 text-white">
          <div className="flex items-center justify-between ml-10 mr-10">
            <div>
              <p className="text-xs sm:text-sm">Active Borrowers</p>
              <p className="text-lg sm:text-xl font-bold">34</p>
            </div>
            <Users className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1E3A8A]">
        <CardContent className="p-3 sm:p-4 text-white">
          <div className="flex items-center justify-between ml-10 mr-10">
            <div>
              <p className="text-xs sm:text-sm">Pending Payments</p>
              <p className="text-lg sm:text-xl font-bold">₱21,000</p>
            </div>
            <CircleGauge className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
        </CardContent>
      </Card>
    </div>

    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text">
                <Card className="bg-[#1E3A8A] ">
                  <CardContent className="p-4 space-y-2 text-white">
                    <h2 className="text-lg font-semibold mb-4">Repayment Progress</h2>
                    <div className="flex gap-6 justify-center grid-cols-3 gap-3 items-center">
                      <div className="relative w-20 sm:w-24 md:w-28 lg:w-30 aspect-square">
                        <AnimatedCircularProgress percentage={41} label="" />
                        <h3> August collection</h3>
                      </div>
                      <div className="relative w-20 sm:w-24 md:w-28 lg:w-30 aspect-square">
                        <AnimatedCircularProgress percentage={30} label="" />
                        <h3> Total collection</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#1E3A8A]">
                    <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2 text-white"
            //TODO: Add a link to the borrower's detail page
            //Add live data
            >Recent Transactions</h2> 
            <Table className="text-white">
              
              <TableHeader>
                <TableRow  className=" text-white">
                  <TableHead className=" text-white">Name</TableHead>
                  <TableHead className=" text-white">Amount</TableHead>
                  <TableHead className=" text-white">Date</TableHead>
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
          
            <PaymentCalendar
        
          />
        
      </div>

      
    </div>
  );
}
