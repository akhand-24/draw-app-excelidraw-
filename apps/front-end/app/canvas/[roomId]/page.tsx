

import { CanvasClient } from "@/components/Canvas";
import { initdraw } from "@/draw/draw";

export default async function Canvas({params}:{
    params:{
        roomId:string
    }
}){
   

    const roomId=(await params).roomId
 console.log(roomId);
 
 return <CanvasClient roomId={roomId} />
}