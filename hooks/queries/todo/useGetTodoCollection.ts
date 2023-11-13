import {useQuery, UseQueryOptions} from 'react-query';
import {urls} from '@todo/utils/consts/urls';
import api from '@todo/utils/lib/apiService';
import {AxiosResponse} from 'axios';
import {queryKeyResolver} from '@todo/utils/query-key-resolver';
import {TodoDataCollection} from '@todo/utils/types/todo';


export const useGetTodoCollection = (props: UseGetTodoProps & { id: string }) => {
    return useQuery<TodoRequest>({
        queryKey: queryKeyResolver({url: urls.get.todo.collection(props.id), method: 'GET', params: props.params}),
        queryFn: () => api.get(urls.get.todo.collection(props.id), {
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

type TodoRequest = AxiosResponse<TodoDataCollection>