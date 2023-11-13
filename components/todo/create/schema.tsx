'use client';

import * as z from 'zod';

export const createTodoFormSchema = z.object({
    title: z.string().min(1, 'Title can not be empty'),
    description: z.string(),
    deadline: z.date()
}); 