'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import {Button} from '@todo/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@todo/components/ui/form';
import {Input} from '@todo/components/ui/input';
import {Textarea} from '@todo/components/ui/textarea';
import {DateTimePicker} from '@todo/components/ui/date-time-picker';
import {useEditTodo} from '@todo/hooks/mutations/todo/useEditTodo';
import {editTodoFormSchema} from '@todo/components/todo/edit/schema';
import {Switch} from '@todo/components/ui/switch';
import {useEffect} from 'react';
import {useGetTodo} from '@todo/hooks/queries/todo/useGetTodo';

const EditTodoForm = ({listId, todoId, isSuccess}: EditTodoFormProps) => {

    const form = useForm<z.infer<typeof editTodoFormSchema>>({
        resolver: zodResolver(editTodoFormSchema),
        defaultValues: {
            title: '',
            description: '',
            deadline: new Date()
        },
    });

    const {data} = useGetTodo({listId, todoId});
    const createTodo = useEditTodo({todoId, listId});

    useEffect(() => {
        if (!data) return;
        form.setValue('title', data.data.title);
        form.setValue('description', data.data.description);
        form.setValue('activeStatus', data.data.activeStatus);
        form.setValue('deadline', new Date(data.data.deadline));
    }, [data]);

    const onSubmit = (values: z.infer<typeof editTodoFormSchema>) => {
        createTodo.mutate(
            {
                ...values,
                deadline: values.deadline,
            }, {
                onSuccess: () => isSuccess(true)
            });
    };

    return <>
        <Form {...form}>
            <form className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Todo list title" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is title of your todo list.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Short description of task" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="activeStatus"
                    render={({field}) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                    Status
                                </FormLabel>
                                <FormDescription>
                                    Whether todo is active.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="deadline"
                    render={({field}) => (
                        <FormItem className='grid'>
                            <FormLabel>Deadline</FormLabel>
                            <FormControl>
                                <DateTimePicker date={field.value} setDate={field.onChange}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button onClick={form.handleSubmit(onSubmit)} type="submit">Submit</Button>
            </form>
        </Form>
    </>;
};

interface EditTodoFormProps {
    listId: string;
    todoId: string;
    isSuccess: (status: boolean) => void;
}

export default EditTodoForm;