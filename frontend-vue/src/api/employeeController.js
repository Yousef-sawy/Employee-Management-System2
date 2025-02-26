import axios from 'axios';
import store from '../Auth'; // Import Vuex store for authentication

const API_BASE_URL = 'http://127.0.0.1:8000/api/employees/';

const employeeController = {
  async getEmployees() {
    try {
      let token = store.state.accessToken;
      if (!token) throw new Error("No access token found");

      const response = await axios.get(API_BASE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching employees:", error);
      if (error.response && error.response.status === 401) {
        await store.dispatch('refreshToken');
        return await employeeController.getEmployees();
      }
      return [];
    }
  },

  async getEmployeeById(id) {
    try {
      let token = store.state.accessToken;
      const response = await axios.get(`${API_BASE_URL}${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching employee details:", error);
      return null;
    }
  },

  async createEmployee(employeeData) {
    try {
      let token = store.state.accessToken;
      const response = await axios.post(API_BASE_URL, employeeData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating employee:", error.response?.data || error.message);
      return null;
    }
  },

  async updateEmployee(id, employeeData) {
    try {
      let token = store.state.accessToken;
      const response = await axios.put(`${API_BASE_URL}${id}/`, employeeData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating employee:", error);
      return null;
    }
  },

  async getEmployeeCountByCompany(companyId) {
    try {
      let token = store.state.accessToken;
      const response = await axios.get(`/api/employees/company/${companyId}/count`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.count;
    } catch (error) {
      console.error("Error fetching employee count:", error);
      throw error;
    }
  },

  async deleteEmployee(id) {
    try {
      let token = store.state.accessToken;
      await axios.delete(`${API_BASE_URL}${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return true;
    } catch (error) {
      console.error("Error deleting employee:", error);
      return false;
    }
  },
};

export default employeeController;
