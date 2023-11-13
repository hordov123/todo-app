import {useMutation, UseMutationOptions, useQueryClient} from "react-query";
import {AxiosError, AxiosResponse} from "axios";
import {TodoListData} from "@todo/utils/types/todo-list";
import {queryKeyResolver} from "@todo/utils/query-key-resolver";
import {urls} from "@todo/utils/consts/urls";
import api from "@todo/utils/lib/apiService";

export const useCreateTodoList = (props: UseCreateTodoListProps) => {
    const queryClient = useQueryClient()
    return useMutation<AxiosResponse<TodoListData>, AxiosError, UseCreateTodoListData>({
        mutationKey: [queryKeyResolver({url: urls.post.list, method: "POST"})],
        mutationFn: data => api.post<TodoListData>(urls.post.list, data),
        ...props,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: queryKeyResolver({url: urls.get.list.collection, method: 'GET', params: {activeStatus: undefined}})
            })
        }
    })
};

type UseCreateTodoListProps = UseMutationOptions<
    AxiosResponse<TodoListData>,
    AxiosError,
    UseCreateTodoListData
>

interface UseCreateTodoListData {
    title: string;
    description: string;
    activeStatus: boolean;
}