import { createApp } from 'vue'
import App from './App.vue'
import router from './routes' // Ensure the correct path
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)
app.use(router) // Use the router in the app
app.mount('#app') // Mount the app
