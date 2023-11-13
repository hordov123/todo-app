'use client';

import React from 'react';
import {usePathname} from 'next/navigation';
import {DoubleArrowLeftIcon} from '@radix-ui/react-icons';
import {Button} from '@todo/components/ui/button';
import Link from 'next/link';

const BackButton = () => {
    const pathname = usePathname();

    return <div>
        {pathname !== '/' && <Link href={'/'}>
            <Button variant='outline'>
                <DoubleArrowLeftIcon className='h-[1.2rem] w-[1.2rem]'/>
            </Button>
        </Link>}
    </div>;
};

export default BackButton;