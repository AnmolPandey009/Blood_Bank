import { useState } from 'react'

export default function BillingSystem() {
  const [activeTab, setActiveTab] = useState('bills')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')

  // Mock data for billing
  const bills = [
    {
      id: 'BILL001',
      billDate: '2025-01-20',
      customerName: 'Apollo Hospital',
      customerType: 'Hospital',
      customerId: 'H001',
      bloodGroup: 'A+',
      units: 2,
      component: 'Whole Blood',
      unitPrice: 500,
      totalAmount: 1000,
      tax: 180,
      finalAmount: 1180,
      paymentStatus: 'Paid',
      paymentDate: '2025-01-20',
      paymentMethod: 'Bank Transfer',
      transactionId: 'TXN001',
      dueDate: '2025-01-25',
      notes: 'Emergency surgery requirement'
    },
    {
      id: 'BILL002',
      billDate: '2025-01-18',
      customerName: 'Fortis Healthcare',
      customerType: 'Hospital',
      customerId: 'H002',
      bloodGroup: 'O-',
      units: 1,
      component: 'RBC',
      unitPrice: 300,
      totalAmount: 300,
      tax: 54,
      finalAmount: 354,
      paymentStatus: 'Pending',
      paymentDate: null,
      paymentMethod: null,
      transactionId: null,
      dueDate: '2025-01-23',
      notes: 'Trauma case'
    },
    {
      id: 'BILL003',
      billDate: '2025-01-15',
      customerName: 'Manipal Hospital',
      customerType: 'Hospital',
      customerId: 'H004',
      bloodGroup: 'B+',
      units: 3,
      component: 'Whole Blood',
      unitPrice: 500,
      totalAmount: 1500,
      tax: 270,
      finalAmount: 1770,
      paymentStatus: 'Paid',
      paymentDate: '2025-01-16',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN002',
      dueDate: '2025-01-20',
      notes: 'Scheduled surgery'
    },
    {
      id: 'BILL004',
      billDate: '2025-01-10',
      customerName: 'John Doe',
      customerType: 'Individual',
      customerId: 'I001',
      bloodGroup: 'AB+',
      units: 1,
      component: 'Plasma',
      unitPrice: 200,
      totalAmount: 200,
      tax: 36,
      finalAmount: 236,
      paymentStatus: 'Overdue',
      paymentDate: null,
      paymentMethod: null,
      transactionId: null,
      dueDate: '2025-01-15',
      notes: 'Personal medical requirement'
    }
  ]

  const paymentMethods = [
    { id: 'cash', name: 'Cash', icon: '💵' },
    { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
    { id: 'bank', name: 'Bank Transfer', icon: '🏦' },
    { id: 'upi', name: 'UPI', icon: '📱' },
    { id: 'cheque', name: 'Cheque', icon: '📄' }
  ]

  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.customerId.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = !selectedStatus || bill.paymentStatus === selectedStatus
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'text-green-600 bg-green-100'
      case 'Pending': return 'text-yellow-600 bg-yellow-100'
      case 'Overdue': return 'text-red-600 bg-red-100'
      case 'Cancelled': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const isOverdue = (dueDate) => {
    const today = new Date()
    const due = new Date(dueDate)
    return today > due
  }

  const totalRevenue = bills.filter(b => b.paymentStatus === 'Paid').reduce((sum, bill) => sum + bill.finalAmount, 0)
  const pendingAmount = bills.filter(b => b.paymentStatus === 'Pending').reduce((sum, bill) => sum + bill.finalAmount, 0)
  const overdueAmount = bills.filter(b => b.paymentStatus === 'Overdue').reduce((sum, bill) => sum + bill.finalAmount, 0)

  return (
    <div className="container-responsive py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Billing & Payment Management</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('bills')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === 'bills' 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Bills
          </button>
          <button 
            onClick={() => setActiveTab('payments')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === 'payments' 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Payments
          </button>
          <button 
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === 'reports' 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Reports
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search bills..."
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
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Overdue">Overdue</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <select className="rounded-md border px-3 py-2 text-sm">
          <option value="">All Customers</option>
          <option value="Hospital">Hospitals</option>
          <option value="Individual">Individuals</option>
        </select>
        <button className="rounded-md bg-red-500 text-white px-4 py-2 text-sm hover:bg-red-600">
          New Bill
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-600">Total Revenue</div>
          <div className="text-2xl font-semibold text-green-600">₹{totalRevenue.toLocaleString()}</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-600">Pending Amount</div>
          <div className="text-2xl font-semibold text-yellow-600">₹{pendingAmount.toLocaleString()}</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-600">Overdue Amount</div>
          <div className="text-2xl font-semibold text-red-600">₹{overdueAmount.toLocaleString()}</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm text-gray-600">Total Bills</div>
          <div className="text-2xl font-semibold text-blue-600">{bills.length}</div>
        </div>
      </div>

      {/* Bills Tab */}
      {activeTab === 'bills' && (
        <div className="rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bill ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blood Details
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBills.map((bill) => (
                  <tr key={bill.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{bill.id}</div>
                      <div className="text-sm text-gray-500">{bill.billDate}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{bill.customerName}</div>
                      <div className="text-sm text-gray-500">{bill.customerType}</div>
                      <div className="text-xs text-gray-400">ID: {bill.customerId}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 font-semibold text-sm">
                          {bill.bloodGroup}
                        </div>
                        <div>
                          <div className="text-sm text-gray-900">{bill.units} units</div>
                          <div className="text-xs text-gray-500">{bill.component}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₹{bill.finalAmount.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Tax: ₹{bill.tax}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(bill.paymentStatus)}`}>
                        {bill.paymentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className={isOverdue(bill.dueDate) && bill.paymentStatus !== 'Paid' ? 'text-red-600 font-medium' : ''}>
                        {bill.dueDate}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-900">View</button>
                        <button className="text-green-600 hover:text-green-900">Pay</button>
                        <button className="text-purple-600 hover:text-purple-900">Print</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payments Tab */}
      {activeTab === 'payments' && (
        <div className="space-y-6">
          {/* Payment Methods */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <span className="text-2xl">{method.icon}</span>
                  <span className="text-sm font-medium">{method.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Record Payment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bill ID</label>
                <select className="w-full rounded-md border px-3 py-2 text-sm">
                  <option value="">Select Bill</option>
                  {bills.filter(b => b.paymentStatus !== 'Paid').map(bill => (
                    <option key={bill.id} value={bill.id}>
                      {bill.id} - {bill.customerName} - ₹{bill.finalAmount}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <select className="w-full rounded-md border px-3 py-2 text-sm">
                  <option value="">Select Method</option>
                  {paymentMethods.map(method => (
                    <option key={method.id} value={method.id}>{method.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <input type="number" className="w-full rounded-md border px-3 py-2 text-sm" placeholder="Enter amount" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transaction ID</label>
                <input type="text" className="w-full rounded-md border px-3 py-2 text-sm" placeholder="Enter transaction ID" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea className="w-full rounded-md border px-3 py-2 text-sm" rows="3" placeholder="Payment notes"></textarea>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="rounded-md bg-red-500 text-white px-4 py-2 text-sm hover:bg-red-600">
                Record Payment
              </button>
              <button className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Revenue</span>
                  <span className="text-sm font-semibold text-green-600">₹{totalRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Pending Payments</span>
                  <span className="text-sm font-semibold text-yellow-600">₹{pendingAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Overdue Amount</span>
                  <span className="text-sm font-semibold text-red-600">₹{overdueAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left rounded-md border px-3 py-2 text-sm hover:bg-gray-50">
                  Generate Monthly Report
                </button>
                <button className="w-full text-left rounded-md border px-3 py-2 text-sm hover:bg-gray-50">
                  Export Payment History
                </button>
                <button className="w-full text-left rounded-md border px-3 py-2 text-sm hover:bg-gray-50">
                  Print Outstanding Bills
                </button>
                <button className="w-full text-left rounded-md border px-3 py-2 text-sm hover:bg-gray-50">
                  Send Payment Reminders
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 flex gap-4">
        <button className="rounded-md bg-red-500 text-white px-4 py-2 text-sm font-medium hover:bg-red-600">
          Generate Bill
        </button>
        <button className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
          Send Reminders
        </button>
        <button className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
          Export Data
        </button>
      </div>
    </div>
  )
}
