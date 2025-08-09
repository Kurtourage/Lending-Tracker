// src/app/borrower/columns.tsx
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

type Borrower = {
  id: string;
  name: string;
  status: 'cleared' | 'active';
};

export const columns: ColumnDef<Borrower>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
];
