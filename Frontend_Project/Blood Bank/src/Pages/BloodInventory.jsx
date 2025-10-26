import { useState } from 'react'

export default function BloodInventory() {
  const [activeTab, setActiveTab] = useState('whole-blood')
  
  // Mock data for blood inventory
  const wholeBloodStock = [
    { id: 1, bloodGroup: 'A+', units: 24, expiryDate: '2025-02-15', donorId: 'D001', collectionDate: '2025-01-15', status: 'Available' },
    { id: 2, bloodGroup: 'A-', units: 8, expiryDate: '2025-02-20', donorId: 'D002', collectionDate: '2025-01-20', status: 'Available' },
    { id: 3, bloodGroup: 'B+', units: 18, expiryDate: '2025-02-10', donorId: 'D003', collectionDate: '2025-01-10', status: 'Available' },
    { id: 4, bloodGroup: 'B-', units: 6, expiryDate: '2025-02-25', donorId: 'D004', collectionDate: '2025-01-25', status: 'Available' },
    { id: 5, bloodGroup: 'AB+', units: 5, expiryDate: '2025-02-05', donorId: 'D005', collectionDate: '2025-01-05', status: 'Expired' },
    { id: 6, bloodGroup: 'AB-', units: 2, expiryDate: '2025-02-28', donorId: 'D006', collectionDate: '2025-01-28', status: 'Available' },
    { id: 7, bloodGroup: 'O+', units: 30, expiryDate: '2025-02-12', donorId: 'D007', collectionDate: '2025-01-12', status: 'Available' },
    { id: 8, bloodGroup: 'O-', units: 4, expiryDate: '2025-02-18', donorId: 'D008', collectionDate: '2025-01-18', status: 'Available' },
  ]

  const componentStock = [
    { id: 1, component: 'RBC', bloodGroup: 'A+', units: 20, expiryDate: '2025-02-15', donorId: 'D001', status: 'Available' },
    { id: 2, component: 'Plasma', bloodGroup: 'A+', units: 15, expiryDate: '2025-03-15', donorId: 'D001', status: 'Available' },
    { id: 3, component: 'Platelets', bloodGroup: 'A+', units: 8, expiryDate: '2025-01-25', donorId: 'D001', status: 'Available' },
    { id: 4, component: 'RBC', bloodGroup: 'O+', units: 25, expiryDate: '2025-02-12', donorId: 'D007', status: 'Available' },
    { id: 5, component: 'Plasma', bloodGroup: 'O+', units: 18, expiryDate: '2025-03-12', donorId: 'D007', status: 'Available' },
    { id: 6, component: 'Platelets', bloodGroup: 'O+', units: 12, expiryDate: '2025-01-22', donorId: 'D007', status: 'Available' },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'text-green-600 bg-green-100'
      case 'Expired': return 'text-red-600 bg-red-100'
      case 'Issued': return 'text-blue-600 bg-blue-100'
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

  const getExpiryStatus = (expiryDate) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return 'Expired'
    if (diffDays <= 7) return 'Expiring Soon'
    return 'Good'
  }

  return (
    <div className="container-responsive py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Blood Inventory Management</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('whole-blood')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === 'whole-blood' 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Whole Blood
          </button>
          <button 
            onClick={() => setActiveTab('components')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === 'components' 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Components
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-600">Total Units</div>
          <div className="text-2xl font-semibold text-red-600">
            {activeTab === 'whole-blood' ? wholeBloodStock.reduce((sum, item) => sum + item.units, 0) : componentStock.reduce((sum, item) => sum + item.units, 0)}
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-600">Available Units</div>
          <div className="text-2xl font-semibold text-green-600">
            {activeTab === 'whole-blood' 
              ? wholeBloodStock.filter(item => item.status === 'Available').reduce((sum, item) => sum + item.units, 0)
              : componentStock.filter(item => item.status === 'Available').reduce((sum, item) => sum + item.units, 0)
            }
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-600">Expiring Soon</div>
          <div className="text-2xl font-semibold text-yellow-600">
            {activeTab === 'whole-blood' 
              ? wholeBloodStock.filter(item => isExpiringSoon(item.expiryDate)).length
              : componentStock.filter(item => isExpiringSoon(item.expiryDate)).length
            }
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-600">Expired Units</div>
          <div className="text-2xl font-semibold text-red-600">
            {activeTab === 'whole-blood' 
              ? wholeBloodStock.filter(item => item.status === 'Expired').length
              : componentStock.filter(item => item.status === 'Expired').length
            }
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {activeTab === 'whole-blood' ? 'Blood Group' : 'Component'}
                </th>
                {activeTab === 'components' && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blood Group
                  </th>
                )}
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Units
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Collection Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donor ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(activeTab === 'whole-blood' ? wholeBloodStock : componentStock).map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 font-semibold text-sm">
                        {activeTab === 'whole-blood' ? item.bloodGroup : item.component}
                      </div>
                    </div>
                  </td>
                  {activeTab === 'components' && (
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.bloodGroup}
                    </td>
                  )}
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.units}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.collectionDate}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <span className={isExpiringSoon(item.expiryDate) ? 'text-yellow-600 font-medium' : ''}>
                        {item.expiryDate}
                      </span>
                      {isExpiringSoon(item.expiryDate) && (
                        <span className="ml-2 text-xs text-yellow-600">⚠️</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.donorId}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      <button className="text-red-600 hover:text-red-900">Issue</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex gap-4">
        <button className="rounded-md bg-red-500 text-white px-4 py-2 text-sm font-medium hover:bg-red-600">
          Add New Stock
        </button>
        <button className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
          Export Report
        </button>
        <button className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
          Expiry Alerts
        </button>
      </div>
    </div>
  )
}