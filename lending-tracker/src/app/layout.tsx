// app/layout.tsx
import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Lending Tracker',
};


const colors = {
  primary: "#1E3A8A",
  primaryLight: "#3B82F6",
  cream: "#FFFDEB",
}

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-cream" style={{ backgroundColor: colors.cream }}>{children}</body>
    </html>
  );
}
