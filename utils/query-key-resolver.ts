export const queryKeyResolver = ({url, method, params}: QueryKeyResolverProps) => [url, method, params]

interface QueryKeyResolverProps {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    params?: any;
}