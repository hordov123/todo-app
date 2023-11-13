import {useMutation, UseMutationOptions, useQueryClient} from 'react-query';
import {AxiosError, AxiosResponse} from 'axios';
import {TodoData} from '@todo/utils/types/todo';
import {queryKeyResolver} from '@todo/utils/query-key-resolver';
import {urls} from '@todo/utils/consts/urls';
import api from '@todo/utils/lib/apiService';

export const useCreateTodo = (props: UseCreateTodoProps & { id: string }) => {
    const queryClient = useQueryClient();
    return useMutation<AxiosResponse<TodoData>, AxiosError, UseCreateTodoData>({
        mutationKey: [queryKeyResolver({url: urls.post.todo(props.id), method: 'POST'})],
        mutationFn: data => api.post<TodoData>(urls.post.todo(props.id), data),
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

type UseCreateTodoProps = UseMutationOptions<
    AxiosResponse<TodoData>,
    AxiosError,
    UseCreateTodoData
>

interface UseCreateTodoData {
    title: string;
    description: string;
    activeStatus: boolean;
    deadline: Date;
    'todo-listId': string;
}