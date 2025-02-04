import { createMemoryHistory, createRouter } from "vue-router";

import CalculatorView from "./CalculatorView.vue";
import ContactView from "./ContactView.vue";

const routes = [
  { path: "/", component: CalculatorView },
  { path: "/contact", component: ContactView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
