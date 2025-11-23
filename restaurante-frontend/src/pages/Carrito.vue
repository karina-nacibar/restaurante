<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
import { useCartStore } from "../stores/cart";
import { computed } from "vue";

const router = useRouter();
const cart = useCartStore();
const carrito = computed(() => cart.items);
const total = computed(() =>
  cart.items.reduce((t, p) => t + p.precio * p.cantidad, 0)
);


async function confirmarOrden() {
  try {
    await axios.post("http://localhost:3000/ordenes", {

    });

    alert("✓ Orden creada correctamente");
    cart.clear();
    router.push("/ordenes");
  } catch (error) {
    console.error(error);
    alert("❌ No se pudo confirmar la orden");
  }
}

</script>

<template>
  <section class="contenedor" v-if="carrito.length > 0">
    <h1>Tu Carrito</h1>

    <div class="lista">
      <div class="item" v-for="p in carrito" :key="p.id">
        <div>
          <h3>{{ p.nombre }}</h3>
          <p>Cantidad: {{ p.cantidad }}</p>
        </div>
        <p class="precio">${{ p.precio * p.cantidad }}</p>
      </div>
    </div>

    <div class="total">
      <h2>Total: ${{ total }}</h2>
      <button type="button" class="btn" @click="confirmarOrden()">Confirmar Orden</button>
    </div>
  </section>

  <section v-else class="contenedor">
    <h1>Tu Carrito está vacío</h1>
  </section>
</template>


<style scoped>
/* (tu mismo estilo, no lo cambié) */
.contenedor {
  padding: 30px;
  max-width: 600px;
  margin: auto;
}
.lista {
  margin-top: 20px;
}
.item {
  background: white;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 12px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.06);
}
.precio {
  font-size: 1.1rem;
  font-weight: bold;
}
.total {
  margin-top: 25px;
  text-align: center;
}
.btn {
  margin-top: 15px;
  background: #ff7b00;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  transition: .2s;
}
.btn:hover {
  background: #d86700;
}
</style>
