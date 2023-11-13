'use client';

import React, {useEffect, useState} from 'react';
import {DataTable} from '@todo/components/todo-list/data-table';
import {columns} from '@todo/components/todo-list/columns';
import {Card} from '@todo/components/ui/card';
import {Button} from '@todo/components/ui/button';
import {Input} from '@todo/components/ui/input';
import {useGetTodoListCollection} from '@todo/hooks/queries/todo-list/useGetTodoListCollection';
import {useDebounce} from 'usehooks-ts';
import {TodoFilter} from '@todo/components/ui/todo-filter';
import {Modal} from '@todo/components/ui/modal';
import {CreateListForm} from '@todo/components/todo-list/index';

const TodoListCard = () => {

    const [open, setOpen] = useState(false);
    const [listName, setListName] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'done'>('all');
    const debouncedValue = useDebounce<string>(listName, 500);

    const {data, refetch} = useGetTodoListCollection({
        params: {
            title: debouncedValue || undefined,
            activeStatus: statusResolver(statusFilter)
        }
    });


    useEffect(() => {
        refetch();
    }, [debouncedValue, statusFilter]);

    return <>
        <Card className='p-2 sm:p-6 grid gap-4 max-w-[82rem] w-full'>
            <div className='flex flex-col gap-y-2 sm:flex-row justify-between'>
                <div className='flex flex-col sm:flex-row gap-2'>
                    <Input
                        placeholder="Search for tasks..."
                        value={listName || ''}
                        onChange={(event) =>
                            setListName(event.target.value)
                        }
                        className="h-full sm:w-[150px] lg:w-[250px]"
                    />
                    <TodoFilter value={statusFilter}
                                setValue={(value) => setStatusFilter(value as 'all' | 'active' | 'done')}/>
                </div>
                <Button onClick={() => setOpen(true)}>Add list</Button>
            </div>
            {data && <DataTable columns={columns} data={data?.data}/>}
        </Card>

        <Modal setOpen={setOpen} open={open}>
            <CreateListForm isSuccess={status => setOpen(!status)}/>
        </Modal>
    </>;
};

const statusResolver = (value: 'all' | 'active' | 'done') => {
    return value === 'all' ? undefined : value === 'active';
};

export default TodoListCard;