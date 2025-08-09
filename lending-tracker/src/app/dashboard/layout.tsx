// app/dashboard/layout.tsx
"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Receipt, CalendarClock } from "lucide-react";

type DashboardLayoutProps = {
  children: ReactNode;
};

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/borrower", label: "Borrowers", icon: Users },
  { href: "/dashboard/transaction", label: "Transactions", icon: Receipt },

];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky navbar */}
      <nav className="sticky top-0 z-50 bg-[#1E3A8A] text-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-around p-2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center px-3 py-1 rounded-md transition-colors duration-200
                  ${isActive ? "bg-[#FFFDEB] text-[#1E3A8A]" : "hover:bg-gray-700"}`}
              >
                <Icon size={20} />
                <span className="text-xs mt-1">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
