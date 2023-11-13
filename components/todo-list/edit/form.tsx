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
import {editListFormSchema} from "@todo/components/todo-list/edit/schema";
import {Textarea} from "@todo/components/ui/textarea";
import {Card} from "@todo/components/ui/card";
import {useRouter} from "next/navigation";
import {useEditTodoList} from "@todo/hooks/mutations/todo-list/useEditTodoList";
import {Switch} from "@todo/components/ui/switch";
import {useGetTodoList} from "@todo/hooks/queries/todo-list/useGetTodoList";
import {useEffect} from "react";

const EditListForm = ({id}: EditListFormProps) => {
    const router = useRouter()

    const {data} = useGetTodoList({params: {id}})
    const editTodoList = useEditTodoList({id: id})

    const form = useForm<z.infer<typeof editListFormSchema>>({
        resolver: zodResolver(editListFormSchema),
        defaultValues: {
            title: '',
            description: '',
            activeStatus: false
        },
    })

    useEffect(() => {
        if (!data) return
        form.setValue('title', data.data.title)
        form.setValue('description', data.data.description)
        form.setValue('activeStatus', data.data.activeStatus)
    }, [data]);


    const onSubmit = (values: z.infer<typeof editListFormSchema>) => {
        editTodoList.mutate(
            {
                ...values
            },
            {
                onSuccess: () => router.push('/')
            })
    }

    return <Card className='p-6 max-w-[30rem] w-full'>
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
                                <Textarea placeholder="Short description of your todo list" {...field} />
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
                                    Whether todo list is active.
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
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    </Card>
}

interface EditListFormProps {
    id: string;
}

export default EditListForm;