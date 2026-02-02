import { initdraw } from "@/draw/draw";
import { useEffect, useRef } from "react";

export default  function Canvasfin({roomId,socket}:{
    roomId:string,
    socket:WebSocket
}){
     const canvasRef= useRef<HTMLCanvasElement>(null)
     useEffect(()=>{
            if(canvasRef.current)
    {
            const canvas=canvasRef.current;
           initdraw(canvas,roomId,socket)
                }
        },[canvasRef])
    
    
        return <div>
            <canvas ref={canvasRef} width={1080} height={1000}></canvas>
        </div>
}