export const urls = {
    get: {
        list: {
            collection: 'todo-list',
            one: (id: string) => `todo-list/${id}`
        },
        todo: {
            collection: (id: string) => `todo-list/${id}/tasks`,
            one: (listId: string, todoId: string) => `todo-list/${listId}/tasks/${todoId}`
        }
    },
    post: {
        list: 'todo-list',
        todo: (id: string) => `todo-list/${id}/tasks`
    },
    delete: {
        list: (id: string) => `todo-list/${id}`,
        todo: (listId: string, todoId: string) => `todo-list/${listId}/tasks/${todoId}`
    },
    put: {
        list: (id: string) => `todo-list/${id}`,
        todo: (listId: string, todoId: string) => `todo-list/${listId}/tasks/${todoId}`
    }
} as const; 