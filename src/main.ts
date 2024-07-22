import { createApp } from "vue";
import "@/assets/styles/base.scss";
import { router } from "@/router";
import App from "./App.vue";


const Vue = createApp(App);

Vue.use(router);

Vue.mount('#app');
