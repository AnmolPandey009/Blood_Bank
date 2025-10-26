import { useState } from 'react'

export default function BloodIssue() {
  const [activeTab, setActiveTab] = useState('issues')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')

  // Mock data for blood issues
  const bloodIssues = [
    {
      id: 'BI001',
      issueDate: '2025-01-20',
      requesterName: 'Dr. Smith',
      requesterType: 'Hospital',
      requesterId: 'H001',
      patientName: 'John Doe',
      patientAge: 45,
      bloodGroup: 'A+',
      units: 2,
      component: 'Whole Blood',
      expiryDate: '2025-02-15',
      donorId: 'D001',
      collectionDate: '2025-01-15',
      issuedBy: 'Staff Member',
      status: 'Issued',
      notes: 'Emergency surgery requirement'
    },
    {
      id: 'BI002',
      issueDate: '2025-01-18',
      requesterName: 'Dr. Johnson',
      requesterType: 'Hospital',
      requesterId: 'H002',
      patientName: 'Jane Smith',
      patientAge: 32,
      bloodGroup: 'O-',
      units: 1,
      component: 'RBC',
      expiryDate: '2025-02-20',
      donorId: 'D002',
      collectionDate: '2025-01-18',
      issuedBy: 'Admin',
      status: 'Issued',
      notes: 'Trauma case'
    },
    {
      id: 'BI003',
      issueDate: '2025-01-15',
      requesterName: 'Dr. Brown',
      requesterType: 'Hospital',
      requesterId: 'H004',
      patientName: 'Mike Wilson',
      patientAge: 28,
      bloodGroup: 'B+',
      units: 3,
      component: 'Whole Blood',
      expiryDate: '2025-02-10',
      donorId: 'D003',
      collectionDate: '2025-01-10',
      issuedBy: 'Staff Member',
      status: 'Completed',
      notes: 'Scheduled surgery'
    },
    {
      id: 'BI004',
      issueDate: '2025-01-10',
      requesterName: 'Dr. Davis',
      requesterType: 'Hospital',
      requesterId: 'H003',
      patientName: 'Sarah Johnson',
      patientAge: 35,
      bloodGroup: 'AB+',
      units: 1,
      component: 'Plasma',
      expiryDate: '2025-03-15',
      donorId: 'D004',
      collectionDate: '2025-01-05',
      issuedBy: 'Admin',
      status: 'Returned',
      notes: 'Patient condition improved, blood returned unused'
    }
  ]

  // Mock data for available stock
  const availableStock = [
    { id: 1, bloodGroup: 'A+', component: 'Whole Blood', units: 24, expiryDate: '2025-02-15', donorId: 'D001' },
    { id: 2, bloodGroup: 'A-', component: 'Whole Blood', units: 8, expiryDate: '2025-02-20', donorId: 'D002' },
    { id: 3, bloodGroup: 'B+', component: 'RBC', units: 18, expiryDate: '2025-02-10', donorId: 'D003' },
    { id: 4, bloodGroup: 'B-', component: 'Plasma', units: 6, expiryDate: '2025-03-20', donorId: 'D004' },
    { id: 5, bloodGroup: 'AB+', component: 'Platelets', units: 5, expiryDate: '2025-01-25', donorId: 'D005' },
    { id: 6, bloodGroup: 'AB-', component: 'Whole Blood', units: 2, expiryDate: '2025-02-28', donorId: 'D006' },
    { id: 7, bloodGroup: 'O+', component: 'Whole Blood', units: 30, expiryDate: '2025-02-12', donorId: 'D007' },
    { id: 8, bloodGroup: 'O-', component: 'RBC', units: 4, expiryDate: '2025-02-18', donorId: 'D008' }
  ]

  const filteredIssues = bloodIssues.filter(issue => {
    const matchesSearch = issue.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.requesterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = !selectedStatus || issue.status === selectedStatus
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Issued': return 'text-blue-600 bg-blue-100'
      case 'Completed': return 'text-green-600 bg-green-100'
      case 'Returned': return 'text-yellow-600 bg-yellow-100'
      case 'Expired': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const isExpiringSoon = (expiryDate) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7 && diffDays > 0
  }

  return (
    <div className="container-responsive py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Blood Issue Management</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('issues')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === 'issues' 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Issue Records
          </button>
          <button 
            onClick={() => setActiveTab('stock')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === 'stock' 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Available Stock
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search issues..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-md border px-3 py-2 text-sm"
        />
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value="">All Status</option>
          <option value="Issued">Issued</option>
          <option value="Completed">Completed</option>
          <option value="Returned">Returned</option>
          <option value="Expired">Expired</option>
        </select>
        <select className="rounded-md border px-3 py-2 text-sm">
          <option value="">All Blood Groups</option>
          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
            <option key={group} value={group}>{group}</option>
          ))}
        </select>
        <button className="rounded-md bg-red-500 text-white px-4 py-2 text-sm hover:bg-red-600">
          New Issue
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-600">Total Issues</div>
          <div className="text-2xl font-semibold text-red-600">{bloodIssues.length}</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-600">Issued Today</div>
          <div className="text-2xl font-semibold text-blue-600">
            {bloodIssues.filter(i => i.issueDate === '2025-01-20').length}
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-600">Completed</div>
          <div className="text-2xl font-semibold text-green-600">
            {bloodIssues.filter(i => i.status === 'Completed').length}
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-600">Returned</div>
          <div className="text-2xl font-semibold text-yellow-600">
            {bloodIssues.filter(i => i.status === 'Returned').length}
          </div>
        </div>
      </div>

      {/* Issue Records Tab */}
      {activeTab === 'issues' && (
        <div className="rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issue ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Requester
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient Info
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blood Details
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Donor Info
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
                {filteredIssues.map((issue) => (
                  <tr key={issue.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{issue.id}</div>
                      <div className="text-sm text-gray-500">{issue.issueDate}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{issue.requesterName}</div>
                      <div className="text-sm text-gray-500">{issue.requesterType}</div>
                      <div className="text-xs text-gray-400">ID: {issue.requesterId}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{issue.patientName}</div>
                      <div className="text-sm text-gray-500">Age: {issue.patientAge}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 font-semibold text-sm">
                          {issue.bloodGroup}
                        </div>
                        <div>
                          <div className="text-sm text-gray-900">{issue.units} units</div>
                          <div className="text-xs text-gray-500">{issue.component}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Donor: {issue.donorId}</div>
                      <div className="text-sm text-gray-500">Collected: {issue.collectionDate}</div>
                      <div className="text-xs text-gray-400">Expires: {issue.expiryDate}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(issue.status)}`}>
                        {issue.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-900">View</button>
                        <button className="text-green-600 hover:text-green-900">Update</button>
                        <button className="text-red-600 hover:text-red-900">Return</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Available Stock Tab */}
      {activeTab === 'stock' && (
        <div className="rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blood Group
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Component
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Units
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expiry Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Donor ID
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
                {availableStock.map((stock) => (
                  <tr key={stock.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 font-semibold text-sm">
                        {stock.bloodGroup}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {stock.component}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {stock.units}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <span className={isExpiringSoon(stock.expiryDate) ? 'text-yellow-600 font-medium' : ''}>
                          {stock.expiryDate}
                        </span>
                        {isExpiringSoon(stock.expiryDate) && (
                          <span className="ml-2 text-xs text-yellow-600">⚠️</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {stock.donorId}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Available
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-900">View</button>
                        <button className="text-green-600 hover:text-green-900">Issue</button>
                        <button className="text-red-600 hover:text-red-900">Expire</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 flex gap-4">
        <button className="rounded-md bg-red-500 text-white px-4 py-2 text-sm font-medium hover:bg-red-600">
          Issue Blood
        </button>
        <button className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
          Return Blood
        </button>
        <button className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
          Generate Report
        </button>
      </div>
    </div>
  )
}
