'use client';

import React, {ReactNode} from 'react';
import {ThemeProvider} from '@todo/components/providers/theme-provider';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient(); 

const Providers = ({children}: ProvidersProps) => {

    return <>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    </>;
};

interface ProvidersProps {
    children: ReactNode
}

export default Providers;
