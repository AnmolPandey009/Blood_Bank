const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// API call helper function
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: getAuthHeaders(),
    ...options
  };

  try {
    console.log('Making API call to:', url);
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('API Response:', data);
    return data;
  } catch (error) {
    console.error('API call error:', error);
    
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Unable to connect to server. Please check if the backend is running on http://localhost:5000');
    }
    
    throw error;
  }
};

// Authentication API calls
export const authAPI = {
  // User signup
  signup: async (userData) => {
    return apiCall('/users/signup', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  // User login
  login: async (credentials) => {
    return apiCall('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Get token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  }
};

// Donors API calls
export const donorsAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/donors${queryString ? `?${queryString}` : ''}`);
  },

  getById: (id) => {
    return apiCall(`/donors/${id}`);
  },

  create: (donorData) => {
    return apiCall('/donors', {
      method: 'POST',
      body: JSON.stringify(donorData)
    });
  },

  update: (id, donorData) => {
    return apiCall(`/donors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(donorData)
    });
  },

  delete: (id) => {
    return apiCall(`/donors/${id}`, {
      method: 'DELETE'
    });
  },

  getStats: () => {
    return apiCall('/donors/stats');
  }
};

// Patients API calls
export const patientsAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/patients${queryString ? `?${queryString}` : ''}`);
  },

  getById: (id) => {
    return apiCall(`/patients/${id}`);
  },

  create: (patientData) => {
    return apiCall('/patients', {
      method: 'POST',
      body: JSON.stringify(patientData)
    });
  },

  update: (id, patientData) => {
    return apiCall(`/patients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(patientData)
    });
  },

  delete: (id) => {
    return apiCall(`/patients/${id}`, {
      method: 'DELETE'
    });
  },

  getStats: () => {
    return apiCall('/patients/stats');
  }
};

// Blood Inventory API calls
export const bloodInventoryAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/blood-inventory${queryString ? `?${queryString}` : ''}`);
  },

  getById: (id) => {
    return apiCall(`/blood-inventory/${id}`);
  },

  create: (inventoryData) => {
    return apiCall('/blood-inventory', {
      method: 'POST',
      body: JSON.stringify(inventoryData)
    });
  },

  update: (id, inventoryData) => {
    return apiCall(`/blood-inventory/${id}`, {
      method: 'PUT',
      body: JSON.stringify(inventoryData)
    });
  },

  delete: (id) => {
    return apiCall(`/blood-inventory/${id}`, {
      method: 'DELETE'
    });
  },

  getStats: () => {
    return apiCall('/blood-inventory/stats');
  },

  getExpiring: (days = 7) => {
    return apiCall(`/blood-inventory/expiring?days=${days}`);
  }
};

// Blood Donations API calls
export const bloodDonationsAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/blood-donations${queryString ? `?${queryString}` : ''}`);
  },

  getById: (id) => {
    return apiCall(`/blood-donations/${id}`);
  },

  create: (donationData) => {
    return apiCall('/blood-donations', {
      method: 'POST',
      body: JSON.stringify(donationData)
    });
  },

  update: (id, donationData) => {
    return apiCall(`/blood-donations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(donationData)
    });
  },

  delete: (id) => {
    return apiCall(`/blood-donations/${id}`, {
      method: 'DELETE'
    });
  },

  getStats: () => {
    return apiCall('/blood-donations/stats');
  }
};

// Blood Requests API calls
export const bloodRequestsAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/blood-requests${queryString ? `?${queryString}` : ''}`);
  },

  getById: (id) => {
    return apiCall(`/blood-requests/${id}`);
  },

  create: (requestData) => {
    return apiCall('/blood-requests', {
      method: 'POST',
      body: JSON.stringify(requestData)
    });
  },

  update: (id, requestData) => {
    return apiCall(`/blood-requests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(requestData)
    });
  },

  updateStatus: (id, status) => {
    return apiCall(`/blood-requests/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  },

  delete: (id) => {
    return apiCall(`/blood-requests/${id}`, {
      method: 'DELETE'
    });
  },

  getStats: () => {
    return apiCall('/blood-requests/stats');
  }
};

// Hospitals API calls
export const hospitalsAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/hospitals${queryString ? `?${queryString}` : ''}`);
  },

  getById: (id) => {
    return apiCall(`/hospitals/${id}`);
  },

  create: (hospitalData) => {
    return apiCall('/hospitals', {
      method: 'POST',
      body: JSON.stringify(hospitalData)
    });
  },

  update: (id, hospitalData) => {
    return apiCall(`/hospitals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(hospitalData)
    });
  },

  delete: (id) => {
    return apiCall(`/hospitals/${id}`, {
      method: 'DELETE'
    });
  },

  getStats: () => {
    return apiCall('/hospitals/stats');
  },

  getByLocation: (city, state) => {
    const params = new URLSearchParams();
    if (city) params.append('city', city);
    if (state) params.append('state', state);
    return apiCall(`/hospitals/location?${params.toString()}`);
  }
};

// Users API calls
export const usersAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/users${queryString ? `?${queryString}` : ''}`);
  },

  getById: (id) => {
    return apiCall(`/users/${id}`);
  },

  create: (userData) => {
    return apiCall('/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  update: (id, userData) => {
    return apiCall(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  },

  changePassword: (id, passwordData) => {
    return apiCall(`/users/${id}/change-password`, {
      method: 'PUT',
      body: JSON.stringify(passwordData)
    });
  },

  delete: (id) => {
    return apiCall(`/users/${id}`, {
      method: 'DELETE'
    });
  },

  getStats: () => {
    return apiCall('/users/stats');
  }
};

// Blood Components API calls
export const bloodComponentsAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/blood-components${queryString ? `?${queryString}` : ''}`);
  },

  getById: (id) => {
    return apiCall(`/blood-components/${id}`);
  },

  create: (componentData) => {
    return apiCall('/blood-components', {
      method: 'POST',
      body: JSON.stringify(componentData)
    });
  },

  update: (id, componentData) => {
    return apiCall(`/blood-components/${id}`, {
      method: 'PUT',
      body: JSON.stringify(componentData)
    });
  },

  delete: (id) => {
    return apiCall(`/blood-components/${id}`, {
      method: 'DELETE'
    });
  },

  getStats: () => {
    return apiCall('/blood-components/stats');
  },

  getExpiring: (days = 7) => {
    return apiCall(`/blood-components/expiring?days=${days}`);
  }
};

// Blood Issues API calls
export const bloodIssuesAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/blood-issues${queryString ? `?${queryString}` : ''}`);
  },

  getById: (id) => {
    return apiCall(`/blood-issues/${id}`);
  },

  create: (issueData) => {
    return apiCall('/blood-issues', {
      method: 'POST',
      body: JSON.stringify(issueData)
    });
  },

  update: (id, issueData) => {
    return apiCall(`/blood-issues/${id}`, {
      method: 'PUT',
      body: JSON.stringify(issueData)
    });
  },

  delete: (id) => {
    return apiCall(`/blood-issues/${id}`, {
      method: 'DELETE'
    });
  },

  getStats: () => {
    return apiCall('/blood-issues/stats');
  }
};

export default {
  authAPI,
  donorsAPI,
  patientsAPI,
  bloodInventoryAPI,
  bloodDonationsAPI,
  bloodRequestsAPI,
  hospitalsAPI,
  usersAPI,
  bloodComponentsAPI,
  bloodIssuesAPI
};
