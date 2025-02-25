const API_BASE_URL = 'http://127.0.0.1:8000/api/employees/';

const fetchOptions = () => ({
  credentials: 'include',
  headers: { 
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
});

export default {
  async getEmployees() {
    try {
      const response = await fetch(API_BASE_URL, fetchOptions());
      if (!response.ok) throw new Error('Failed to fetch employees');
      return await response.json();
    } catch (error) {
      console.error('Error fetching employees:', error);
      return [];
    }
  },

  async getEmployeeById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}${id}/`, fetchOptions());
      if (!response.ok) throw new Error('Failed to fetch employee details');
      return await response.json();
    } catch (error) {
      console.error('Error fetching employee details:', error);
      return null;
    }
  },

  async createEmployee(employeeData) {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        body: JSON.stringify(employeeData),
        ...fetchOptions()
      });
      if (!response.ok) {
        const errorData = await response.json();  // Capture the error response
        console.error('Error creating employee:', errorData);
        throw new Error(errorData.message || 'Failed to create employee');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating employee:', error);
      return null;
    }
  }
  
  ,

  async updateEmployee(id, employeeData) {
    try {
      const response = await fetch(`${API_BASE_URL}${id}/`, {
        method: 'PUT',
        body: JSON.stringify(employeeData),
        ...fetchOptions()
      });
      if (!response.ok) throw new Error('Failed to update employee');
      return await response.json();
    } catch (error) {
      console.error('Error updating employee:', error);
      return null;
    }
  },
  async getEmployeeCountByCompany(companyId) {
    try {
      const response = await fetch(`/api/employees/company/${companyId}/count`);
      const data = await response.json();
      return data.count;
    } catch (error) {
      console.error("Error fetching employee count:", error);
      throw error;
    }
  }
,  

  async deleteEmployee(id) {
    try {
      const response = await fetch(`${API_BASE_URL}${id}/`, {
        method: 'DELETE',
        ...fetchOptions()
      });
      if (!response.ok) throw new Error('Failed to delete employee');
      return true;
    } catch (error) {
      console.error('Error deleting employee:', error);
      return false;
    }
  }
};
