"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {

  const router = useRouter();
  const [bookings, setBookings] = useState([]);

  // 🔒 PROTECT ADMIN ROUTE
  useEffect(() => {

    const user =
      JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
      router.push("/login");
    }

  }, []);

  // 📦 LOAD DATA
  useEffect(() => {

    const data =
      JSON.parse(localStorage.getItem("appointments") || "[]");

    setBookings(data);

  }, []);

  return (

    <div className="min-h-screen p-10 bg-gray-100">

      <h1 className="text-4xl font-bold text-blue-700">
        Admin Dashboard
      </h1>

      <p className="text-gray-500 mt-2">
        Manage all patient appointments
      </p>

      {/* BOOKINGS LIST */}
      <div className="mt-8 space-y-5">

        {bookings.length === 0 ? (
          <p className="text-gray-600">
            No appointments found
          </p>
        ) : (

          bookings.map((b, index) => (

            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow"
            >

              <h2 className="text-xl font-bold">
                {b.name}
              </h2>

              <p>Age: {b.age}</p>
              <p>Phone: {b.phone}</p>
              <p>Problem: {b.problem}</p>

              <p className="mt-2 text-blue-600 font-bold">
                Token: {b.token}
              </p>

              <p className="text-green-600">
                Status: {b.status || "pending"}
              </p>

              <p className="text-sm text-gray-500">
                {b.time}
              </p>

            </div>

          ))

        )}

      </div>

    </div>
  );
}