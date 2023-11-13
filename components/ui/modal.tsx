'use client';

import * as React from 'react';
import {Fragment, ReactNode} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {X} from 'lucide-react';
import {Card} from '@todo/components/ui/card';

export function Modal({children, open, setOpen}: ModalProps) {

    const setIsOpen = (state: boolean) => () => setOpen(state);

    return (
        <Transition show={open} as={Fragment}>
            <Dialog onClose={setIsOpen(false)}>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed z-0 inset-0 bg-background/30"/>
                </Transition.Child>

                <div className="fixed z-10 inset-0 flex w-screen items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-sm rounded-full bg-white">
                            <Dialog.Title></Dialog.Title>
                            <Card className='p-6 max-w-[30rem] w-full' onClick={event => event.preventDefault()}>
                                <button className="float-right p-1 mb-6" onClick={setIsOpen(false)}><X
                                    className="h-4 w-4 float-right"/></button>
                                {children}
                            </Card>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}

interface ModalProps {
    children: ReactNode
    open: boolean;
    setOpen: (state: boolean) => void;
}