import EditListForm from "@todo/components/todo-list/edit/form";


export default function Page({ params }: { params: { id: string } }) {

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <EditListForm id={params.id}/>
        </main>
    )
}
