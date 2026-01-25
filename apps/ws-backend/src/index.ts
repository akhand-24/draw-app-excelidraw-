import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { JWT_SECRET } from "@repo/backend-common/config";

const wss = new WebSocketServer({port:8000})

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
    

    ws.on("message",function(e){

    })
})