import { useState } from 'react'

export default function RequestStatus() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')

  // Mock data for request status tracking
  const requests = [
    {
      id: 'REQ001',
      requesterName: 'Dr. Smith',
      requesterType: 'Hospital',
      requesterId: 'H001',
      bloodGroup: 'A+',
      units: 2,
      urgency: 'High',
      requestDate: '2025-01-20',
      requiredDate: '2025-01-22',
      status: 'Pending',
      currentStep: 'Verification',
      logs: [
        { timestamp: '2025-01-20 10:00', action: 'Request submitted', user: 'Dr. Smith', status: 'Pending' },
        { timestamp: '2025-01-20 10:30', action: 'Under review', user: 'Admin', status: 'Pending' },
        { timestamp: '2025-01-20 11:00', action: 'Verification in progress', user: 'Staff', status: 'Pending' }
      ]
    },
    {
      id: 'REQ002',
      requesterName: 'John Doe',
      requesterType: 'Individual',
      requesterId: 'I001',
      bloodGroup: 'O-',
      units: 1,
      urgency: 'Critical',
      requestDate: '2025-01-18',
      requiredDate: '2025-01-19',
      status: 'Approved',
      currentStep: 'Matching',
      logs: [
        { timestamp: '2025-01-18 14:00', action: 'Request submitted', user: 'John Doe', status: 'Pending' },
        { timestamp: '2025-01-18 14:15', action: 'Under review', user: 'Admin', status: 'Pending' },
        { timestamp: '2025-01-18 14:30', action: 'Approved', user: 'Admin', status: 'Approved' },
        { timestamp: '2025-01-18 15:00', action: 'Matching donors', user: 'Staff', status: 'Approved' }
      ]
    },
    {
      id: 'REQ003',
      requesterName: 'Dr. Johnson',
      requesterType: 'Hospital',
      requesterId: 'H002',
      bloodGroup: 'B+',
      units: 3,
      urgency: 'Medium',
      requestDate: '2025-01-15',
      requiredDate: '2025-01-20',
      status: 'Completed',
      currentStep: 'Completed',
      logs: [
        { timestamp: '2025-01-15 09:00', action: 'Request submitted', user: 'Dr. Johnson', status: 'Pending' },
        { timestamp: '2025-01-15 09:30', action: 'Under review', user: 'Admin', status: 'Pending' },
        { timestamp: '2025-01-15 10:00', action: 'Approved', user: 'Admin', status: 'Approved' },
        { timestamp: '2025-01-15 10:30', action: 'Donor matched', user: 'Staff', status: 'Approved' },
        { timestamp: '2025-01-15 11:00', action: 'Blood collected', user: 'Staff', status: 'Approved' },
        { timestamp: '2025-01-15 12:00', action: 'Blood issued', user: 'Staff', status: 'Completed' }
      ]
    },
    {
      id: 'REQ004',
      requesterName: 'Jane Smith',
      requesterType: 'Individual',
      requesterId: 'I002',
      bloodGroup: 'AB+',
      units: 1,
      urgency: 'Low',
      requestDate: '2025-01-10',
      requiredDate: '2025-01-25',
      status: 'Rejected',
      currentStep: 'Rejected',
      logs: [
        { timestamp: '2025-01-10 16:00', action: 'Request submitted', user: 'Jane Smith', status: 'Pending' },
        { timestamp: '2025-01-10 16:30', action: 'Under review', user: 'Admin', status: 'Pending' },
        { timestamp: '2025-01-10 17:00', action: 'Rejected - Insufficient stock', user: 'Admin', status: 'Rejected' }
      ]
    }
  ]

  const statusSteps = [
    'Pending',
    'Under Review',
    'Approved',
    'Matching',
    'Collection',
    'Issued',
    'Completed',
    'Rejected'
  ]

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.requesterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = !selectedStatus || request.status === selectedStatus
    const matchesTab = activeTab === 'all' || request.status.toLowerCase() === activeTab.toLowerCase()
    
    return matchesSearch && matchesStatus && matchesTab
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'text-yellow-600 bg-yellow-100'
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

  const getStepProgress = (currentStep) => {
    const stepIndex = statusSteps.findIndex(step => step.toLowerCase() === currentStep.toLowerCase())
    return ((stepIndex + 1) / statusSteps.length) * 100
  }

  return (
    <div className="container-responsive py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Request Status Tracking</h1>
        <button className="rounded-md bg-red-500 text-white px-4 py-2 text-sm hover:bg-red-600">
          New Request
        </button>
      </div>

      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search requests..."
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
          {statusSteps.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <select className="rounded-md border px-3 py-2 text-sm">
          <option value="">All Urgency</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
          Export Report
        </button>
      </div>

      {/* Status Tabs */}
      <div className="flex space-x-1 mb-6">
        {['all', 'pending', 'approved', 'completed', 'rejected'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === tab
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-600">Total Requests</div>
          <div className="text-2xl font-semibold text-red-600">{requests.length}</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-600">Pending</div>
          <div className="text-2xl font-semibold text-yellow-600">
            {requests.filter(r => r.status === 'Pending').length}
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-600">Approved</div>
          <div className="text-2xl font-semibold text-blue-600">
            {requests.filter(r => r.status === 'Approved').length}
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-600">Completed</div>
          <div className="text-2xl font-semibold text-green-600">
            {requests.filter(r => r.status === 'Completed').length}
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-lg border shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Request #{request.id}</h3>
                  <p className="text-sm text-gray-600">
                    {request.requesterType}: {request.requesterName}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getUrgencyColor(request.urgency)}`}>
                    {request.urgency}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600">Blood Group</div>
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 font-semibold text-sm">
                    {request.bloodGroup}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Units Required</div>
                  <div className="text-lg font-semibold">{request.units}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Request Date</div>
                  <div className="text-sm">{request.requestDate}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Required Date</div>
                  <div className="text-sm">{request.requiredDate}</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{request.currentStep}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getStepProgress(request.currentStep)}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                  View Details
                </button>
                <button className="text-green-600 hover:text-green-900 text-sm font-medium">
                  Update Status
                </button>
                <button className="text-purple-600 hover:text-purple-900 text-sm font-medium">
                  View Logs
                </button>
                {request.status === 'Pending' && (
                  <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                    Reject
                  </button>
                )}
              </div>
            </div>

            {/* Logs Section (Collapsible) */}
            <div className="border-t bg-gray-50 px-6 py-4">
              <div className="text-sm font-medium text-gray-900 mb-3">Activity Log</div>
              <div className="space-y-2">
                {request.logs.map((log, index) => (
                  <div key={index} className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="text-gray-600">{log.timestamp}</div>
                    <div className="text-gray-900">{log.action}</div>
                    <div className="text-gray-500">by {log.user}</div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(log.status)}`}>
                      {log.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
