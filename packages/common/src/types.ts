import {z} from 'zod'

export const createUserSchema= z.object({
    email:z.string().min(3).max(20),
    password:z.string().min(5).max(50),
    name:z.string()
})
export const signinSchema= z.object({
    email:z.string().min(3).max(20),
    password:z.string().min(5).max(50)
})

export const createRoomSchema=z.object({
    name:z.string().min(3).max(20)
})

