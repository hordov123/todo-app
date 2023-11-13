import {ThemeSwitcher} from "@todo/components/theme-switcher";
import {TodoListCard} from "@todo/components/todo-list";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <div className='flex w-full justify-between'>
                <div/>
                <ThemeSwitcher/>
            </div>
            <TodoListCard/>
        </main>
    )
}
