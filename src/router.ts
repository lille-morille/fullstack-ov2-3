import { createMemoryHistory, createRouter } from "vue-router";

import CalculatorView from "./CalculatorView.vue";
import ContactView from "./ContactView.vue";
import HistoryView from "./HistoryView.vue";
import LoginView from "./LoginView.vue";

const routes = [
  { path: "/", component: CalculatorView },
  { path: "/contact", component: ContactView },
  { path: "/history", component: HistoryView },
  { path: "/login", component: LoginView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
