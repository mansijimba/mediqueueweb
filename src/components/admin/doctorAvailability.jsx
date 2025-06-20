export function DoctorAvailability() {
  const doctorAvailability = [
    {
      id: 1,
      name: "Dr. Emily Chen",
      specialty: "General Medicine",
      availability: [
        { day: "Monday", slots: 8, booked: 6 },
        { day: "Wednesday", slots: 8, booked: 5 },
        { day: "Friday", slots: 8, booked: 7 },
      ],
    },
    {
      id: 2,
      name: "Dr. James Wilson",
      specialty: "Cardiology",
      availability: [
        { day: "Tuesday", slots: 6, booked: 4 },
        { day: "Thursday", slots: 6, booked: 6 },
        { day: "Saturday", slots: 4, booked: 2 },
      ],
    },
    {
      id: 3,
      name: "Dr. David Lee",
      specialty: "Pediatrics",
      availability: [
        { day: "Monday", slots: 7, booked: 4 },
        { day: "Tuesday", slots: 7, booked: 5 },
        { day: "Thursday", slots: 7, booked: 3 },
      ],
    },
    {
      id: 4,
      name: "Dr. Sarah Johnson",
      specialty: "Dermatology",
      availability: [
        { day: "Wednesday", slots: 6, booked: 3 },
        { day: "Friday", slots: 6, booked: 5 },
      ],
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold mb-4">Doctor Availability</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-500">
            <tr>
              <th scope="col" className="px-4 py-3">Doctor</th>
              <th scope="col" className="px-4 py-3">Specialty</th>
              <th scope="col" className="px-4 py-3">Available Days</th>
              <th scope="col" className="px-4 py-3">Available Slots</th>
            </tr>
          </thead>
          <tbody>
            {doctorAvailability.map((doctor) => {
              const totalSlots = doctor.availability.reduce((sum, a) => sum + a.slots, 0);
              const totalBooked = doctor.availability.reduce((sum, a) => sum + a.booked, 0);
              const freeSlots = totalSlots - totalBooked;
              const fillPercent = (freeSlots / totalSlots) * 100;

              return (
                <tr key={doctor.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{doctor.name}</td>
                  <td className="px-4 py-3">{doctor.specialty}</td>
                  <td className="px-4 py-3">
                    {doctor.availability.map((a) => a.day).join(", ")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-full max-w-[150px] bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-teal-600 h-2.5 rounded-full"
                          style={{ width: `${fillPercent}%` }}
                        ></div>
                      </div>
                      <span className="text-sm whitespace-nowrap">
                        {freeSlots} / {totalSlots}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
