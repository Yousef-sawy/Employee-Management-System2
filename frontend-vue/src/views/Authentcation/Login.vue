<template>
    <div>
    <div class="container text-dark">
      <div class="row justify-content-md-center">
        <div class="col-md-5 p-3 login justify-content-md-center">
          <h1 class="h3 mb-3 font-weight-normal text-center">Please sign in</h1>
  
          <p v-if="incorrectAuth">Incorrect username or password entered - please try again</p>
          <form v-on:submit.prevent="login">
            <div class="form-group">
              <input type="text" name="username" id="user" v-model="username" class="form-control" placeholder="Username">
            </div>
            <div class="form-group">
              <input type="password" name="password" id="pass" v-model="password" class="form-control" placeholder="Password">
            </div>
            <button type="submit" class="btn btn-lg btn-primary btn-block">Login</button>
          </form>
          
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
    name: 'login',
    setup() {
      const store = useStore(); // ✅ Get Vuex store
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
          router.push({ name: 'companies' });
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
    
  <style>
  body { 
    background-color:#f4f4f4;
  }
    .login{
      background-color:#fff;
      margin-top:10%;
    }
    input {
      padding: 25px 10px;
  }
  </style>