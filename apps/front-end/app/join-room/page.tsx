"use client";

import { BACKEND_URL } from "@/config";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from 'axios'


export default function JoinPage() {
  const [room, setRoom] = useState("");
  const router = useRouter();

  async function joinexistingroom(room:string)
  {
    const response= await axios.post(`${BACKEND_URL}/getRoomId`,{
        roomname:room
    })

    const roomId=response.data.roomId.id;
    console.log(roomId)
if(!roomId) return
    router.push(`/canvas/${roomId}`);
  }

  async function createnewroom(room:string)
  {
        const response=await axios.post(`${BACKEND_URL}/room`,{
            name:room
        })

        const roomId= response.data.roomId;

        router.push(`/canvas/${roomId}`);
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-neutral-900">
      <div className="bg-neutral-800 p-6 rounded-xl shadow-xl flex flex-col gap-5 w-96">
        <h1 className="text-white text-xl font-semibold text-center">
          Join or Create Room
        </h1>

        <input
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Enter Room name"
          className="px-4 py-2 rounded bg-neutral-700 text-white outline-none"
        />

        <button
          onClick={() => {
            joinexistingroom(room)
          }}
          className="bg-blue-600 hover:bg-blue-500 transition text-white py-2 rounded"
        >
          Join Existing Room
        </button>

        <div className="text-center text-neutral-400 text-sm">or</div>

        <button
          onClick={() => {
            createnewroom(room)
          }}
          className="bg-green-600 hover:bg-green-500 transition text-white py-2 rounded"
        >
          Create New Room
        </button>
      </div>
    </div>
  );
}
