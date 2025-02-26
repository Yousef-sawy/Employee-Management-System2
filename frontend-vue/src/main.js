import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import store from './Auth';  // ✅ Make sure this is correctly imported
import 'bootstrap/dist/css/bootstrap.min.css';

// Create Vue App
const app = createApp(App);

// Use Plugins
app.use(router);
app.use(store); // ✅ Add Vuex store

// Global Navigation Guard for Authentication
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresLogin)) {
    if (!store.state.accessToken) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

// Mount the app
app.mount('#app');
