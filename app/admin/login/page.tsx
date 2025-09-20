"use client"

import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-96">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-2 w-full rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
      />
      <button className="bg-blue-500 text-white w-full py-2 rounded">
        Login
      </button>
    </div>
  )
}
