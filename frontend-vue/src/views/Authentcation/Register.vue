<template>
  <div class="register-container">
    <div class="register-card">
      <h1 class="text-center">Sign Up</h1>

      <form @submit.prevent="registerUser">
        <!-- Username -->
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model.trim="newUser.username" class="form-control" required />
          <small v-if="errors.username" class="text-danger">{{ errors.username }}</small>
        </div>

        <!-- Email -->
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="newUser.email" class="form-control" required />
          <small v-if="errors.email" class="text-danger">{{ errors.email }}</small>
        </div>

        <!-- Password -->
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="newUser.password" class="form-control" required />
          <small v-if="errors.password" class="text-danger">{{ errors.password }}</small>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary btn-block">Register</button>

        <!-- API Error -->
        <small v-if="errors.apiError" class="text-danger text-center d-block mt-2">
          {{ errors.apiError }}
        </small>
      </form>

      <p class="login-link">
        Already have an account? 
        <router-link :to="{ name: 'login' }">Login here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import userController from '../../api/userController';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  name: 'Register',
  setup() {
    const store = useStore();
    const router = useRouter();

    const newUser = ref({
      username: '',
      email: '',
      password: '',
    });

    const errors = ref({});

    const validateForm = () => {
      errors.value = {};
      let valid = true;

      if (!newUser.value.username.trim()) {
        errors.value.username = "Username is required";
        valid = false;
      }
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(newUser.value.email)) {
        errors.value.email = "Enter a valid email address";
        valid = false;
      }
      if (newUser.value.password.length < 6) {
        errors.value.password = "Password must be at least 6 characters";
        valid = false;
      }

      return valid;
    };

    const registerUser = async () => {
      if (!validateForm()) return;

      try {
        await userController.createUser(newUser.value);
        await store.dispatch('login', {
          username: newUser.value.username,
          password: newUser.value.password,
        });

        router.push({ name: 'users' });
      } catch (error) {
        errors.value.apiError = error.response?.data?.detail || "Registration failed. Please try again.";
        console.error("Error during registration:", error);
      }
    };

    return {
      newUser,
      errors,
      registerUser,
    };
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f8f9fa;
}

.register-card {
  width: 400px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.btn-block {
  width: 100%;
}

.text-center {
  text-align: center;
}

.text-danger {
  color: red;
  font-size: 0.9em;
}

.login-link {
  text-align: center;
  margin-top: 15px;
}

.d-block {
  display: block;
}
</style>