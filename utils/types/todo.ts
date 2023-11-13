export type TodoData = {
    createdAt: string,
    name: string,
    deadline: Date,
    text: string,
    activeStatus: boolean,
    id: string,
    'todo-listId': string
}

export type TodoDataCollection = TodoData[];