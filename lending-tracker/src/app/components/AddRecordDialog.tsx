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

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { setDefaultResultOrder } from "dns"

export default function AddRecordDialog() {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [agent, setAgent] = useState('')
  const [interest, setInterest] = useState('')
  const [agent_cut, setAgentCut] = useState('')
  const [installment, setInstallment] = useState('')
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false);

 
  
  const handleSubmit = () => {
    
    if (!name || !amount) {
      setError("Name and amount are required. ")
      return
    }

    if (agent && !agent_cut){
      setError("Agent cut must not be blank")
      return
    }

    console.log("Submitted the following: ",{ name, amount, note, agent, interest, agent_cut, installment })
    // TODO: Hook into API or state
   
      // Show confirmation dialog
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
    
  }

  const handleClose = () => {
    resetForm()
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) =>
      {if (!isOpen){
        resetForm();
      }
      setOpen(isOpen);
    }}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-white hover:bg-primary/90">+ Add Record</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Lending Record</DialogTitle>
          <DialogDescription>Record a new loan or borrower.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Borrower Name</Label>
            <Input id="name" value={name} onChange={e => setName(e.target.value)} />
          </div>
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
            <Input id="agent" value={agent} onChange={e => setAgent(e.target.value)}></Input>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="interest">Interest</Label>
            <Input id="interest" value={interest} onChange={e => setInterest(e.target.value)}></Input>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="agentCut">Agent's Cut in Interest</Label>
            <Input id="agentCut" value={agent_cut} onChange={e => setAgentCut(e.target.value)}></Input>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="installment">Months to Pay</Label>
            <Input id="installment" value={installment} onChange={e => setInstallment(e.target.value)}></Input>
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        <DialogFooter>
          <Button onClick={handleSubmit}>Create Record</Button>
        </DialogFooter>
      </DialogContent>

            <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Record added</AlertDialogTitle>
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
                setOpen(false); // Close the main dialog
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
