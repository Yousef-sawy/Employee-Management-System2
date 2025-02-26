import axios from 'axios';
import store from '../Auth'; // Import Vuex store

const API_URL = 'http://127.0.0.1:8000/api/departments/';

const departmentController = {
  async getDepartments() {
    try {
      let token = store.state.accessToken;
      if (!token) throw new Error("No access token found");

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching departments:", error);
      if (error.response && error.response.status === 401) {
        await store.dispatch('refreshToken'); // Refresh token if expired
        return await departmentController.getDepartments(); // Retry request
      }
    }
  },

  async createDepartment(departmentData) {
    try {
      let token = store.state.accessToken;
      const response = await axios.post(API_URL, departmentData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error("Error creating department:", error);
    }
  },

  async updateDepartment(id, departmentData) {
    try {
      let token = store.state.accessToken;
      const response = await axios.put(`${API_URL}${id}/`, departmentData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error("Error updating department:", error);
    }
  },

  async deleteDepartment(id) {
    try {
      let token = store.state.accessToken;
      await axios.delete(`${API_URL}${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return true;
    } catch (error) {
      console.error("Error deleting department:", error);
      return false;
    }
  }
};

export default departmentController;
