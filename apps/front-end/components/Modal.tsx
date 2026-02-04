"use client";
import { BACKEND_URL } from "@/config";
import axios from "axios";

import { useState } from "react";
export function AuthPage({ isSignin }: { isSignin: boolean }) {
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [name,setname]=useState("")
async function onclickhadler(){

    if(isSignin==true)
        {
            const response =await axios.post(`${BACKEND_URL}/signin`,{
                email,password
            })

            const token =response.data.token;
            localStorage.setItem("token",token);
        }
        else{
            const response= await axios.post(`${BACKEND_URL}/signup`,{
                email,password,name
            })

            console.log(response.data);
            
        }
    }
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#0f0f0f]">
      <div className="w-[360px] p-6 bg-[#181818] rounded-xl shadow-lg">
        
        <h1 className="text-white text-xl font-semibold mb-6 text-center">
          {isSignin ? "Sign In" : "Sign Up"}
        </h1>

  {
  !isSignin && (
    <div className="mb-4">
      <input
        value={name}
        onChange={(e) => setname(e.target.value)}
        type="name"
        placeholder="Name"
        className="w-full px-4 py-2 rounded bg-[#242424] text-white placeholder-gray-400 
                   focus:outline-none focus:ring-2 focus:ring-red-400"
      />
    </div>
  )
}


        {/* Email */}
        <div className="mb-4">
          <input value={email}
          onChange={(e)=>setemail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded bg-[#242424] text-white placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <input
            type="password"
            value={password}
            onChange={(e)=> setpassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 rounded bg-[#242424] text-white placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* Button */}
        <button
        onClick={()=>onclickhadler()}
          className="w-full bg-red-500 hover:bg-red-600 transition-colors 
                     text-white py-2 rounded font-medium"
        >
          {isSignin ? "Sign In" : "Sign Up"}
        </button>
      </div>
    </div>
  );
}
