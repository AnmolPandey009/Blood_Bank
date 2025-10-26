import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

export default function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const navigate = useNavigate()

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (!auth) {
      navigate('/admin-login')
      return
    }
    setUser(JSON.parse(auth))
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    navigate('/admin-login')
  }

  // Mock data for dashboard
  const overviewData = [
    { month: 'Jan', donations: 120, requests: 95, issued: 85 },
    { month: 'Feb', donations: 140, requests: 110, issued: 100 },
    { month: 'Mar', donations: 160, requests: 130, issued: 115 },
    { month: 'Apr', donations: 150, requests: 125, issued: 110 },
    { month: 'May', donations: 170, requests: 140, issued: 125 },
    { month: 'Jun', donations: 190, requests: 160, issued: 145 },
  ]

  const bloodGroupData = [
    { group: 'A+', stock: 24, requests: 8, issued: 6 },
    { group: 'A-', stock: 8, requests: 3, issued: 2 },
    { group: 'B+', stock: 18, requests: 6, issued: 4 },
    { group: 'B-', stock: 6, requests: 2, issued: 1 },
    { group: 'AB+', stock: 5, requests: 1, issued: 1 },
    { group: 'AB-', stock: 2, requests: 1, issued: 0 },
    { group: 'O+', stock: 30, requests: 12, issued: 10 },
    { group: 'O-', stock: 4, requests: 2, issued: 1 },
  ]

  const recentActivities = [
    { id: 1, type: 'donation', description: 'New donation from Rahul Sharma (A+)', time: '2 hours ago', status: 'completed' },
    { id: 2, type: 'request', description: 'Blood request from Hospital A (O+)', time: '4 hours ago', status: 'pending' },
    { id: 3, type: 'issue', description: 'Blood issued to Hospital B (B+)', time: '6 hours ago', status: 'completed' },
    { id: 4, type: 'expiry', description: 'Blood unit expired (AB+)', time: '1 day ago', status: 'expired' },
    { id: 5, type: 'donation', description: 'New donation from Priya Patel (O-)', time: '1 day ago', status: 'completed' },
  ]

  const getActivityIcon = (type) => {
    switch (type) {
      case 'donation': return '🩸'
      case 'request': return '📋'
      case 'issue': return '📤'
      case 'expiry': return '⚠️'
      default: return '📝'
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case 'donation': return 'text-green-600'
      case 'request': return 'text-blue-600'
      case 'issue': return 'text-purple-600'
      case 'expiry': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Blood Bank Management</h1>
              <p className="text-sm text-gray-600">Welcome back, {user.username} ({user.role})</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Last login: {new Date(user.loginTime).toLocaleString()}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: '📊' },
              { id: 'inventory', name: 'Inventory', icon: '🩸' },
              { id: 'donors', name: 'Donors', icon: '👥' },
              { id: 'requests', name: 'Requests', icon: '📋' },
              { id: 'hospitals', name: 'Hospitals', icon: '🏥' },
              { id: 'reports', name: 'Reports', icon: '📈' },
              ...(user.role === 'admin' ? [{ id: 'admin', name: 'Admin', icon: '⚙️' }] : [])
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === tab.id
                    ? 'bg-red-100 text-red-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <span className="text-2xl">🩸</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Stock</p>
                    <p className="text-2xl font-semibold text-gray-900">97 units</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <span className="text-2xl">👥</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Donors</p>
                    <p className="text-2xl font-semibold text-gray-900">2,345</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <span className="text-2xl">📋</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                    <p className="text-2xl font-semibold text-gray-900">18</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                    <p className="text-2xl font-semibold text-gray-900">5</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={overviewData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="donations" stroke="#ef4444" strokeWidth={2} />
                    <Line type="monotone" dataKey="requests" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="issued" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Blood Group Stock</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={bloodGroupData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="group" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="stock" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="px-6 py-4 flex items-center space-x-4">
                    <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${getActivityColor(activity.type)}`}>
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                      activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Other tabs would be implemented here */}
        {activeTab !== 'overview' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
            </h3>
            <p className="text-gray-600">
              This section will contain the {activeTab} management functionality.
              Navigate to the specific pages using the main navigation menu.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
