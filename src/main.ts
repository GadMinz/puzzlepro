import { createApp } from "vue";
import "@/assets/scss/main.scss";
import App from "./App.vue";
import router from "@/router";
import { createPinia } from "pinia";

createApp(App).use(router).use(createPinia()).mount("#app");
