import { useMemo } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function Dashboard() {
  const data = useMemo(() => ([
    { month: 'Jan', units: 120 },
    { month: 'Feb', units: 140 },
    { month: 'Mar', units: 160 },
    { month: 'Apr', units: 150 },
    { month: 'May', units: 170 },
    { month: 'Jun', units: 190 },
  ]), [])

  return (
    <div className="container-responsive py-12">
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-600">Donors</div>
          <div className="text-2xl font-semibold">2,345</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-600">Stock Units</div>
          <div className="text-2xl font-semibold">93</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-600">Pending Requests</div>
          <div className="text-2xl font-semibold">18</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1 space-y-2">
          {['Overview','Manage Donors','Manage Stock','Requests','Reports'].map((i) => (
            <button key={i} className="w-full text-left rounded-md border px-3 py-2 text-sm hover:bg-gray-50">{i}</button>
          ))}
        </aside>
        <section className="md:col-span-3 rounded-lg border p-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="units" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  )
}
