"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import hospitals from "@/data/doctors";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  //for login check

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.replace("/login");
    }
  }, [router]);
  useEffect(() => {
  window.history.pushState(null, "", window.location.href);

  const handleBack = () => {
    router.replace("/login");
  };

  window.addEventListener("popstate", handleBack);

  return () => {
    window.removeEventListener("popstate", handleBack);
  };
}, [router]);
  
  const filteredHospitals =
    [...hospitals]
      //sort by distance
      .sort((a, b) => a.distance - b.distance)
      .filter((hospital) => {

        const hospitalMatch =
          hospital.name.toLowerCase().includes(search.toLowerCase());

        const doctorMatch =
          hospital.doctors.some((doctor) =>
            doctor.name.toLowerCase().includes(search.toLowerCase())
          );

        return hospitalMatch || doctorMatch;
      });

  return (

    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">

      <Navbar />

      {/* EMERGENCY BUTTON */}
      <div className="fixed bottom-6 right-6 z-50">

        <button
          onClick={() => {
            const box = document.getElementById("emergencyBox");
            if (box) box.classList.toggle("hidden");
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-full shadow-2xl font-bold animate-pulse"
        >
          🚑 Emergency
        </button>

        <div
          id="emergencyBox"
          className="hidden mt-3 bg-white p-4 rounded-2xl shadow-xl w-64"
        >
          <h3 className="font-bold text-red-600 text-lg">
            Emergency Help
          </h3>

          <p>🚑 Ambulance: <b>108</b></p>
          <p>👮 Police: <b>100</b></p>

          <button
            onClick={() => (window.location.href = "tel:108")}
            className="mt-3 w-full bg-red-600 text-white py-2 rounded-xl"
          >
            Call Ambulance
          </button>
        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="p-6 md:p-10">

        {/* HERO SECTION */}
        <div className="mt-6 relative rounded-3xl p-10 md:p-14 text-white shadow-2xl overflow-hidden border border-black/30">

          <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-600"></div>

          <div className="absolute -top-10 -left-10 w-60 h-60 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-cyan-200 opacity-10 rounded-full blur-3xl"></div>

          <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">

            {/* LEFT TEXT */}
            <div >
              <h1 className="text-5xl md:text-6xl font-extrabold mt-4 leading-tight drop-shadow-lg tracking-tight">
                Smart OPD
              </h1>

              {/* PREMIUM BADGE */}
              <div className="mt-3 inline-flex items-center gap-2 text-black backdrop-blur px-4 py-1 rounded-full border border-white/20">
                <span className="text-sm font-semibold text-white"  >
                  Online Appointment System
                  
                </span>
                
              </div>

              <p className="mt-5 text-blue-50 text-lg leading-relaxed max-w-lg">
                A modern digital healthcare platform to book appointments instantly, discover nearby hospitals,
                manage doctor queues, and access emergency support — all in one place.
              </p>

              <div className="mt-6 flex gap-4 flex-wrap">
                <Link href="/book">
                  <button className="bg-white text-blue-700 px-6 py-3 rounded-2xl font-bold hover:scale-105 transition shadow-lg">
                    Book Now
                  </button>
                </Link>
                

                <Link href="/ai">
                  <button className="border border-white/60 px-6 py-3 rounded-2xl font-bold hover:bg-white hover:text-blue-700 transition">
                    AI Symptom Checker
                  </button>
                </Link>

              </div>

            </div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-center">

              <div className="bg-white/10 p-5 rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl">

                <img
                  src="https://img.freepik.com/free-vector/doctors-concept-illustration_114360-1515.jpg"
                  alt="Healthcare"
                  className="w-full max-w-md rounded-2xl"
                />

              </div>

            </div>

          </div>

        </div>

        {/* TITLE */}
        <div className="mt-14 mb-8">

          <h2 className="text-4xl font-bold text-center text-gray-800">
            Nearby Hospitals
          </h2>

          <p className="text-center text-gray-500 mt-3">
            Search hospitals or doctors nearby
          </p>

          <div className="flex justify-center mt-8">

            <input
              type="text"
              placeholder="Search hospital or doctor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-2xl p-4 rounded-2xl border shadow-md outline-none focus:ring-4 focus:ring-blue-300 placeholder:text-gray-400 text-gray-900"
            />

          </div>

        </div>

        {/* NO RESULT */}
        {filteredHospitals.length === 0 && (
          <div className="text-center mt-20">
            <h2 className="text-3xl font-bold text-red-500">
              No Hospitals Found
            </h2>
          </div>
        )}

        {/* HOSPITAL LIST */}
        <div className="space-y-10">

          {filteredHospitals.map((hospital) => (

            <div
              key={hospital.id}
              className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition duration-300"
            >

              <img
                src={hospital.image}
                alt="Hospital"
                className="h-[520px] w-full object-cover rounded-3xl mb-6 shadow-xl"
              />

              <div className="flex flex-col md:flex-row md:justify-between md:items-center">

                <div>
                  <h2 className="text-3xl font-bold text-blue-700">
                    {hospital.name}
                  </h2>

                  <p className="mt-2 text-gray-600">
                    {hospital.address}
                  </p>
                </div>

                <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold mt-4 md:mt-0">
                  {hospital.distance} km away
                </span>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

                {hospital.doctors.map((doctor) => (

                  <div
                    key={doctor.id}
                    className="bg-blue-100 border rounded-2xl p-6 hover:border-blue-500 hover:shadow-lg transition"
                  >

                    <div className="flex items-center gap-4">

                      <img
                        src="https://cdn-icons-png.flaticon.com/512/387/387561.png"
                        alt="Doctor"
                        className="w-16 h-16"
                      />

                      <div>
                        <h3 className="text-2xl font-bold text-blue-900">
                          {doctor.name}
                        </h3>

                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {doctor.specialization}
                        </span>
                      </div>

                    </div>

                    <p className="mt-3 text-yellow-600 font-bold">
                      ⭐ 4.8 Rating
                    </p>

                    <p className="text-gray-900 font-semibold">
                      Queue: <span className="text-blue-700">{doctor.queue}</span>
                    </p>
                    <p className="text-gray-900 font-semibold">
                      Timing: <span className="text-blue-700">{doctor.timing}</span>
                    </p>

                    <p className="text-gray-900 font-semibold">
                      Status:{" "}
                      {doctor.available ? (
                        <span className="text-green-500 font-bold">
                          Available
                        </span>
                      ) : (
                        <span className="text-red-600 font-bold">
                          Not Available
                        </span>
                      )}
                    </p>

                    <Link href="/book">
                      <button className="bg-slate-100 hover:bg-indigo-200 text-black w-full py-3 rounded-2xl mt-6 font-bold overflow-hidden-border border border-stone-800 transition">
                        Book Appointment
                      </button>
                    </Link>

                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>

        {/* FOOTER */}
        <div className="bg-gray-900 text-white p-8 mt-20 rounded-3xl text-center">

          <h2 className="text-3xl font-bold">Smart OPD</h2>

          <p className="mt-3 text-gray-400">
            Digital Healthcare Appointment System
          </p>

        </div>

      </div>

    </div>
  );
}