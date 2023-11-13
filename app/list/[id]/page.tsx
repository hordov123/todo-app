import {TodoCard} from '@todo/components/todo';

export default function Page({params}: { params: { id: string } }) {

    return <main className="w-full mx-auto">
        <TodoCard id={params.id}/>
    </main>;
}
