'use client';

import {DotsHorizontalIcon} from '@radix-ui/react-icons';
import {Row} from '@tanstack/react-table';

import {Button} from '@todo/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@todo/components/ui/dropdown-menu';
import {useDeleteTodo} from '@todo/hooks/mutations/todo/useDeleteTodo';
import {useTodoChangeStatus} from '@todo/hooks/mutations/todo/useTodoChangeStatus';
import React, {useState} from 'react';
import {Modal} from '@todo/components/ui/modal';
import EditTodoForm from '@todo/components/todo/edit/form';

interface DataTableRowActionsProps<TData> {
    row: Row<TData>
}

export function DataTableRowActions<TData>({row}: DataTableRowActionsProps<TData>) {

    const [open, setOpen] = useState(false);

    const deleteTodo = useDeleteTodo({todoId: row.getValue('id'), listId: row.getValue('todo-listId')});
    const changeTodoState = useTodoChangeStatus({todoId: row.getValue('id'), listId: row.getValue('todo-listId')});

    return <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <DotsHorizontalIcon className="h-4 w-4"/>
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem onClick={() => setOpen(true)}>
                    Edit
                </DropdownMenuItem>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuRadioGroup value={row.getValue('activeStatus')?.toString()}>
                            <DropdownMenuRadioItem
                                onClick={() => changeTodoState.mutate({activeStatus: true})}
                                value={'true'}>
                                Active
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem
                                onClick={() => changeTodoState.mutate({activeStatus: false})}
                                value={'false'}>
                                Done
                            </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator/>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={() => deleteTodo.mutate({
                    todoId: row.getValue('id'),
                    listId: row.getValue('todo-listId')
                })}>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <Modal setOpen={setOpen} open={open}>
            <EditTodoForm listId={row.getValue('todo-listId')} todoId={row.getValue('id')}
                          isSuccess={status => setOpen(!status)}/>
        </Modal>
    </>;
}