import {useMutation, UseMutationOptions, useQueryClient} from "react-query";
import {AxiosError, AxiosResponse} from "axios";
import {TodoData} from "@todo/utils/types/todo";
import {queryKeyResolver} from "@todo/utils/query-key-resolver";
import {urls} from "@todo/utils/consts/urls";
import api from "@todo/utils/lib/apiService";

export const useDeleteTodo = (props: UseDeleteTodoProps & UseDeleteTodoData) => {
    const queryClient = useQueryClient()
    return useMutation<AxiosResponse<TodoData>, AxiosError, UseDeleteTodoData>({
        mutationKey: [queryKeyResolver({url: urls.delete.todo(props.listId, props.todoId), method: "DELETE"})],
        mutationFn: data => api.delete<TodoData>(urls.delete.todo(props.listId, props.todoId)),
        ...props,
        onSuccess: async (res) => {
            await queryClient.invalidateQueries({
                queryKey: queryKeyResolver({url: urls.get.todo.collection(res.data["todo-listId"]), method: 'GET', params: {activeStatus: undefined}})
            })
        }
    })
};

type UseDeleteTodoProps = UseMutationOptions<
    AxiosResponse<TodoData>,
    AxiosError,
    UseDeleteTodoData
>

interface UseDeleteTodoData {
    listId: string;
    todoId: string;
}