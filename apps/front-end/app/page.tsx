"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6">
        <h1 className="text-xl font-semibold tracking-wide">
          Collab<span className="text-red-500">Draw</span>
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() => router.push("/signin")}
            className="px-4 py-2 rounded bg-[#242424] hover:bg-[#2f2f2f] transition"
          >
            Sign In
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 transition"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
          Draw. Collaborate. <br />
          <span className="text-red-500">In Real Time.</span>
        </h2>

        <p className="mt-6 text-gray-400 max-w-xl">
          CollabDraw is a real-time collaborative whiteboard inspired by Excalidraw.
          Sketch ideas, design flows, and brainstorm together — instantly.
        </p>

        <div className="mt-10 flex gap-4">
          <button
            onClick={() => router.push("/signup")}
            className="px-6 py-3 rounded bg-red-500 hover:bg-red-600 transition font-medium"
          >
            Get Started
          </button>
          <button
            onClick={() => router.push("/signin")}
            className="px-6 py-3 rounded border border-gray-600 hover:bg-[#242424] transition"
          >
            Sign In
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-6 text-sm">
        © {new Date().getFullYear()} CollabDraw. Built for collaboration.
      </footer>
    </div>
  );
}
