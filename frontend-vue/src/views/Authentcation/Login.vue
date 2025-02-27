<template>
  <div>
    <div class="container text-dark">
      <div class="row justify-content-md-center">
        <div class="col-md-5 p-3 login justify-content-md-center">
          <h1>Sign in</h1>
          <p v-if="incorrectAuth" class="alert alert-danger text-center">
            Incorrect username or password entered - please try again.
          </p>
          <form @submit.prevent="login">
            <div class="form-group">
              <input
                type="text"
                name="username"
                id="user"
                v-model="username"
                class="form-control"
                placeholder="Username"
                required
              />
            </div>

            <div class="form-group">
              <input
                type="password"
                name="password"
                id="pass"
                v-model="password"
                class="form-control"
                placeholder="Password"
                required
              />
            </div>

            <button type="submit" class="btn btn-lg btn-primary btn-block">Login</button>
          </form>

          
          <p class="mt-3 text-center">
            Don't have an account? 
            <router-link to="/register" class="text-primary">Sign up here</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  name: 'Login',
  
  setup() {
    const store = useStore(); 
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const incorrectAuth = ref(false);

    const login = async () => {
      try {
        await store.dispatch('userLogin', {
          username: username.value,
          password: password.value
        });

        await store.dispatch('fetchUserData'); 
        router.push({ name: 'users' });
      } catch (err) {
        console.error(err);
        incorrectAuth.value = true; 
      }
    };

    return {
      username,
      password,
      incorrectAuth,
      login
    };
  }
};
</script>

<style scoped>
body {
  background-color: #f4f4f4;
}

.login {
  background-color: #fff;
  margin-top: 10%;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

input {
  padding: 15px 10px;
  margin-bottom: 10px;
}

button {
  font-size: 16px;
}

.alert {
  margin-bottom: 15px;
}

.text-center {
  text-align: center;
}

.text-primary {
  color: #007bff;
  text-decoration: none;
}

.text-primary:hover {
  text-decoration: underline;
}
</style>
