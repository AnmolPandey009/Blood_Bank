import { Link } from 'react-router-dom';

export default function RoleSelection() {
  const roles = [
    {
      title: 'Blood Donor',
      description: 'Register to donate blood and save lives',
      icon: '🩸',
      features: ['Auto-approval', 'Donation tracking', 'Eligibility check'],
      link: '/donor-signup',
      color: 'bg-red-50 border-red-200 hover:bg-red-100',
      buttonColor: 'bg-red-500 hover:bg-red-600'
    },
    {
      title: 'Patient',
      description: 'Register to request blood when needed',
      icon: '🏥',
      features: ['Auto-approval', 'Quick requests', 'Status tracking'],
      link: '/patient-signup',
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      buttonColor: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Hospital',
      description: 'Register your hospital for bulk requests',
      icon: '🏢',
      features: ['Admin approval required', 'Bulk requests', 'Inventory management'],
      link: '/hospital-signup',
      color: 'bg-green-50 border-green-200 hover:bg-green-100',
      buttonColor: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Blood Bank',
      description: 'Register your blood bank organization',
      icon: '🏛️',
      features: ['Admin approval required', 'Inventory management', 'Donation processing'],
      link: '/bloodbank-signup',
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      buttonColor: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  return (
    <div className="container-responsive py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Blood Bank Community</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose your role to get started. Each role has different features and approval processes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {roles.map((role, index) => (
          <div
            key={index}
            className={`${role.color} border-2 rounded-lg p-6 transition-all duration-200 hover:shadow-lg`}
          >
            <div className="text-center mb-4">
              <div className="text-4xl mb-3">{role.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{role.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{role.description}</p>
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {role.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to={role.link}
              className={`${role.buttonColor} text-white px-4 py-2 rounded-md text-sm font-medium w-full text-center block transition-colors duration-200`}
            >
              Register as {role.title}
            </Link>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Role Comparison</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Role</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Signup</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Approval Required</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Primary Functions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-medium">Donor</td>
                <td className="border border-gray-300 px-4 py-3">Yes</td>
                <td className="border border-gray-300 px-4 py-3">Auto</td>
                <td className="border border-gray-300 px-4 py-3">Register, donate, view history</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 font-medium">Patient</td>
                <td className="border border-gray-300 px-4 py-3">Yes</td>
                <td className="border border-gray-300 px-4 py-3">Auto</td>
                <td className="border border-gray-300 px-4 py-3">Request blood, track status</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-medium">Hospital</td>
                <td className="border border-gray-300 px-4 py-3">Yes</td>
                <td className="border border-gray-300 px-4 py-3">Yes</td>
                <td className="border border-gray-300 px-4 py-3">Bulk requests, manage inventory</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 font-medium">Blood Bank</td>
                <td className="border border-gray-300 px-4 py-3">Yes</td>
                <td className="border border-gray-300 px-4 py-3">Yes</td>
                <td className="border border-gray-300 px-4 py-3">Manage inventory, process donations</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-medium">Staff</td>
                <td className="border border-gray-300 px-4 py-3">Admin only</td>
                <td className="border border-gray-300 px-4 py-3">N/A</td>
                <td className="border border-gray-300 px-4 py-3">Operational tasks based on designation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-red-500 hover:text-red-600 font-medium">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
