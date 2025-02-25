const API_BASE_URL = 'http://127.0.0.1:8000/api/departments/';
const COMPANY_API_URL = 'http://127.0.0.1:8000/api/companies/';

const fetchOptions = () => ({
  credentials: 'include',
  headers: { 
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
});

export default {
  async getDepartments() {
    try {
      const response = await fetch(API_BASE_URL, fetchOptions());
      if (!response.ok) throw new Error('Failed to fetch departments');
      const departments = await response.json();

      // Fetch company details for each department
      const departmentPromises = departments.map(async (dept) => {
        try {
          const companyResponse = await fetch(`${COMPANY_API_URL}${dept.company}/`, fetchOptions());
          if (companyResponse.ok) {
            const companyData = await companyResponse.json();
            dept.company_name = companyData.name;
          } else {
            dept.company_name = 'Unknown';
          }
        } catch (error) {
          dept.company_name = 'Unknown';
        }
        return dept;
      });

      return await Promise.all(departmentPromises);
    } catch (error) {
      console.error('Error fetching departments:', error);
      return [];
    }
  },

  async getDepartmentById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}${id}/`, fetchOptions());
      if (!response.ok) throw new Error('Failed to fetch department details');
      const department = await response.json();

      // Fetch company details
      try {
        const companyResponse = await fetch(`${COMPANY_API_URL}${department.company}/`, fetchOptions());
        if (companyResponse.ok) {
          const companyData = await companyResponse.json();
          department.company_name = companyData.name;
        } else {
          department.company_name = 'Unknown';
        }
      } catch (error) {
        department.company_name = 'Unknown';
      }

      return department;
    } catch (error) {
      console.error('Error fetching department details:', error);
      return null;
    }
  },

  async createDepartment(departmentData) {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        body: JSON.stringify(departmentData),
        ...fetchOptions()
      });
      if (!response.ok) throw new Error('Failed to create department');
      return await response.json();
    } catch (error) {
      console.error('Error creating department:', error);
      return null;
    }
  },

  async updateDepartment(id, departmentData) {
    try {
      const response = await fetch(`${API_BASE_URL}${id}/`, {
        method: 'PUT',
        body: JSON.stringify(departmentData),
        ...fetchOptions()
      });
      if (!response.ok) throw new Error('Failed to update department');
      return await response.json();
    } catch (error) {
      console.error('Error updating department:', error);
      return null;
    }
  },

  async deleteDepartment(id) {
    try {
      const response = await fetch(`${API_BASE_URL}${id}/`, {
        method: 'DELETE',
        ...fetchOptions()
      });
      if (!response.ok) throw new Error('Failed to delete department');
      return true;
    } catch (error) {
      console.error('Error deleting department:', error);
      return false;
    }
  }
};
