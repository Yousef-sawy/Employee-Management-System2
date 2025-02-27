import axios from 'axios';
import store from '../Auth';

const API_URL = 'http://127.0.0.1:8000/api/users/';

const userController = {
  async getUsers() {
    try {
      let token = store.state.accessToken;
      if (!token) throw new Error("No access token found");

      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        await store.dispatch('refreshToken'); 
        return await userController.getUsers(); 
      }
      return [];
    }
  },

  async createUser(userData) {
    try {
      const response = await axios.post(API_URL, userData); 
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error.response?.data || error.message);
      return null;
    }
  },

  async updateUser(id, userData) {
    try {
      let token = store.state.accessToken;
  
      
      const dataToSend = { ...userData };
      if (dataToSend.password === '********' || dataToSend.password === '') {
        delete dataToSend.password;
      }
  
      const response = await axios.put(`${API_URL}${id}/`, dataToSend, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error.response?.data || error.message);
      return null;
    }
  }
  
  ,

  async deleteUser(id) {
    try {
      let token = store.state.accessToken;
      await axios.delete(`${API_URL}${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return true;
    } catch (error) {
      console.error("Error deleting user:", error.response?.data || error.message);
      return false;
    }
  },
};

export default userController;
