import express from 'express'
import { usermiddleware } from './middleware';
import jwt from 'jsonwebtoken'

import {JWT_SECRET} from "@repo/backend-common/config"
import { createUserSchema } from '@repo/common/types';
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

app.post("api/v1/signin",function(req,res){
    const data= signinSchema.safeParse(req.body)

    if(!data.success)
    {
        res.json({message:"Incorrect Credentials"})
    }
    // verify with the db

    const userId=13

    const token=jwt.sign({userId},JWT_SECRET)

    res.json({message:"user signed in",token});

})

app.listen(3001)