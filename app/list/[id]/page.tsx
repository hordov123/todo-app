import EditListForm from "@todo/components/todo-list/edit/form";
import {TodoCard} from "@todo/components/todo";


export default function Page({ params }: { params: { id: string } }) {

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <TodoCard id={params.id}/>
        </main>
    )
}
