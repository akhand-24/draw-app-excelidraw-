import express from 'express'
import { usermiddleware } from './middleware';
import jwt from 'jsonwebtoken'

import {JWT_SECRET} from "@repo/backend-common/config"
import { createRoomSchema, createUserSchema } from '@repo/common/types';
import { signinSchema } from '@repo/common/types';
import { prismaClient } from '@repo/db';
import 'dotenv/config'

const app=express();

app.use(express.json())

app.post("/api/v1/signup", async function(req,res){
       const parseddata =createUserSchema.safeParse(req.body)
       console.log(parseddata);
       
        if(!parseddata.success)
        {
           return res.json({message:"Incorrect Inputs"})
        }
       try {
           const newuser= await prismaClient.user.create({
                data:{
                    
                    email:parseddata.data.email ,
                    password:parseddata.data.password ,
                    name:parseddata.data.name ,
                    photo:"abc"
                    
                }
            })
            res.json({message:"User created",newuser});
       } catch (error) {
        return res.json({error});
       }

       


        
})

app.post("/api/v1/signin",async function(req,res){
    const parseddata= signinSchema.safeParse(req.body)

    if(!parseddata.success)
    {
        res.json({message:"Incorrect Credentials"})
    }
    

    const user= await prismaClient.user.findFirst({
        where:{
            email:parseddata.data?.email,
            password:parseddata.data?.password
        }
    })

    const userId=user?.id

    const token=jwt.sign({userId},JWT_SECRET)

    res.json({message:"user signed in",token});

})

app.post("/api/v1/room", usermiddleware, async function(req,res){
    const parseddata=createRoomSchema.safeParse(req.body)

    if(!parseddata.success)
    {
        return res.json({message:"Invalid Creadentials"})
    }
    //@ts-ignore
    const userId=req.userId;

    try {
        const newroom= prismaClient.room.create({
            data:{
                slug:parseddata.data.name,
                adminId:userId

            }
        })
        const roomId=(await newroom).id

        res.json({message:"Room created",newroom,roomId})

    } catch (error) {
        return res.json({error});
    }
})

app.get("/api/v1/chats/:roomId",async function(req,res){
    const roomId=Number(req.params.roomId);
    const messages= await prismaClient.chat.findMany({
        where:{
            roomId
        },
        orderBy:{
            id : "desc"
        },
        take: 50

    })

    res.json({messages});
})

app.listen(3001)