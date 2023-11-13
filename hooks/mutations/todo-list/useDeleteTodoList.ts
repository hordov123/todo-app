import {useMutation, UseMutationOptions, useQueryClient} from 'react-query';
import {AxiosError, AxiosResponse} from 'axios';
import {TodoListData} from '@todo/utils/types/todo-list';
import {queryKeyResolver} from '@todo/utils/query-key-resolver';
import {urls} from '@todo/utils/consts/urls';
import api from '@todo/utils/lib/apiService';

export const useDeleteTodoList = (props: UseDeleteTodoListProps & UseDeleteTodoListData) => {
    const queryClient = useQueryClient();
    return useMutation<AxiosResponse<TodoListData>, AxiosError, UseDeleteTodoListData>({
        mutationKey: [queryKeyResolver({url: urls.delete.list(props.id), method: 'DELETE'})],
        mutationFn: () => api.delete<TodoListData>(urls.delete.list(props.id)),
        ...props,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: queryKeyResolver({
                    url: urls.get.list.collection,
                    method: 'GET',
                    params: {activeStatus: undefined}
                })
            });
        }
    });
};

type UseDeleteTodoListProps = UseMutationOptions<
    AxiosResponse<TodoListData>,
    AxiosError,
    UseDeleteTodoListData
>

interface UseDeleteTodoListData {
    id: string;
}