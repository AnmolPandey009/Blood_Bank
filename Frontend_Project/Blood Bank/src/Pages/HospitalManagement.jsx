import { useState } from 'react'

export default function HospitalManagement() {
  const [activeTab, setActiveTab] = useState('hospitals')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedHospital, setSelectedHospital] = useState('')

  // Mock data for hospitals
  const hospitals = [
    {
      id: 'H001',
      name: 'Apollo Hospital',
      address: '123 Medical Street, Mumbai',
      contact: '+91 98765 43210',
      email: 'contact@apollo.com',
      license: 'MH-2024-001',
      status: 'Active',
      totalRequests: 45,
      lastRequest: '2025-01-20',
      rating: 4.8
    },
    {
      id: 'H002',
      name: 'Fortis Healthcare',
      address: '456 Health Avenue, Delhi',
      contact: '+91 98765 43211',
      email: 'info@fortis.com',
      license: 'DL-2024-002',
      status: 'Active',
      totalRequests: 32,
      lastRequest: '2025-01-18',
      rating: 4.6
    },
    {
      id: 'H003',
      name: 'Max Hospital',
      address: '789 Care Road, Bangalore',
      contact: '+91 98765 43212',
      email: 'support@max.com',
      license: 'KA-2024-003',
      status: 'Pending',
      totalRequests: 0,
      lastRequest: null,
      rating: 0
    },
    {
      id: 'H004',
      name: 'Manipal Hospital',
      address: '321 Wellness Lane, Pune',
      contact: '+91 98765 43213',
      email: 'help@manipal.com',
      license: 'MH-2024-004',
      status: 'Active',
      totalRequests: 28,
      lastRequest: '2025-01-15',
      rating: 4.7
    }
  ]

  // Mock data for hospital requests
  const hospitalRequests = [
    {
      id: 'R001',
      hospitalId: 'H001',
      hospitalName: 'Apollo Hospital',
      bloodGroup: 'A+',
      units: 2,
      urgency: 'High',
      requestDate: '2025-01-20',
      requiredDate: '2025-01-22',
      status: 'Pending',
      patientName: 'John Doe',
      patientAge: 45,
      reason: 'Surgery',
      doctorName: 'Dr. Smith'
    },
    {
      id: 'R002',
      hospitalId: 'H002',
      hospitalName: 'Fortis Healthcare',
      bloodGroup: 'O-',
      units: 1,
      urgency: 'Critical',
      requestDate: '2025-01-18',
      requiredDate: '2025-01-19',
      status: 'Approved',
      patientName: 'Jane Smith',
      patientAge: 32,
      reason: 'Emergency',
      doctorName: 'Dr. Johnson'
    },
    {
      id: 'R003',
      hospitalId: 'H004',
      hospitalName: 'Manipal Hospital',
      bloodGroup: 'B+',
      units: 3,
      urgency: 'Medium',
      requestDate: '2025-01-15',
      requiredDate: '2025-01-20',
      status: 'Completed',
      patientName: 'Mike Wilson',
      patientAge: 28,
      reason: 'Treatment',
      doctorName: 'Dr. Brown'
    }
  ]

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredRequests = selectedHospital
    ? hospitalRequests.filter(request => request.hospitalId === selectedHospital)
    : hospitalRequests

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100'
      case 'Pending': return 'text-yellow-600 bg-yellow-100'
      case 'Suspended': return 'text-red-600 bg-red-100'
      case 'Approved': return 'text-blue-600 bg-blue-100'
      case 'Completed': return 'text-green-600 bg-green-100'
      case 'Rejected': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'Critical': return 'text-red-600 bg-red-100'
      case 'High': return 'text-orange-600 bg-orange-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      case 'Low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="container-responsive py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Hospital Management</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('hospitals')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === 'hospitals' 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Hospitals
          </button>
          <button 
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === 'requests' 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Hospital Requests
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search hospitals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-md border px-3 py-2 text-sm"
        />
        {activeTab === 'requests' && (
          <select
            value={selectedHospital}
            onChange={(e) => setSelectedHospital(e.target.value)}
            className="rounded-md border px-3 py-2 text-sm"
          >
            <option value="">All Hospitals</option>
            {hospitals.map(hospital => (
              <option key={hospital.id} value={hospital.id}>
                {hospital.name}
              </option>
            ))}
          </select>
        )}
        <button className="rounded-md bg-red-500 text-white px-4 py-2 text-sm hover:bg-red-600">
          {activeTab === 'hospitals' ? 'Add Hospital' : 'New Request'}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-600">Total Hospitals</div>
          <div className="text-2xl font-semibold text-red-600">{hospitals.length}</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-600">Active Hospitals</div>
          <div className="text-2xl font-semibold text-green-600">
            {hospitals.filter(h => h.status === 'Active').length}
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-600">Total Requests</div>
          <div className="text-2xl font-semibold text-blue-600">{hospitalRequests.length}</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-600">Pending Requests</div>
          <div className="text-2xl font-semibold text-yellow-600">
            {hospitalRequests.filter(r => r.status === 'Pending').length}
          </div>
        </div>
      </div>

      {/* Hospitals Tab */}
      {activeTab === 'hospitals' && (
        <div className="rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hospital
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    License
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Requests
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredHospitals.map((hospital) => (
                  <tr key={hospital.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{hospital.name}</div>
                        <div className="text-sm text-gray-500">{hospital.address}</div>
                        <div className="text-xs text-gray-400">ID: {hospital.id}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{hospital.contact}</div>
                      <div className="text-sm text-gray-500">{hospital.email}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {hospital.license}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(hospital.status)}`}>
                        {hospital.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>{hospital.totalRequests} total</div>
                      <div className="text-xs text-gray-500">Last: {hospital.lastRequest || 'Never'}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1">{hospital.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-900">View</button>
                        <button className="text-green-600 hover:text-green-900">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Suspend</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Hospital Requests Tab */}
      {activeTab === 'requests' && (
        <div className="rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hospital
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blood Group
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Units
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Urgency
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient Info
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.id}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{request.hospitalName}</div>
                      <div className="text-sm text-gray-500">Required: {request.requiredDate}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 font-semibold text-sm">
                        {request.bloodGroup}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.units}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getUrgencyColor(request.urgency)}`}>
                        {request.urgency}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{request.patientName}</div>
                      <div className="text-xs text-gray-500">Age: {request.patientAge} | {request.reason}</div>
                      <div className="text-xs text-gray-500">Dr. {request.doctorName}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-900">View</button>
                        <button className="text-green-600 hover:text-green-900">Approve</button>
                        <button className="text-red-600 hover:text-red-900">Reject</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
