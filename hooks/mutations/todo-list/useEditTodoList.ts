import {useMutation, UseMutationOptions, useQueryClient} from 'react-query';
import {AxiosError, AxiosResponse} from 'axios';
import {TodoListData} from '@todo/utils/types/todo-list';
import {queryKeyResolver} from '@todo/utils/query-key-resolver';
import {urls} from '@todo/utils/consts/urls';
import api from '@todo/utils/lib/apiService';

export const useEditTodoList = (props: UseEditTodoListProps & { id: string }) => {
    const queryClient = useQueryClient();
    return useMutation<AxiosResponse<TodoListData>, AxiosError, UseEditTodoListData>({
        mutationKey: [queryKeyResolver({url: urls.put.list(props.id), method: 'PUT'})],
        mutationFn: data => api.put<TodoListData>(urls.put.list(props.id), data),
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

type UseEditTodoListProps = UseMutationOptions<
    AxiosResponse<TodoListData>,
    AxiosError,
    UseEditTodoListData
>

interface UseEditTodoListData {
    title: string;
    description: string;
    activeStatus: boolean;
}