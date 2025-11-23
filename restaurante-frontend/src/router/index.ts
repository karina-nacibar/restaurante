import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import Productos from "../pages/Productos.vue";
import Categorias from "../pages/Categorias.vue";
import Carrito from "../pages/Carrito.vue";
import Ordenes from "../pages/Ordenes.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/productos", component: Productos },
  { path: "/categorias", component: Categorias },
  { path: "/carrito", component: Carrito },
  { path: "/ordenes", component: Ordenes },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
