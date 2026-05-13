import Link from "next/link";

export default function DoctorCard({ doctor }) {

  return (

    <div className="border p-6 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 bg-white text-red-600">

      <h2 className="text-2xl font-bold text-blue-700">
        {doctor.name}
      </h2>

      <p className="mt-3 text-gray-600 text-lg">
        {doctor.specialization}
      </p>

      <p className="mt-2 text-gray-700">
        Hospital:

        <span className="font-semibold ml-2">
          {doctor.hospital}
        </span>
      </p>

      <p className="mt-2 text-gray-700">
        Address:

        <span className="font-semibold ml-2">
          {doctor.address}
        </span>
      </p>

      <p className="mt-2 text-gray-700">
        Distance:

        <span className="font-semibold ml-2">
          {doctor.distance}
        </span>
      </p>

      <p className="mt-2">
        Timing:

        <span className="font-semibold ml-2">
          {doctor.timing}
        </span>
      </p>

      <p className="mt-2">
        Queue:

        <span className="font-semibold ml-2">
          {doctor.queue}
        </span>
      </p>

      <p className="mt-2">
        Status:

        {doctor.available ? (

          <span className="text-green-600 font-bold ml-2">
            Available
          </span>

        ) : (

          <span className="text-red-600 font-bold ml-2">
            Not Available
          </span>

        )}

      </p>

      <Link href="/book">

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl mt-6 w-full">

          Book Appointment

        </button>

      </Link>

    </div>

  );
}