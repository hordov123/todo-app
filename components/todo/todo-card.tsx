'use client';

import React, {useEffect, useState} from 'react';
import {DataTable} from '@todo/components/todo/data-table';
import {columns} from '@todo/components/todo/columns';
import {Card} from '@todo/components/ui/card';
import {Input} from '@todo/components/ui/input';
import {useDebounce} from 'usehooks-ts';
import {TodoFilter} from '@todo/components/ui/todo-filter';
import {useGetTodoCollection} from '@todo/hooks/queries/todo/useGetTodoCollection';
import {Modal} from '@todo/components/ui/modal';
import CreateTodoForm from '@todo/components/todo/create/form';
import {Button} from '@todo/components/ui/button';
import {useGetTodoList} from '@todo/hooks/queries/todo-list/useGetTodoList';
import EditListForm from '@todo/components/todo-list/edit/form';
import {Pencil1Icon} from '@radix-ui/react-icons';

const TodoCard = ({id}: TodoCardProps) => {

    const [openCreate, setOpenCreate] = useState(false);
    const [openEditList, setOpenEditList] = useState(false);
    const [todoName, setTodoName] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'done'>('all');
    const debouncedValue = useDebounce<string>(todoName, 500);

    const {data: list} = useGetTodoList({params: {id}});

    const {data, refetch} = useGetTodoCollection({
        id,
        params: {
            title: debouncedValue || undefined,
            activeStatus: statusResolver(statusFilter)
        }
    });


    useEffect(() => {
        refetch();
    }, [debouncedValue, statusFilter]);

    return <>
        <Card className='p-2 sm:p-6 grid gap-4 max-w-[82rem] w-full overflow-x-auto'>
            <Card className='p-2 sm:p-6 gap-2 grid'>
                <h3 className='flex items-center gap-2'>
                    {list?.data.title}
                    <Pencil1Icon
                        className='cursor-pointer hover:text-yellow-400 duration-300'
                        onClick={() => setOpenEditList(true)}/>
                </h3>
                {list?.data.description && <p>{list.data.description}</p>}
            </Card>
            <div className='flex flex-col gap-y-2 sm:flex-row justify-between'>
                <div className='flex flex-col sm:flex-row gap-2'>
                    <Input
                        placeholder="Filter tasks..."
                        value={todoName || ''}
                        onChange={(event) =>
                            setTodoName(event.target.value)
                        }
                        className="h-full sm:w-[150px] lg:w-[250px]"
                    />
                    <TodoFilter value={statusFilter}
                                setValue={(value) => setStatusFilter(value as 'all' | 'active' | 'done')}/>
                </div>
                <Button onClick={() => setOpenCreate(true)}>Add item</Button>
            </div>
            {data && <DataTable columns={columns} data={data?.data}/>}
        </Card>
        <Modal setOpen={setOpenCreate} open={openCreate}>
            <CreateTodoForm listId={id} isSuccess={status => setOpenCreate(!status)}/>
        </Modal>

        <Modal setOpen={setOpenEditList} open={openEditList}>
            <EditListForm id={id} isSuccess={status => setOpenEditList(!status)}/>
        </Modal>
    </>;
};

const statusResolver = (value: 'all' | 'active' | 'done') => {
    return value === 'all' ? undefined : value === 'active';
};

interface TodoCardProps {
    id: string;
}

export default TodoCard;