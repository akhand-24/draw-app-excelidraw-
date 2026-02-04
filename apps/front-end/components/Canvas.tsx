"use client";
import { useEffect,useRef, useState } from "react";
import { initdraw } from "@/draw/draw";
import { WS_URL } from "@/config";
import Canvasfin from "./Canvasfin";


export function CanvasClient({roomId}:{roomId:string}){
    
    const [socket,setSocket]=useState<WebSocket | null>(null)
    
    
    useEffect(()=>{
        console.log("hello");
        const token=localStorage.getItem("token")
        const ws=new WebSocket(`${WS_URL}?token=${token}`)
console.log(ws);

        ws.onopen=()=>{
            setSocket(ws)
            
            ws.send(JSON.stringify({
                type:"join_room",
                roomId:(roomId)
            }))
        }
    },[]);

    if(!socket){
        return (
            <div>Connecting to the server...</div>
        )
    }
   
        return <Canvasfin roomId={roomId} socket={socket} />

    

    
}