'use client'

import React, {useEffect, useState} from 'react';
import {DataTable} from "@todo/components/todo/data-table";
import {columns} from "@todo/components/todo/columns";
import {Card} from "@todo/components/ui/card";
import {Button} from "@todo/components/ui/button";
import {Input} from "@todo/components/ui/input";
import {useDebounce} from "usehooks-ts";
import {useCreateTodoList} from "@todo/hooks/mutations/todo-list/useCreateTodoList";
import Link from "next/link";
import {TodoFilter} from "@todo/components/ui/todo-filter";
import {useGetTodoCollection} from "@todo/hooks/queries/todo/useGetTodoCollection";
import {CreateDialog} from "@todo/components/todo/index";

const TodoCard = ({id}: TodoCardProps) => {

    const [todoName, setTodoName] = useState<string>('')
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'done'>('all')
    const debouncedValue = useDebounce<string>(todoName, 500)

    const {data, refetch, isLoading} = useGetTodoCollection({
        id,
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
                    value={todoName || ''}
                    onChange={(event) =>
                        setTodoName(event.target.value)
                    }
                    className="h-full w-[150px] lg:w-[250px]"
                />
                <TodoFilter value={statusFilter} setValue={(value) => setStatusFilter(value)}/>
            </div>
            <CreateDialog listId={id}/>
        </div>
        {data && <DataTable columns={columns} data={data?.data}/>}
    </Card>;
};

const statusResolver = (value: 'all' | 'active' | 'done') => {
    return value === 'all' ? undefined : value === 'active'
}

interface TodoCardProps {
    id: string;
}

export default TodoCard;