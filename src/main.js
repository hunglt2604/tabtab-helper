import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import customField from "./plugins/custom-field.js";
const app = createApp(App);
app.use(customField, {mode: ['preview', 'input']});
app.mount('#app')
