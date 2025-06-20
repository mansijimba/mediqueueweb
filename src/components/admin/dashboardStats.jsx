import { Calendar, Clock, Stethoscope, Users } from "lucide-react"

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Card 1 */}
      <div className="bg-white shadow-sm border rounded-lg p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Today's Appointments</p>
            <h3 className="text-2xl font-bold">24</h3>
            <p className="text-xs text-green-600">+8% from yesterday</p>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-white shadow-sm border rounded-lg p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100">
            <Users className="h-6 w-6 text-teal-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Patients</p>
            <h3 className="text-2xl font-bold">1,482</h3>
            <p className="text-xs text-green-600">+12% this month</p>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-white shadow-sm border rounded-lg p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
            <Stethoscope className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active Doctors</p>
            <h3 className="text-2xl font-bold">8</h3>
            <p className="text-xs text-orange-600">1 on leave</p>
          </div>
        </div>
      </div>

      {/* Card 4 */}
      <div className="bg-white shadow-sm border rounded-lg p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100">
            <Clock className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Avg. Wait Time</p>
            <h3 className="text-2xl font-bold">14 min</h3>
            <p className="text-xs text-green-600">-2 min from last week</p>
          </div>
        </div>
      </div>
    </div>
  )
}
