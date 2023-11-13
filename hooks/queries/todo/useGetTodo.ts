import {useQuery, UseQueryOptions} from 'react-query';
import {urls} from '@todo/utils/consts/urls';
import api from '@todo/utils/lib/apiService';
import {AxiosResponse} from 'axios';
import {queryKeyResolver} from '@todo/utils/query-key-resolver';
import {TodoData} from '@todo/utils/types/todo';


export const useGetTodo = (props: UseGetTodoProps & { listId: string, todoId: string }) => {
    return useQuery<TodoRequest>({
        queryKey: queryKeyResolver({
            url: urls.get.todo.one(props.listId, props.todoId),
            method: 'GET',
            params: props.params
        }),
        queryFn: () => api.get(urls.get.todo.one(props.listId, props.todoId), {
            params: props.params
        }),
        ...props.options
    });
};

type UseGetTodoProps = {
    params?: TodoRequestParams;
    options?: UseQueryOptions<TodoRequest>
}

type TodoRequestParams = {
    title?: string;
    activeStatus?: boolean;
}

type TodoRequest = AxiosResponse<TodoData>