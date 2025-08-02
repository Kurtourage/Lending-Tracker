// app/dashboard/layout.tsx
import type { ReactNode } from 'react';
import Link from 'next/link';

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 hidden md:block">
        <h2 className="text-2xl font-bold mb-6">Lending Tracker</h2>
        <nav className="flex flex-col space-y-3">
          <Link href="/dashboard" className="hover:text-yellow-300">Dashboard</Link>
          <Link href="/dashboard/borrowers" className="hover:text-yellow-300">Borrowers</Link>
          <Link href="/dashboard/transactions" className="hover:text-yellow-300">Transactions</Link>
          <Link href="/dashboard/payments" className="hover:text-yellow-300">Payments</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
