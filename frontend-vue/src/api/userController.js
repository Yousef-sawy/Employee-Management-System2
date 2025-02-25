const API_BASE_URL = 'http://127.0.0.1:8000/api/users/';

const fetchOptions = () => ({
  credentials: 'include',
  headers: { 
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
});

export default {
  async getUsers() {
    try {
      const response = await fetch(API_BASE_URL, fetchOptions());
      if (!response.ok) throw new Error('Failed to fetch users');
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  },

  async getUserById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}${id}/`, fetchOptions());
      if (!response.ok) throw new Error('Failed to fetch user details');
      return await response.json();
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  },

  async createUser(userData) {  // ✅ Add this function
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        body: JSON.stringify(userData),
        ...fetchOptions()
      });
      if (!response.ok) throw new Error('Failed to create user');
      return await response.json();
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  },

  async updateUser(id, userData) {
    try {
      const response = await fetch(`${API_BASE_URL}${id}/`, {
        method: 'PUT',
        body: JSON.stringify(userData),
        ...fetchOptions()
      });
      if (!response.ok) throw new Error('Failed to update user');
      return await response.json();
    } catch (error) {
      console.error('Error updating user:', error);
      return null;
    }
  },

  async deleteUser(id) {
    try {
      const response = await fetch(`${API_BASE_URL}${id}/`, {
        method: 'DELETE',
        ...fetchOptions()
      });
      if (!response.ok) throw new Error('Failed to delete user');
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }
};
