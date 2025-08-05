// components/NewBorrowerDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";

export function NewBorrowerDialog({ open, onClose, name, onDetailsFilled }) {
  const [phone, setPhone] = useState("");
  const [facebook, setFacebook] = useState("");
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  useEffect(() => {
    const hasDetails = phone.trim() !== "" || facebook.trim() !== "";
    setIsSaveEnabled(hasDetails);
  }, [phone, facebook]);

  const handleSave = () => {
    const hasDetails = phone.trim() !== "" || facebook.trim() !== "";
    if (hasDetails) {
      onDetailsFilled?.(true); // Mark as filled

      //TODO: ADD API call to save the new borrower details
      console.log("New borrower details saved:", { name, phone, facebook });
      onClose(); // Close modal
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Details for new borrower</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input value={name ?? ""} disabled />
          <Input
            placeholder="Phone number"
            value={phone ?? ""}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            placeholder="Facebook link"
            value={facebook ?? ""}
            onChange={(e) => setFacebook(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSave} disabled={!isSaveEnabled}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
