'use client'

import React, {useEffect, useState} from 'react';
import {DataTable} from "@todo/components/todo-list/data-table";
import {columns} from "@todo/components/todo-list/columns";
import {Card} from "@todo/components/ui/card";
import {Button} from "@todo/components/ui/button";
import {Input} from "@todo/components/ui/input";
import {useGetTodoListCollection} from "@todo/hooks/queries/todo-list/useGetTodoListCollection";
import {useDebounce} from "usehooks-ts";
import {useCreateTodoList} from "@todo/hooks/mutations/todo-list/useCreateTodoList";
import Link from "next/link";
import {TodoFilter} from "@todo/components/ui/todo-filter";

const TodoListCard = () => {

    const [listName, setListName] = useState<string>('')
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'done'>('all')
    const debouncedValue = useDebounce<string>(listName, 500)

    const {data, refetch, isLoading} = useGetTodoListCollection({
        params: {
            title: debouncedValue || undefined,
            activeStatus: statusResolver(statusFilter)
        }
    });

    const create = useCreateTodoList({})

    useEffect(() => {
        refetch()
    }, [debouncedValue, statusFilter]);

    return <Card className='p-6 grid gap-4'>
        <div className='flex justify-between'>
            <div className='flex gap-2'>
                <Input
                    placeholder="Filter tasks..."
                    value={listName || ''}
                    onChange={(event) =>
                        setListName(event.target.value)
                    }
                    className="h-full w-[150px] lg:w-[250px]"
                />
                <TodoFilter value={statusFilter} setValue={(value) => setStatusFilter(value)}/>
            </div>
            <Link href='create-list'><Button>Add list</Button></Link>
        </div>
        {data && <DataTable columns={columns} data={data?.data}/>}
    </Card>;
};

const statusResolver = (value: 'all' | 'active' | 'done') => {
    return value === 'all' ? undefined : value === 'active'
}

export default TodoListCard;