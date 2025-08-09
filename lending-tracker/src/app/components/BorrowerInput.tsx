import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const dummyBorrowers = [
  { name: "Juan Dela Cruz" },
  { name: "Maria Clara" },
  { name: "Jose Rizal" },
];

export default function BorrowerInput({ value = "", onChange, onMatchFound }) {
  const [titleCased, setTitleCased] = useState("");
  const [matchFound, setMatchFound] = useState(false);
  const prevMatchRef = useRef(false); // to track previous match state

  const toTitleCase = (str) =>
    str
      .toLowerCase()
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");

  useEffect(() => {
    const cleaned = toTitleCase(value.trim());
    setTitleCased(cleaned);
    const match = dummyBorrowers.find(
      (b) => b.name.toLowerCase() === cleaned.toLowerCase()
    );
    const isMatch = !!match;

    // Only trigger if match status changes
    if (prevMatchRef.current !== isMatch) {
      onMatchFound?.({ match, titleCased: cleaned });
      prevMatchRef.current = isMatch;
    }

    setMatchFound(isMatch);
  }, [value]);

  return (
    <div className="space-y-2">
      <Label htmlFor="borrower">Borrower Name</Label>
      <Input
        id="borrower"
        placeholder="Enter borrower name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <div className="text-sm text-muted-foreground">
          Processed: <span className="font-medium">{titleCased}</span>
        </div>
      )}
      {value && (
        <div className="text-sm">
          {matchFound ? (
            <span className="text-green-600">Match found</span>
          ) : (
            <span className="text-red-600">New borrower</span>
          )}
        </div>
      )}
    </div>
  );
}
