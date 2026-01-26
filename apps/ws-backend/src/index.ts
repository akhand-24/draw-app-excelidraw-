import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { JWT_SECRET } from "@repo/backend-common/config";

import { prismaClient } from "@repo/db";

import 'dotenv/config'
const wss = new WebSocketServer({port:8000})

const users:any[]=[];

wss.on("connection",function(ws,req){

    const url=req.url

    const params=new URLSearchParams(url?.split('?')[1]);

    const token = params.get("token") || ""

    const decodedtoken= jwt.verify(token,JWT_SECRET);

    if(!decodedtoken || !(decodedtoken as JwtPayload).userId)
    {
        ws.close()
        return;
    }
    //@ts-ignore
const userId=decodedtoken.userId;
    users.push({
        userId,
        rooms:[],
        ws
    })
    

    ws.on("message",async function message(data){
            const parseddata=JSON.parse(data as unknown as string)
console.log(parseddata)
            if(parseddata.type=="join_room")
            {
                //@ts-ignore
                const user=users.find(x => x.ws==ws)
                user.rooms.push(parseddata.roomId)

            }

            if(parseddata.type=="leave_room")
            {
                //@ts-ignore
                const user=users.find(x => x.ws==ws)
                //@ts-ignore
                user.rooms=user.rooms.filter(x=> x !==parseddata.roomId)
            }

            if(parseddata.type=="chat")
            {
                const message=parseddata.message;
                const roomId=parseddata.roomId

                await prismaClient.chat.create({
                    data:{
                        message,
                        roomId,
                        userId
                    }
                })

                users.forEach(user =>{
                    if(user.rooms.includes(roomId)){
                        user.ws.send(
                        JSON.stringify({
                            type:"chat",
                            message,
                            roomId
                        })
                        )
                    }
                })
            }

    })
})