"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit: (row: Row<TData>) => void;
  onDelete: (row: Row<TData>) => void;
}

export function DataTableRowActions<TData>({
  row,
  onEdit,
  onDelete
}: DataTableRowActionsProps<TData>) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
const router = useRouter()
    const handleDelete = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/delete-user?_id=${row.original._id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete user');
        }

        const data = await response.json();


        window.location.reload(); // reloads the page
      } catch (error) {
        setError((error as Error).message);
        console.error('Error deleting user:', error);
      } finally {
        setLoading(false);
      }
    };

    const handleEdit = () => {
        router.push(`/superAdmin/users/edit?id=${row.original._id}`);
      };

    const handleView = () => {
        router.push(`/superAdmin/users/view-one?id=${row.original._id}`);
      };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          aria-label="Open row actions menu"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[120px]">
        <DropdownMenuItem onClick={handleEdit} className="p-0 mb-1">
          <Button className="w-full justify-start m-0" variant="default">
            <span>Edit</span>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleView} className="p-0">
          <Button className="w-full justify-start m-0" variant="default">
            <span>View User</span>
          </Button>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleDelete} className="p-0">
          <Button className="w-full justify-start py-1" variant="destructive">
            <span>Delete</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
