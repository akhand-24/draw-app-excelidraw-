"use client";
import { useEffect,useRef, useState } from "react";
import { initdraw } from "@/draw/draw";
import { WS_URL } from "@/config";
import Canvasfin from "./Canvasfin";


export function CanvasClient({roomId}:{roomId:string}){
    
    const [socket,setSocket]=useState<WebSocket | null>(null)
    
    
    useEffect(()=>{
        console.log("hello");
        const ws=new WebSocket("ws://localhost:8000?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0OWE0YzYzNy00OTQ2LTQ0ODUtOGRhZC02M2U3ZDk3MDZmMTMiLCJpYXQiOjE3NzAwNTk2MjF9.E3sMsEuTT1Zv3XriXIYOGIVBZIhLrE8z0HyCAI5pjYs")
console.log(ws);

        ws.onopen=()=>{setSocket(ws)
            
            socket?.send(JSON.stringify({
                type:"join_room",
                roomId:roomId
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