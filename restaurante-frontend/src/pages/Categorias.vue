<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const categorias = [
  {
    nombre: "Entradas",
    valor: "entradas",
  },
  {
    nombre: "Platos fuertes",
    valor: "platos",
  },
  {
    nombre: "Bebidas",
    valor: "bebidas",
  },
  {
    nombre: "Postres",
    valor: "postres",
  },
];

function abrirCategoria(categoria) {
  router.push(`/productos?categoria=${categoria}`);
}
</script>

<template>
  <section class="contenedor">
    <h1 class="titulo">Categorías</h1>

    <div class="cards">
      <div
        v-for="cat in categorias"
        :key="cat.valor"
        class="card"
        @click="abrirCategoria(cat.valor)"
      >
        <div class="icono">{{ cat.icono }}</div>
        <h3>{{ cat.nombre }}</h3>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contenedor {
  padding: 40px 20px;
  margin-top: 40px;
  text-align: center;
}

.titulo {
  font-size: 2.8rem;
  font-weight: bold;
  margin-bottom: 40px;
}

/* Grid alineado */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 25px;
  max-width: 1100px;
  margin: 0 auto;
}

/* Tarjetas */
.card {
  background: white;
  padding: 35px 20px;
  border-radius: 14px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: 0.2s ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
}

.icono {
  font-size: 3rem;
  margin-bottom: 15px;
}
</style>
