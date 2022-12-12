import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

import { createPinia } from "pinia";
const pinia = createPinia();
import piniaPersistedState from "pinia-plugin-persistedstate";
pinia.use(piniaPersistedState);
app.use(pinia);

app.use(router);

app.mount("#app");
