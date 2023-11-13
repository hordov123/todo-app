"use client"

import * as z from "zod"

export const createListFormSchema = z.object({
    title: z.string().min(1, 'Title can not be empty'),
    description: z.string(),
})