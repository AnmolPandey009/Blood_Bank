import { useState } from 'react'

export default function DonationHistory() {
  const [selectedDonor, setSelectedDonor] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data for donors and their donation history
  const donors = [
    {
      id: 'D001',
      name: 'Rahul Sharma',
      bloodGroup: 'A+',
      phone: '+91 98765 43210',
      email: 'rahul@email.com',
      totalDonations: 8,
      lastDonation: '2025-01-15',
      nextEligible: '2025-03-15',
      status: 'Active'
    },
    {
      id: 'D002',
      name: 'Priya Patel',
      bloodGroup: 'O-',
      phone: '+91 98765 43211',
      email: 'priya@email.com',
      totalDonations: 12,
      lastDonation: '2025-01-20',
      nextEligible: '2025-03-20',
      status: 'Active'
    },
    {
      id: 'D003',
      name: 'Amit Kumar',
      bloodGroup: 'B+',
      phone: '+91 98765 43212',
      email: 'amit@email.com',
      totalDonations: 5,
      lastDonation: '2024-12-10',
      nextEligible: '2025-02-10',
      status: 'Active'
    },
    {
      id: 'D004',
      name: 'Sneha Singh',
      bloodGroup: 'AB+',
      phone: '+91 98765 43213',
      email: 'sneha@email.com',
      totalDonations: 3,
      lastDonation: '2024-11-05',
      nextEligible: '2025-01-05',
      status: 'Inactive'
    }
  ]

  const donationHistory = [
    {
      id: 1,
      donorId: 'D001',
      donationDate: '2025-01-15',
      bloodGroup: 'A+',
      units: 1,
      hemoglobin: '14.2',
      bloodPressure: '120/80',
      weight: '70kg',
      status: 'Completed',
      issuedTo: 'Hospital A',
      issuedDate: '2025-01-20'
    },
    {
      id: 2,
      donorId: 'D001',
      donationDate: '2024-11-15',
      bloodGroup: 'A+',
      units: 1,
      hemoglobin: '13.8',
      bloodPressure: '118/78',
      weight: '69kg',
      status: 'Completed',
      issuedTo: 'Hospital B',
      issuedDate: '2024-12-01'
    },
    {
      id: 3,
      donorId: 'D002',
      donationDate: '2025-01-20',
      bloodGroup: 'O-',
      units: 1,
      hemoglobin: '13.5',
      bloodPressure: '115/75',
      weight: '65kg',
      status: 'Completed',
      issuedTo: 'Hospital C',
      issuedDate: '2025-01-25'
    },
    {
      id: 4,
      donorId: 'D002',
      donationDate: '2024-10-20',
      bloodGroup: 'O-',
      units: 1,
      hemoglobin: '14.0',
      bloodPressure: '122/82',
      weight: '66kg',
      status: 'Completed',
      issuedTo: 'Hospital A',
      issuedDate: '2024-11-05'
    }
  ]

  const filteredDonors = donors.filter(donor => 
    donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectedDonorHistory = selectedDonor 
    ? donationHistory.filter(history => history.donorId === selectedDonor)
    : donationHistory

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100'
      case 'Inactive': return 'text-red-600 bg-red-100'
      case 'Completed': return 'text-blue-600 bg-blue-100'
      case 'Pending': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const isEligibleForDonation = (lastDonation, nextEligible) => {
    const today = new Date()
    const eligibleDate = new Date(nextEligible)
    return today >= eligibleDate
  }

  return (
    <div className="container-responsive py-12">
      <h1 className="text-2xl font-semibold mb-6">Donation History & Donor Management</h1>

      {/* Search and Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search donors by name, ID, or blood group..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-md border px-3 py-2 text-sm"
        />
        <select
          value={selectedDonor}
          onChange={(e) => setSelectedDonor(e.target.value)}
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value="">All Donors</option>
          {filteredDonors.map(donor => (
            <option key={donor.id} value={donor.id}>
              {donor.name} ({donor.bloodGroup})
            </option>
          ))}
        </select>
        <button className="rounded-md bg-red-500 text-white px-4 py-2 text-sm hover:bg-red-600">
          Add New Donation
        </button>
      </div>

      {/* Donors Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-600">Total Donors</div>
          <div className="text-2xl font-semibold text-red-600">{donors.length}</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-600">Active Donors</div>
          <div className="text-2xl font-semibold text-green-600">
            {donors.filter(d => d.status === 'Active').length}
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-600">Total Donations</div>
          <div className="text-2xl font-semibold text-blue-600">
            {donors.reduce((sum, donor) => sum + donor.totalDonations, 0)}
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-600">Eligible for Donation</div>
          <div className="text-2xl font-semibold text-yellow-600">
            {donors.filter(d => isEligibleForDonation(d.lastDonation, d.nextEligible)).length}
          </div>
        </div>
      </div>

      {/* Donors List */}
      <div className="rounded-lg border overflow-hidden mb-6">
        <div className="bg-gray-50 px-4 py-3">
          <h3 className="text-lg font-medium">Donor Information</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donor
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blood Group
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Donations
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Donation
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Eligible
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
              {filteredDonors.map((donor) => (
                <tr key={donor.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{donor.name}</div>
                      <div className="text-sm text-gray-500">{donor.id}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 font-semibold text-sm">
                      {donor.bloodGroup}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {donor.totalDonations}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {donor.lastDonation}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <span className={isEligibleForDonation(donor.lastDonation, donor.nextEligible) ? 'text-green-600 font-medium' : ''}>
                        {donor.nextEligible}
                      </span>
                      {isEligibleForDonation(donor.lastDonation, donor.nextEligible) && (
                        <span className="ml-2 text-xs text-green-600">✓</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(donor.status)}`}>
                      {donor.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedDonor(donor.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View History
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        Schedule
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Donation History */}
      <div className="rounded-lg border overflow-hidden">
        <div className="bg-gray-50 px-4 py-3">
          <h3 className="text-lg font-medium">
            Donation History {selectedDonor && `- ${donors.find(d => d.id === selectedDonor)?.name}`}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donation Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blood Group
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Units
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Health Metrics
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issued To
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issued Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {selectedDonorHistory.map((history) => (
                <tr key={history.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {history.donationDate}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 font-semibold text-sm">
                      {history.bloodGroup}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {history.units}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="text-xs">
                      <div>Hb: {history.hemoglobin}</div>
                      <div>BP: {history.bloodPressure}</div>
                      <div>Wt: {history.weight}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(history.status)}`}>
                      {history.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {history.issuedTo}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {history.issuedDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


