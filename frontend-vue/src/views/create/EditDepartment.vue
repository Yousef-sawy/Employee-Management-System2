<template>
  <div class="edit-department">
    <AppNavbar />
    <h1>{{ isNew ? "Create Department" : "Edit Department" }}</h1>

    <div class="container">
      <form @submit.prevent="saveDepartment">
        <div class="form-group">
          <label for="name">Department Name</label>
          <input
            type="text"
            id="name"
            class="form-control"
            v-model="department.name"
            required
          />
        </div>

        <div class="form-group">
          <label for="company">Company</label>
          <select id="company" class="form-control" v-model="department.company" required>
            <option v-for="company in companies" :key="company.id" :value="company.id">
              {{ company.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="employees">Number of Employees</label>
          <input
            type="number"
            id="employees"
            class="form-control"
            v-model="department.num_employees"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary">
          {{ isNew ? "Create" : "Update" }}
        </button>
        <router-link to="/departments" class="btn btn-secondary">Cancel</router-link>
      </form>

      <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import AppNavbar from "../../components/AppNavbar.vue";
import departmentController from "../../api/departmentController";
import companyController from "../../api/companyController";

export default {
  name: "EditDepartment",
  props: ["id"],
  data() {
    return {
      isNew: !this.id, // ✅ Determines if it's create mode
      department: { name: "", company: null, num_employees: 0 },
      companies: [],
      errorMessage: "",
    };
  },
  async created() {
    try {
      this.companies = await companyController.getCompanies();

      if (!this.isNew) {
        this.department = await departmentController.getDepartmentById(this.id);
      }
    } catch (error) {
      this.errorMessage = "Error loading department data.";
      console.error(error);
    }
  },
  methods: {
    async saveDepartment() {
      try {
        // ✅ Fetch all departments
        const existingDepartments = await departmentController.getDepartments();

        // ✅ Check for duplicate department name within the same company
        const duplicate = existingDepartments.find(
          (d) =>
            d.name.toLowerCase() === this.department.name.toLowerCase() &&
            d.company === this.department.company &&
            d.id !== this.id
        );

        if (duplicate) {
          this.errorMessage = "A department with this name already exists in this company!";
          return;
        }

        if (this.isNew) {
          await departmentController.createDepartment(this.department);
        } else {
          await departmentController.updateDepartment(this.id, this.department);
        }

        this.$router.push("/departments");
      } catch (error) {
        this.errorMessage = "Error saving department. Please try again.";
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
