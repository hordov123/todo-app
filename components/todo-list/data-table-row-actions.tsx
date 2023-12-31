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
import {useDeleteTodoList} from '@todo/hooks/mutations/todo-list/useDeleteTodoList';
import {useTodoListChangeStatus} from '@todo/hooks/mutations/todo-list/useTodoListChangeStatus';
import EditListForm from '@todo/components/todo-list/edit/form';
import {Modal} from '@todo/components/ui/modal';
import {useState} from 'react';

interface DataTableRowActionsProps<TData> {
    row: Row<TData>
}

export function DataTableRowActions<TData>({row}: DataTableRowActionsProps<TData>) {

    const [open, setOpen] = useState(false);

    const deleteTodoList = useDeleteTodoList({id: row.getValue('id')});
    const changeTodoListState = useTodoListChangeStatus({id: row.getValue('id')});

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
                <DropdownMenuItem onClick={(event) => {
                    event.stopPropagation();
                    setOpen(true);
                }}>Edit</DropdownMenuItem>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger onClick={event => event.stopPropagation()}>
                        Status
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuRadioGroup value={row.getValue('activeStatus')?.toString()}>
                            <DropdownMenuRadioItem
                                onClick={(event) => {
                                    event.stopPropagation();
                                    changeTodoListState.mutate({activeStatus: true});
                                }}
                                value={'true'}>
                                Active
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem
                                onClick={(event) => {
                                    event.stopPropagation();
                                    changeTodoListState.mutate({activeStatus: false});
                                }}
                                value={'false'}>
                                Done
                            </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator/>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={(event) => {
                    event.stopPropagation();
                    deleteTodoList.mutate({id: row.getValue('id')});
                }}>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <div onClick={event => {
            event.stopPropagation();
        }}>
            <Modal setOpen={setOpen} open={open}>
                <EditListForm id={row.getValue('id')} isSuccess={status => setOpen(!status)}/>
            </Modal>
        </div>
    </>;
}