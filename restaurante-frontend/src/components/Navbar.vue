<script setup></script>

<template>
  <nav class="nav">
    <RouterLink to="/">Inicio</RouterLink>
    <RouterLink to="/productos">Productos</RouterLink>
    <RouterLink to="/categorias">Categorías</RouterLink>
    <RouterLink to="/carrito">Carrito</RouterLink>
    <RouterLink to="/ordenes">Órdenes</RouterLink>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  gap: 20px;
  padding: 15px;
  background: black;
}
.nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}
</style>
