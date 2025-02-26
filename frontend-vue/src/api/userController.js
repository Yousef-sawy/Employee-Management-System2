import { getAPI } from '../axios-api';

export default {
  async getUsers(token) {
    try {
      const response = await getAPI.get('/api/users/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  },

  async getUserById(id, token) {
    try {
      const response = await getAPI.get(`/api/users/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  },

  async createUser(userData, token) {
    try {
      const response = await getAPI.post('/api/users/', userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  },

  async updateUser(id, userData, token) {
    try {
      const { email, ...dataWithoutEmail } = userData;
      const response = await getAPI.put(`/api/users/${id}/`, dataWithoutEmail, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      return null;
    }
  },

  async deleteUser(id, token) {
    try {
      await getAPI.delete(`/api/users/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  },
};
