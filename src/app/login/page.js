"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // auto redirect if already logged in
  

   useEffect(() => {

      const storedUser = localStorage.getItem("user");

      if (!storedUser) return;

      const user = JSON.parse(storedUser);

      if (user?.role === "admin") {
        router.push("/admin");
      } else if (user?.role === "doctor") {
        router.push("/queue");
      } else {
        router.push("/home");
      }


  }, [router]);

  const handleLogin = (e) => {
    e.preventDefault();

    let role = "patient";

    // ADMIN LOGIN
    if (
      email.trim() === "admin@example.com" &&
      password === "admin123"
    ) {
      role = "admin";
    }

    // DOCTOR LOGIN
    else if(
      email.trim() === "doctor@example.com" &&
      password === "doctor123"
    ) {
      role = "doctor";
    }

    // BASIC VALIDATION
    else if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // SAVE USER SESSION
    localStorage.setItem(
      "user",
      JSON.stringify({
        email,
        role,
      })
    );

    // COOKIE (optional)
    document.cookie = `role=${role}; path=/`;

    // ROUTING
    if (role === "admin") {
      router.push("/admin");
    } else if (role === "doctor") {
      router.push("/queue");
    } else {
      router.push("/home");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-cyan-500 p-6">

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-blue-700">
          Smart OPD
        </h1>

        <p className="text-center text-gray-500 mt-3">
          Login to continue
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-300 text-black placeholder:text-black"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-300 text-black placeholder:text-black"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold transition"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}