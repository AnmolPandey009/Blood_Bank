import { useState } from 'react'

const mockDonors = [
  { id: 1, name: 'Rahul', bloodGroup: 'A+', city: 'Mumbai', lastDonation: '2025-07-12' },
  { id: 2, name: 'Priya', bloodGroup: 'O-', city: 'Pune', lastDonation: '2025-06-02' },
  { id: 3, name: 'Amit', bloodGroup: 'B+', city: 'Delhi', lastDonation: '2025-05-22' },
]

export default function BloodRequests() {
  const [bloodGroup, setBloodGroup] = useState('')
  const [city, setCity] = useState('')

  const filtered = mockDonors.filter((d) => (
    (!bloodGroup || d.bloodGroup === bloodGroup) && (!city || d.city.toLowerCase().includes(city.toLowerCase()))
  ))

  return (
    <div className="container-responsive py-12 px-10">
      <h1 className="text-2xl font-semibold mb-6">Blood Requests</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} className="rounded-md border px-3 py-2 text-sm">
          <option value="">All Groups</option>
          {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="rounded-md border px-3 py-2 text-sm" />
        <select className="rounded-md border px-3 py-2 text-sm">
          <option>Urgency</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <button className="rounded-md bg-red-500 text-white px-4 py-2 text-sm hover:bg-red-600">Search</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((d) => (
          <div key={d.id} className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{d.name}</div>
                <div className="text-sm text-gray-600">{d.city}</div>
              </div>
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600 font-semibold">{d.bloodGroup}</div>
            </div>
            <div className="mt-3 text-xs text-gray-600">Last donation: {d.lastDonation}</div>
            <button className="mt-4 w-full rounded-md border px-3 py-2 text-sm hover:bg-gray-50">Request</button>
          </div>
        ))}
      </div>
    </div>
  )
}
