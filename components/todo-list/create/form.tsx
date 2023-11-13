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
import {createListFormSchema} from '@todo/components/todo-list/create/schema';
import {Textarea} from '@todo/components/ui/textarea';
import {useCreateTodoList} from '@todo/hooks/mutations/todo-list/useCreateTodoList';

const CreateListForm = ({isSuccess}: CreateListFormProps) => {

    const form = useForm<z.infer<typeof createListFormSchema>>({
        resolver: zodResolver(createListFormSchema),
        defaultValues: {
            title: '',
            description: '',
        },
    });

    const createTodoList = useCreateTodoList({});

    const onSubmit = (values: z.infer<typeof createListFormSchema>) => {
        createTodoList.mutate(
            {
                ...values,
                activeStatus: true
            },
            {
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
                                <Textarea placeholder="Short description of your todo list" {...field} />
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

interface CreateListFormProps {
    isSuccess: (status: boolean) => void;
}

export default CreateListForm;