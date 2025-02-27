import axios from 'axios';
import store from '../Auth'; 

const API_URL = 'http://127.0.0.1:8000/api/companies/';

const companyController = {
  async getCompanies() {
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
      console.error("Error fetching companies:", error);
      if (error.response && error.response.status === 401) {
        await store.dispatch('refreshToken'); 
        return await companyController.getCompanies(); 
      }
    }
  },

  async createCompany(companyData) {
    try {
      let token = store.state.accessToken;
      const response = await axios.post(API_URL, companyData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error("Error creating company:", error);
    }
  },

  async updateCompany(id, companyData) {
    try {
      let token = store.state.accessToken;
      const response = await axios.put(`${API_URL}${id}/`, companyData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error("Error updating company:", error);
    }
  },

  async deleteCompany(id) {
    try {
      let token = store.state.accessToken;
      await axios.delete(`${API_URL}${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return true;
    } catch (error) {
      console.error("Error deleting company:", error);
      return false;
    }
  }
};

export default companyController;
