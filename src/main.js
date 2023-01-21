import { createApp } from "vue";

import App from "./App.vue";

import "./assets/styles/index.css";

const app = createApp(App);

/* font-awesome */
import { library } from "@fortawesome/fontawesome-svg-core";
import * as fontAwesomeSolid from "./assets/icons/fontAwesomeSolid.js";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add({
  ...fontAwesomeSolid,
});
app.component("fa-icon", FontAwesomeIcon);

/* masonry-wall */
import MasonryWall from "@yeger/vue-masonry-wall";
app.use(MasonryWall);

/* vue-loading-skeleton */
import Skeleton from "vue-loading-skeleton";
app.use(Skeleton);
import "vue-loading-skeleton/dist/style.css";

/* pinia */
import { createPinia } from "pinia";
const pinia = createPinia();
import piniaPersistedState from "pinia-plugin-persistedstate";
pinia.use(piniaPersistedState);
app.use(pinia);

/* floating-vue */
import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";
app.use(FloatingVue);

import router from "./router";
app.use(router);

app.mount("#app");
