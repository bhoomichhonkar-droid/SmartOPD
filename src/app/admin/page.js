"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);

  //  PROTECT ADMIN ROUTE
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user?.role !== "admin") {
      router.push("/login");
    }
  }, [router]);



  //  LOAD DATA
  useEffect(() => {
    const loadData = () => {
      const data = localStorage.getItem("appointments");
      setBookings(data ? JSON.parse(data) : []);
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br  from-blue-50 via-white to-blue-100 p-6 md:p-10">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Manage all patient appointments in real time
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white shadow-xl rounded-2xl p-6 border">
          <h2 className="text-gray-500">Total</h2>
          <p className="text-3xl font-bold text-blue-600 ">
            {bookings.length}
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6 border">
          <h2 className="text-gray-500">Pending</h2>
          <p className="text-3xl font-bold text-yellow-500">
            {bookings.filter(b => b.status === "pending").length}
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6 border">
          <h2 className="text-gray-500">Completed</h2>
          <p className="text-3xl font-bold text-green-600">
            {bookings.filter(b => b.status === "completed").length}
          </p>
        </div>

      </div>

      {/* BOOKINGS */}
      <div className="grid md:grid-cols-2 gap-6 ">

        {bookings.length === 0 ? (
          <p className="text-gray-600">No appointments found</p>
        ) : (
          bookings.map((b, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border p-6 hover:shadow-2xl transition"
            >

              <div className="flex justify-between">
                <h2 className="text-xl font-bold text-blue-700">
                  {b.name}
                </h2>

                <span className="bg-blue-100 px-3 py-1 rounded-full">
                  #{b.token}
                </span>
              </div>

              <div className="mt-3 text-gray-700">
                <p><b>Age:</b> {b.age}</p>
                <p><b>Phone:</b> {b.phone}</p>
                <p><b>Problem:</b> {b.problem}</p>
              </div>

              <div className="mt-4 flex justify-between">
                <span className="text-green-600">
                  {b.status}
                </span>
                <span className="text-gray-400 text-sm">
                  {b.time}
                </span>
              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
}
