import {useMutation, UseMutationOptions, useQueryClient} from 'react-query';
import {AxiosError, AxiosResponse} from 'axios';
import {TodoData} from '@todo/utils/types/todo';
import {queryKeyResolver} from '@todo/utils/query-key-resolver';
import {urls} from '@todo/utils/consts/urls';
import api from '@todo/utils/lib/apiService';

export const useEditTodo = (props: UseEditTodoProps & { listId: string, todoId: string }) => {
    const queryClient = useQueryClient();
    return useMutation<AxiosResponse<TodoData>, AxiosError, UseEditTodoData>({
        mutationKey: [queryKeyResolver({url: urls.put.todo(props.listId, props.todoId), method: 'PUT'})],
        mutationFn: data => api.put<TodoData>(urls.put.todo(props.listId, props.todoId), data),
        ...props,
        onSuccess: async (res) => {
            await queryClient.invalidateQueries({
                queryKey: queryKeyResolver({
                    url: urls.get.todo.collection(res.data['todo-listId']),
                    method: 'GET',
                    params: {activeStatus: undefined}
                })
            });
        }
    });
};

type UseEditTodoProps = UseMutationOptions<
    AxiosResponse<TodoData>,
    AxiosError,
    UseEditTodoData
>

interface UseEditTodoData {
    title: string;
    description: string;
    activeStatus: boolean;
    deadline: Date;
}