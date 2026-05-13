"use client";

import { useEffect, useState } from "react";

export default function QueuePage() {

  const [appointments, setAppointments] = useState([]);
  const [yourToken, setYourToken] = useState(null);

  // LOAD DATA
  useEffect(() => {

    const data =
      JSON.parse(localStorage.getItem("appointments") || "[]");

    setAppointments(data);

    // get last booking as "your token"
    if (data.length > 0) {
      setYourToken(data[data.length - 1].token);
    }

  }, []);

  if (appointments.length === 0) {
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold">
          No Queue Available
        </h1>
      </div>
    );
  }

  // CURRENT TOKEN = FIRST PENDING
  const currentToken =
    appointments.find(a => a.status !== "completed")?.token
    || appointments[0].token;

  // Waiting Calculation
  const waitingTime =
    yourToken && currentToken
      ? (yourToken - currentToken) * 5
      : 0;

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-8 text-blue-700">
        Live Queue Status
      </h1>

      <div className="border p-6 rounded-2xl shadow-lg max-w-lg bg-white">

        <p className="text-xl mb-4">
          Current Token:
          <span className="font-bold ml-2 text-red-600">
            #{currentToken}
          </span>
        </p>

        <p className="text-xl mb-4">
          Your Token:
          <span className="font-bold ml-2 text-blue-600">
            #{yourToken}
          </span>
        </p>

        <p className="text-xl">
          Estimated Waiting Time:
          <span className="font-bold ml-2 text-green-600">
            {waitingTime > 0 ? waitingTime : 0} mins
          </span>
        </p>

      </div>

    </div>
  );
}