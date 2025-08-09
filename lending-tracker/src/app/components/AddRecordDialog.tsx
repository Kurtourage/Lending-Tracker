'use client'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog";

import {CircleCheckBig} from "lucide-react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import BorrowerInput from "./BorrowerInput";
import { NewBorrowerDialog } from "./NewBorrowerDialog";
import { useState } from "react"
import jsPDF from "jspdf";

export default function AddRecordDialog({ type = 'lending' }) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [agent, setAgent] = useState('')
  const [interest, setInterest] = useState('')
  const [agent_cut, setAgentCut] = useState('')
  const [installment, setInstallment] = useState('')
  const [MonthlyDueDate, setMonthlyDueDate] = useState('')
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [matchedBorrower, setMatchedBorrower] = useState(null);
  const [stateChecker, setStateChecker] = useState(false);
  const [showNewBorrowerDialog, setShowNewBorrowerDialog] = useState(false);
 

  const handleNewBorrowerSubmit = (borrower) => {
    // Only set name if provided
    if (borrower.name) {
      setName(borrower.name);
    }
    setMatchedBorrower(borrower); // Set matchedBorrower to the new borrower
    // Only set stateChecker if name is present
    setStateChecker(!!borrower.name);
    setShowNewBorrowerDialog(false); // close the dialog after submit
  };

  const isLending = type === 'lending';

  const handleSubmit = () => {
    setError(""); // Reset error before validation

    // Validate required fields for lending
    if (isLending && (!name || !amount || !MonthlyDueDate || !interest)) {
      setError("Name, amount, interest, and monthly due date are required.");
      return;
    }

    if (agent && !agent_cut) {
      setError("Agent cut must not be blank");
      return;
    }

    // If no matched borrower and no details filled, prompt for new borrower dialog
    if (!matchedBorrower && !stateChecker) {
      setShowNewBorrowerDialog(true);
      return;
    }

    const submittedData = {
      name,
      ...(isLending ? { amount, note, agent, interest, agent_cut, installment, MonthlyDueDate } : {})
    };

    // Generate PDF
   
    const doc = new jsPDF();
    const now = new Date();
     console.log(doc.getFontList());
    doc.setFontSize(16);
    doc.setFont("arial");
    doc.text("Lending Transaction Record", 20, 20);
    doc.setFontSize(12);
    doc.text(`Borrower Name: ${name}`, 20, 40);
    doc.text(`Amount Borrowed: P${amount}`, 20, 50);
    doc.text(`Date of Lending: ${now.toLocaleString()}`, 20, 60);
    doc.text(`Monthly Due Date: ${MonthlyDueDate}`, 20, 70);
    doc.text(`Installment Duration: ${installment}`, 20, 80);
    doc.text(`Interest: ${interest}%`, 20, 90);
    doc.text(`Agent: ${agent && agent.trim() ? agent : "N/A"}`, 20, 100);

    // Show PDF in new tab
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');

    doc.save(`Lending_Record_${name}_${now.getTime()}.pdf`);

    console.log("Submitted the following: ", submittedData);
    setShowConfirmation(true);
  }

  const resetForm = () => {
    setName("")
    setAmount("")
    setNote("")
    setAgent("")
    setInterest("")
    setAgentCut("")
    setInstallment("")
    setError("")
    setMonthlyDueDate("")
    setMatchedBorrower(null);
    setStateChecker(false);
  }

  const handleClose = () => {
    resetForm()
    setOpen(false);
  }

  const handleMatchFound = ({ match, titleCased }) => {
    setMatchedBorrower(match);
    // Only open NewBorrowerDialog if user typed a new name and not on initial dialog open
    if (!match && titleCased && open) {
      setName(titleCased); // Set name only for new borrowers
      setShowNewBorrowerDialog(true); // Show dialog for new borrower
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) resetForm();
      setOpen(isOpen);
    }}>

      <DialogTrigger asChild>
        <Button className="bg-primary text-white hover:bg-primary/90">+ Add Record</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isLending ? 'Add Lending Record' : 'Add Borrower'}</DialogTitle>
          <DialogDescription>
            {isLending ? 'Record a new loan or borrower.' : 'Add a new borrower to your list.'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <BorrowerInput value={name ?? ""} onChange={setName} onMatchFound={handleMatchFound} />
          </div>

          {isLending && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount Lent</Label>
                <Input id="amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="note">Notes</Label>
                <Input id="note" value={note} onChange={e => setNote(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="agent">Agent/Commissioner</Label>
                <Input id="agent" value={agent} onChange={e => setAgent(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="interest">Interest</Label>
                <Input id="interest" type="number" value={interest} onChange={e => setInterest(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="agentCut">Agent's Cut in Interest</Label>
                <Input id="agentCut" value={agent_cut} onChange={e => setAgentCut(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="installment">Months to Pay</Label>
                <Input id="installment" value={installment} onChange={e => setInstallment(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="MonthlyDueDate">Monthly Due Date</Label>
                <Input id="MonthlyDueDate" value={MonthlyDueDate} onChange={e => setMonthlyDueDate(e.target.value)} />
              </div>
            </>
          )}
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <DialogFooter>
          <Button onClick={handleSubmit}>Create Record</Button>
        </DialogFooter>
      </DialogContent>

      <NewBorrowerDialog
        open={showNewBorrowerDialog}
        onClose={() => setShowNewBorrowerDialog(false)}
        name={name}
        onDetailsFilled={handleNewBorrowerSubmit}
      />

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CircleCheckBig className="h-8 w-8 text-green-600" />
                Record added
              </span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to clear the form and close the dialog?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                resetForm();
                setShowConfirmation(false);
                setOpen(false);
              }}
            >
              Yes, clear it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  )
}
