'use client';

import {ColumnDef} from '@tanstack/react-table';
import {DataTableRowActions} from '@todo/components/todo/data-table-row-actions';
import {TodoData} from '@todo/utils/types/todo';

export const columns: ColumnDef<TodoData>[] = [
    {
        accessorKey: 'id',
        header: 'Item Id',
    },
    {
        accessorKey: 'title',
        header: 'Title',
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({row}) => <div>{row.getValue('description')?.toString().slice(0, 100)}</div>
    },
    {
        accessorKey: 'deadline',
        header: 'Deadline',
        cell: ({row}) =>
            <div>{row.getValue('deadline') ? new Date(row.getValue('deadline')).toLocaleDateString() : 'N/A'}</div>
    },
    {
        accessorKey: 'activeStatus',
        header: 'Status',
        cell: ({row}) => <div>{row.getValue('activeStatus') ? 'Active' : 'Done'}</div>
    },
    {
        accessorKey: 'todo-listId',
        header: '',
        cell: ({row}) => <></>
    },
    {
        id: 'actions',
        cell: ({row}) => <DataTableRowActions row={row}/>,
    },
];