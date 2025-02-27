<template>
  <div class="register-container">
    <div class="register-card">
      <h1 class="text-center">Sign Up</h1>

      <form @submit.prevent="registerUser">
        <!-- Username -->
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model.trim="newUser.username" class="form-control" @input="validateUsername" required />
          <small v-if="errors.username" class="text-danger">{{ errors.username }}</small>
        </div>

        <!-- Email -->
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="newUser.email" class="form-control" @input="validateEmail" @blur="checkEmailExists" required />
          <small v-if="errors.email" class="text-danger">{{ errors.email }}</small>
        </div>

        <!-- Password -->
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="newUser.password" class="form-control" @input="validatePassword" required />
          <small v-if="errors.password" class="text-danger">{{ errors.password }}</small>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary btn-block" :disabled="hasErrors">Register</button>

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
import { ref, computed } from 'vue';

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

    // Check if email already exists in the backend
    const checkEmailExists = async () => {
      if (!newUser.value.email) return;
      try {
        const response = await userController.checkEmail(newUser.value.email);
        if (response.exists) {
          errors.value.email = "This email is already registered";
        } else {
          errors.value.email = "";
        }
      } catch (error) {
        console.error("Error checking email existence:", error);
      }
    };

    // Username Validation
    const validateUsername = () => {
      const username = newUser.value.username.trim();
      if (!username) {
        errors.value.username = "Username is required";
      } else if (username.length < 3) {
        errors.value.username = "Username must be at least 3 characters";
      } else if (!/^[A-Za-z]+$/.test(username)) {
        errors.value.username = "Username must contain only letters";
      } else {
        errors.value.username = "";
      }
    };

    // Email Validation
    const validateEmail = () => {
      const email = newUser.value.email.trim();
      if (!email) {
        errors.value.email = "Email is required";
      } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        errors.value.email = "Enter a valid email address";
      } else {
        errors.value.email = "";
      }
    };

    // Password Validation
    const validatePassword = () => {
      const password = newUser.value.password;
      if (!password) {
        errors.value.password = "Password is required";
      } else if (password.length < 6) {
        errors.value.password = "Password must be at least 6 characters";
      } else if (!/[A-Z]/.test(password)) {
        errors.value.password = "Password must contain at least one uppercase letter";
      } else if (!/[a-z]/.test(password)) {
        errors.value.password = "Password must contain at least one lowercase letter";
      } else if (!/\d/.test(password)) {
        errors.value.password = "Password must contain at least one number";
      } else {
        errors.value.password = "";
      }
    };

    // Check if any errors exist
    const hasErrors = computed(() => {
      return Object.values(errors.value).some((error) => error);
    });

    const validateForm = () => {
      validateUsername();
      validateEmail();
      validatePassword();
      return !hasErrors.value;
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
        console.error("Error during registration:", error);

        if (error.response?.data?.email) {
          errors.value.email = "This email is already registered";
        } else {
          errors.value.apiError = error.response?.data?.detail || "Registration failed. Please try again.";
        }
      }
    };

    return {
      newUser,
      errors,
      registerUser,
      validateUsername,
      validateEmail,
      validatePassword,
      checkEmailExists,
      hasErrors,
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
