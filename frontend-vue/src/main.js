import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import store from './Auth';  
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);

app.use(router);
app.use(store); 
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresLogin)) {
    if (!store.state.accessToken) {
      next({ name: 'register' });
    } else {
      next();
    }
  } else {
    next();
  }
});

app.mount('#app');
