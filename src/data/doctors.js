const hospitals = [

  { 
    id: 1,
    name: "Ruby Hospital",
    address: "Rajpur Road, Dehradun",
    distance: 2.5,

    image:

      "https://images.unsplash.com/photo-1739185069005-8cb46fef2702?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG9zcGl0YWwlMjBleHRlcmlvcnxlbnwwfHwwfHx8MA%3D%3D",
    doctors: [
      {
        id: 101,
        name: "Dr Sharma",
        specialization: "Cardiologist",
        available: true,
        timing: "4 PM - 7 PM",
        queue: 6
      },
      {
        id: 102,
        name: "Dr Mehta",
        specialization: "Orthopedic",
        available: true,
        timing: "10 AM - 2 PM",
        queue: 3
      }
    ]
  },

  {
    id: 2,
    name: "Max Hospital",
    address: "Ballupur Chowk, Dehradun",
    distance: 4,

    image:
      "https://media.istockphoto.com/id/1130389312/photo/building-with-large-h-sign-for-hospital.webp?a=1&b=1&s=612x612&w=0&k=20&c=6OhW-mRsQPyaZnpL6HT9ddodDKD1cEOBi57UAIzO3lo=",

    doctors: [
      {
        id: 201,
        name: "Dr Khan",
        specialization: "Dentist",
        available: true,
        timing: "2 PM - 5 PM",
        queue: 2
      },
      {
        id: 202,
        name: "Dr Anand",
        specialization: "Neurologist",
        available: false,
        timing: "5 PM - 8 PM",
        queue: 0
      }
      


    ]
  }

];

export default hospitals;