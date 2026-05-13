"use client";

import { useState } from "react";
import Link from "next/link";

export default function BookingPage() {

  const [token, setToken] = useState(null);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [problem, setProblem] = useState("");

  // BOOKING FUNCTION
  const handleBooking = (e) => {
    e.preventDefault();

    try {
      const generatedToken =
        Math.floor(100 + Math.random() * 900);

      const booking = {
        name,
        age,
        phone,
        problem,
        token: generatedToken,
        status: "pending",
        time: new Date().toLocaleString(),
      };
      console.log("Generated Booking:", booking);
      //get old data from local storage
      const existing =
        JSON.parse(
          localStorage.getItem("appointments") || "[]"
        );
      console.log("Existing Appointments:", existing);
      
        // PUSH NEW
      existing.push(booking);

         // SAVE
      localStorage.setItem(
        "appointments",
        JSON.stringify(existing)
      );
      // SHOW TOKEN
      setToken(generatedToken);

      // CLEAR FORM
      setName("");
      setAge("");
      setPhone("");
      setProblem("");

      alert("Appointment booked successfully!");
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }

    

  };

  return (

    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6 md:p-10">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-700 via-indigo-700 to-cyan-600 text-white rounded-3xl p-8 md:p-12 shadow-2xl">

        <h1 className="text-5xl font-extrabold text-center">
          Book Appointment
        </h1>

        <p className="text-center text-blue-100 mt-4 text-lg">
          Book appointments easily and avoid long waiting queues.
        </p>

      </div>

      {/* FORM */}
      <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-3xl p-8 mt-10">

        <form
          onSubmit={handleBooking}
          className="flex flex-col gap-5"
        >

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Patient Name"
            className="border p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-300 text-black placeholder:text-black"
            required
          />

          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type="number"
            placeholder="Age"
            className="border p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-300 text-black placeholder:text-black"
            required
          />

          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            placeholder="Phone Number"
            className="border p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-300 text-black placeholder:text-black"
            required
          />

          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Describe Your Problem"
            className="border p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-300 text-black placeholder:text-black"
            rows={4}
            required
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-black p-4 rounded-2xl font-bold text-lg transition hover:scale-105 shadow-lg"
          >
            Confirm Appointment
          </button>

        </form>

      </div>

      {/* SUCCESS BOX */}
      {token !== null && (

        <div className="max-w-2xl mx-auto mt-8 bg-green-100 border border-green-300 p-6 rounded-3xl shadow-xl">

          <h2 className="text-3xl font-bold text-green-700">
            Appointment Confirmed 🎉
          </h2>

          <p className="mt-4 text-lg">
            Your Token Number:
            <span className="font-bold text-green-800">
              {" "}#{token}
            </span>
          </p>

          <p className="mt-2 text-gray-700">
            Estimated Waiting Time:
            {" "}
            <span className="font-semibold">
              {token * 2} mins
            </span>
          </p>

          <Link href="/admin">

            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl mt-6 w-full font-bold transition">

              View Admin Dashboard

            </button>

          </Link>

        </div>

      )}

    </div>
  );
}