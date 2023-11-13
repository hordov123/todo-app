export type TodoData = {
    createdAt: string,
    title: string,
    deadline: Date,
    description: string,
    activeStatus: boolean,
    id: string,
    'todo-listId': string
}

export type TodoDataCollection = TodoData[];