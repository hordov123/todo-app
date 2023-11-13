'use client';

import * as z from 'zod';

export const editListFormSchema = z.object({
    title: z.string().min(1, 'Title can not be empty'),
    description: z.string(),
    activeStatus: z.boolean()
}); 