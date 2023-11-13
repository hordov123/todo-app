export type TodoListData = {
    id: string;
    createdAt: string;
    title: string;
    description: string;
    activeStatus: boolean;
}

export type TodoListDataCollection = TodoListData[];