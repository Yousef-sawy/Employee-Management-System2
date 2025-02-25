const API_BASE_URL = "http://127.0.0.1:8000/api/companies/";

export default {
    async getCompanies() {
        try {
            const response = await fetch(API_BASE_URL, {
                credentials: 'include',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            if (!response.ok) throw new Error(`Error ${response.status}: Failed to fetch companies`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching companies:', error);
            return { success: false, message: error.message };
        }
    },

    async getCompanyById(id) {
        try {
            const response = await fetch(`${API_BASE_URL}${id}/`, {
                credentials: 'include',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            if (!response.ok) throw new Error(`Error ${response.status}: Failed to fetch company`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching company:', error);
            return { success: false, message: error.message };
        }
    },

    async createCompany(companyData) {
        try {
            const response = await fetch(API_BASE_URL, {
                method: "POST",
                credentials: 'include',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` 
                },
                body: JSON.stringify(companyData)
            });

            const result = await response.json();
            if (!response.ok) throw new Error(`Error ${response.status}: ${result.message || 'Failed to create company'}`);
            return { success: true, data: result };
        } catch (error) {
            console.error('Error creating company:', error);
            return { success: false, message: error.message };
        }
    },

    async updateCompany(id, companyData) {
        try {
            const response = await fetch(`${API_BASE_URL}${id}/`, {
                method: "PUT",
                credentials: 'include',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(companyData)
            });

            const result = await response.json();
            if (!response.ok) throw new Error(`Error ${response.status}: ${result.message || 'Failed to update company'}`);
            return { success: true, data: result };
        } catch (error) {
            console.error('Error updating company:', error);
            return { success: false, message: error.message };
        }
    },

    async deleteCompany(id) {
        try {
            const response = await fetch(`${API_BASE_URL}${id}/`, {
                method: "DELETE",
                credentials: 'include',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(`Error ${response.status}: ${result.message || 'Failed to delete company'}`);
            }
            return { success: true };
        } catch (error) {
            console.error('Error deleting company:', error);
            return { success: false, message: error.message };
        }
    }
};
