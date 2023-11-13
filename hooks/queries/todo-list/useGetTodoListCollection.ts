import {useQuery, UseQueryOptions} from 'react-query';
import {urls} from '@todo/utils/consts/urls';
import api from '@todo/utils/lib/apiService';
import {AxiosResponse} from 'axios';
import {queryKeyResolver} from '@todo/utils/query-key-resolver';
import {TodoListDataCollection} from '@todo/utils/types/todo-list';


export const useGetTodoListCollection = (props: UseGetTodoListProps) => {
    return useQuery<TodoListRequest>({
        queryKey: queryKeyResolver({url: urls.get.list.collection, method: 'GET', params: props.params}),
        queryFn: () => api.get(urls.get.list.collection, {
            params: props.params
        }),
        ...props.options
    });
};

type UseGetTodoListProps = {
    params?: TodoListRequestParams; 
    options?: UseQueryOptions<TodoListRequest>
}

type TodoListRequestParams = {
    title?: string;
    activeStatus?: boolean;
}

type TodoListRequest = AxiosResponse<TodoListDataCollection>