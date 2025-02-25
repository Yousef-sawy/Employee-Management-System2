<template>
  <div class="edit-employee">
    <AppNavbar />
    <h1>{{ isNew ? "Create Employee" : "Edit Employee" }}</h1>

    <div class="container">
      <form @submit.prevent="saveEmployee">
        <div class="form-group">
          <label for="username">Username</label>
          <select id="username" class="form-control" v-model="employee.user_id" required>
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.username }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="company">Company</label>
          <select id="company" class="form-control" v-model="employee.company_id" required>
            <option v-for="company in companies" :key="company.id" :value="company.id">
              {{ company.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="department">Department</label>
          <select id="department" class="form-control" v-model="employee.department_id" required>
            <option v-for="department in departments" :key="department.id" :value="department.id">
              {{ department.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="status">Status</label>
          <select id="status" class="form-control" v-model="employee.status" required>
            <option value="applied">Applied</option>
            <option value="hired">Hired</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div class="form-group">
          <label for="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            class="form-control"
            v-model="employee.mobile"
            required
          />
        </div>

        <div class="form-group">
          <label for="address">Address</label>
          <input
            type="text"
            id="address"
            class="form-control"
            v-model="employee.address"
            required
          />
        </div>

        <div class="form-group">
          <label for="position_title">Position Title</label>
          <input
            type="text"
            id="position_title"
            class="form-control"
            v-model="employee.position_title"
            required
          />
        </div>

        <div class="form-group">
          <label for="hired_on">Hired On</label>
          <input
            type="date"
            id="hired_on"
            class="form-control"
            v-model="employee.hired_on"
          />
        </div>

        <button type="submit" class="btn btn-primary">
          {{ isNew ? "Create" : "Update" }}
        </button>
        <router-link to="/employees" class="btn btn-secondary">Cancel</router-link>
      </form>

      <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import AppNavbar from "../../components/AppNavbar.vue";
import employeeController from "../../api/employeeController";
import companyController from "../../api/companyController";
import departmentController from "../../api/departmentController";
import userController from "../../api/userController"; // Import userController

export default {
  name: "EditEmployee",
  props: ["id"],
  data() {
    return {
      isNew: !this.id, // Determines if it's in create mode
      employee: {
        id: null,
        user_id: null, // Changed to user_id
        company_id: null,
        department_id: null,
        status: "applied", // default status
        mobile: "",
        address: "",
        position_title: "",
        hired_on: null,
      },
      users: [], // List of users for the dropdown
      companies: [],
      departments: [],
      errorMessage: "",
    };
  },
  async created() {
    try {
      // Fetch data for companies, departments, and users
      this.companies = await companyController.getCompanies();
      this.departments = await departmentController.getDepartments();
      this.users = await userController.getUsers(); // Fetch the users

      if (!this.isNew) {
        const empData = await employeeController.getEmployeeById(this.id);
        this.employee = {
          ...empData,
        };
      }
    } catch (error) {
      this.errorMessage = "Error loading data.";
      console.error(error);
    }
  },
  methods: {
    async saveEmployee() {
      try {
        const employeeData = {
          user_id: this.employee.user_id, // Send user_id (not username)
          company: this.employee.company_id, // Company ID to match backend expectations
          department: this.employee.department_id, // Department ID to match backend expectations
          status: this.employee.status,
          mobile: this.employee.mobile,
          address: this.employee.address,
          position_title: this.employee.position_title,
          hired_on: this.employee.hired_on || null, // handle hired_on null if applicable
        };

        if (this.isNew) {
          await employeeController.createEmployee(employeeData);
        } else {
          await employeeController.updateEmployee(this.id, employeeData);
        }

        this.$router.push("/employees");
      } catch (error) {
        this.errorMessage = "Error saving employee. Please try again.";
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin-top: 20px;
}
</style>
