import { initdraw } from "@/draw/draw";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./Iconbutton";
import {Circle, Pencil, RectangleHorizontalIcon} from 'lucide-react'

export type Tool = "circle" | "rect" | "pencil";

export default  function Canvasfin({roomId,socket}:{
    roomId:string,
    socket:WebSocket
}){
     const canvasRef= useRef<HTMLCanvasElement>(null)
      const [selectedTool, setSelectedTool] = useState<Tool>("circle")

      useEffect(()=>{
        //@ts-ignore
        window.selectedTool=selectedTool
      },[selectedTool]);

     useEffect(()=>{
            if(canvasRef.current)
    {
            const canvas=canvasRef.current;
           initdraw(canvas,roomId,socket)
                }
        },[canvasRef])
    
    
        return <div className="h-screen w-screen overflow-hidden">
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>

             <Topbar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
        </div>
}


function Topbar({selectedTool, setSelectedTool}: {
    selectedTool: Tool,
    setSelectedTool: (s: Tool) => void
}) {
    return <div style={{
            position: "fixed",
            top: 10,
            left: 10
        }}>
            <div className="flex gap-t">
                <IconButton 
                    onClick={() => {
                        setSelectedTool("pencil")
                    }}
                    activated={selectedTool === "pencil"}
                    icon={<Pencil />}
                />
                <IconButton onClick={() => {
                    setSelectedTool("rect")
                }} activated={selectedTool === "rect"} icon={<RectangleHorizontalIcon />} ></IconButton>
                <IconButton onClick={() => {
                    setSelectedTool("circle")
                }} activated={selectedTool === "circle"} icon={<Circle />}></IconButton>
            </div>
        </div>
}