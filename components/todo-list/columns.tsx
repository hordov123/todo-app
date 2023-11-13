"use client"

import { ColumnDef } from "@tanstack/react-table"
import {DataTableRowActions} from "@todo/components/todo-list/data-table-row-actions";
import {Checkbox} from "@todo/components/ui/checkbox";
import {TodoListData} from "@todo/utils/types/todo-list";

export const columns: ColumnDef<TodoListData>[] = [
    {
        accessorKey: "id",
        header: "List Id",
    },
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({row}) => <div>{row.getValue('description')?.toString().slice(0, 100)}</div>
    },
    {
        accessorKey: "activeStatus",
        header: "Status",
        cell: ({row}) => <div>{row.getValue('activeStatus') ? 'Active' : 'Done'}</div>
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
]