<template>
  <div class="company">
    <AppNavbar />
    <h1>Company List</h1>

    <!-- Create Company Button -->
    <div class="container mb-3 text-right">
      <router-link :to="{ name: 'create-company' }" class="btn btn-success">Create Company</router-link>
    </div>

    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row">
          <div v-for="company in companies" :key="company.id" class="col-md-4">
            <div class="card mb-4 box-shadow">
              <div class="card-body">
                <h4 class="text-secondary">{{ company.name }}</h4>
                <p class="card-text"><strong>Departments:</strong> {{ company.num_departments }}</p>
                <p class="card-text"><strong>Employees:</strong> {{ company.num_employees }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button @click="viewCompany(company.id)" class="btn btn-sm btn-outline-primary">View</button>
                    <router-link :to="{ name: 'edit-company', params: { id: company.id } }"
                      class="btn btn-sm btn-outline-secondary">Edit</router-link>
                    <button @click="deleteCompany(company.id)" class="btn btn-sm btn-outline-danger">Delete</button>
                  </div>
                  <small class="text-muted">ID: {{ company.id }}</small>
                </div>
              </div>
            </div>
          </div>
          <p v-if="companies.length === 0">No companies found.</p>
        </div>
      </div>
    </div>

    <!-- Modal for Viewing Company Details -->
    <div v-if="selectedCompany" class="modal fade show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedCompany.name }}</h5>
            <button type="button" class="close" @click="selectedCompany = null">&times;</button>
          </div>
          <div class="modal-body">
            <p><strong>ID:</strong> {{ selectedCompany.id }}</p>
            <p><strong>Departments:</strong> {{ selectedCompany.num_departments }}</p>
            <p><strong>Employees:</strong> {{ selectedCompany.num_employees }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="selectedCompany = null">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectedCompany" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import AppNavbar from '../components/AppNavbar.vue';
import companyController from '../api/companyController';

export default {
  name: 'CompanyList',
  components: { AppNavbar },
  data() {
    return {
      companies: [],
      selectedCompany: null
    };
  },
  async created() {
    this.companies = await companyController.getCompanies();
  },
  methods: {
    async viewCompany(id) {
      try {
        this.selectedCompany = await companyController.getCompanyById(id);
      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    },
    async deleteCompany(id) {
      const confirmed = confirm("Are you sure you want to delete this company?");
      if (confirmed) {
        const success = await companyController.deleteCompany(id);
        if (success) {
          this.companies = this.companies.filter(company => company.id !== id);
        }
      }
    }
  }
};
</script>

<style scoped>
/* Modal styles */
.modal {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
}
.modal-backdrop {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
