'use client';

import { useState, useMemo } from 'react';
import { addMonths, setDate, isSameDay, parseISO } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

/**
 * PaymentCalendar
 * - fixed table layout so days align with headers
 * - day cells are square and responsive (smaller on mobile)
 * - caption (month/year) centered
 * - nav buttons compact on mobile
 * - removed any `w-full` applied to .rdp-day (that caused overflow/misalignment)
 */

// example data (replace with your real transactions)
const transactions = [
  { borrower: 'Juan Dela Cruz', amount: 2000, startDate: '2025-05-15', months: 4 },
  { borrower: 'Maria Clara', amount: 1500, startDate: '2025-06-10', months: 6 },
  { borrower: 'Maria Clara', amount: 6000, startDate: '2025-04-10', months: 3 },
  { borrower: 'Jeremy Const.', amount: 20000, startDate: '2025-02-10', months: 10 },
  { borrower: 'Maria Clara', amount: 6000, startDate: '2025-06-10', months: 3 },
];

export default function PaymentCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // build dueDates with installment metadata
  const dueDates = useMemo(
    () =>
      transactions.flatMap((t) => {
        const start = parseISO(t.startDate);
        return Array.from({ length: t.months }, (_, i) => {
          const dueDate = setDate(addMonths(start, i + 1), start.getDate());
          return {
            borrower: t.borrower,
            amount: t.amount,
            installmentAmount: t.amount / t.months,
            date: dueDate,
            installmentNumber: i + 1,
            totalMonths: t.months,
          };
        });
      }),
    []
  );

  const selectedPayments = selectedDate
    ? dueDates.filter((p) => isSameDay(p.date, selectedDate))
    : [];

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    setDialogOpen(true);
  };

  return (
    <div className="w-full flex justify-center">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <div className="w-full max-w-full sm:max-w-3xl mx-auto">
          <Calendar
            mode="single"
            selected={selectedDate ?? undefined}
            onSelect={handleDateSelect}
            className={
              // Key fixes:
              // - table-fixed keeps columns aligned with header cells
              // - day cells are square and centered (no w-full)
              // - caption centered and nav compact on mobile
              `w-full rounded-lg border shadow-lg text-base p-2 sm:p-6
               [&_.rdp-table]:w-full [&_.rdp-table]:table-fixed
               [&_.rdp-caption]:text-center [&_.rdp-caption]:flex [&_.rdp-caption]:justify-center [&_.rdp-caption]:items-center
               [&_.rdp-nav]:px-2 [&_.rdp-nav_button]:p-2 [&_.rdp-nav_button]:h-8 [&_.rdp-nav_button]:w-8
               [&_.rdp-head_cell]:text-xs sm:[&_.rdp-head_cell]:text-sm
               /* square day cells: small on mobile, larger on sm+ */
               [&_.rdp-day]:mx-auto [&_.rdp-day]:h-10 [&_.rdp-day]:w-10 [&_.rdp-day]:text-sm
               sm:[&_.rdp-day]:h-14 sm:[&_.rdp-day]:w-14 sm:[&_.rdp-day]:text-lg
               `
            }
            modifiers={{
              due: (day) => dueDates.some((p) => isSameDay(p.date, day)),
              today: (day) => isSameDay(day, new Date()),
            }}
            modifiersClassNames={{
              due: 'bg-red-200 text-red-800 font-semibold rounded-full',
              today: 'ring-2 ring-blue-400 rounded-full', // outline for today
              selected: 'bg-blue-500 text-white rounded-full',
            }}
          />
        </div>

        <DialogContent className="max-w-md w-full sm:w-auto max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-red-500"
                >
                  <path d="M16 14v2.2l1.6 1" />
                  <path d="M16 2v4" />
                  <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" />
                  <path d="M3 10h5" />
                  <path d="M8 2v4" />
                  <circle cx="16" cy="16" r="6" />
                </svg>

                <span className="font-medium">Payments due on&nbsp;</span>
                <span className="font-semibold">
                  {selectedDate?.toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </DialogTitle>
          </DialogHeader>

          {selectedPayments.length > 0 ? (
            <div className="space-y-3 mt-2">
              {selectedPayments.map((p, idx) => (
                <div key={idx} className="flex flex-col border-b pb-2 text-sm">
                  <span className="font-medium">{p.borrower}</span>
                  <span>
                    ₱{p.installmentAmount.toLocaleString()} — {p.installmentNumber}
                    {p.installmentNumber === 1 ? 'st' : p.installmentNumber === 2 ? 'nd' : p.installmentNumber === 3 ? 'rd' : 'th'}{' '}
                    installment of {p.totalMonths} for ₱{p.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-2">No payments due on this date.</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
