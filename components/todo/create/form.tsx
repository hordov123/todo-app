"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {Button} from "@todo/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@todo/components/ui/form"
import {Input} from "@todo/components/ui/input"
import {Textarea} from "@todo/components/ui/textarea";
import {Card} from "@todo/components/ui/card";
import {useCreateTodo} from "@todo/hooks/mutations/todo/useCreateTodo";
import {useRouter} from "next/navigation";
import {createTodoFormSchema} from "@todo/components/todo/create/schema";
import {DateTimePicker} from "@todo/components/ui/date-time-picker";

const CreateTodoForm = ({listId}: CreateTodoFormProps) => {
    const router = useRouter()

    const form = useForm<z.infer<typeof createTodoFormSchema>>({
        resolver: zodResolver(createTodoFormSchema),
        defaultValues: {
            title: "",
            description: "",
            deadline: new Date()
        },
    })

    const createTodo = useCreateTodo({id: listId})

    const onSubmit = (values: z.infer<typeof createTodoFormSchema>) => {
        createTodo.mutate(
            {
                ...values,
                activeStatus: true,
                deadline: values.deadline,
                'todo-listId': listId
            })
    }

    return <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    </>
}

interface CreateTodoFormProps {
    listId: string;
}

export default CreateTodoForm;