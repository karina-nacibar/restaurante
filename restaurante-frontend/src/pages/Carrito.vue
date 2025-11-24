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

function eliminarItem(producto) {
  console.log("🔴 BOTÓN CLICKEADO");
  console.log("Producto a eliminar:", producto);
  
  if (!producto || !producto.id) {
    console.error("❌ Producto inválido");
    return;
  }

  if (confirm(`¿Eliminar "${producto.nombre}" del carrito?`)) {
    cart.removeItem(producto.id)
      .then(() => {
        console.log("✅ Producto eliminado");
      })
      .catch(error => {
        console.error("❌ Error:", error);
        alert("No se pudo eliminar el producto");
      });
  }
}

async function confirmarOrden() {
  try {
    await axios.post("http://localhost:3000/ordenes");
    alert("✓ Orden creada correctamente");
    cart.clearCart();
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
        <div class="info">
          <h3>{{ p.nombre }}</h3>
          <p>Cantidad: {{ p.cantidad }}</p>
          <p style="font-size: 0.8rem; color: #666;" v-if="p.carritoItemIds">
            Debug IDs: {{ p.carritoItemIds.join(', ') }}
          </p>
        </div>
        <div class="item-acciones">
          <p class="precio">${{ p.precio * p.cantidad }}</p>
         
        </div>
      </div>
    </div>

    <div class="total">
      <h2>Total: ${{ total }}</h2>
      <button type="button" class="btn" @click="confirmarOrden()">
        Confirmar Orden
      </button>
    </div>
  </section>

  <section v-else class="contenedor">
    <h1>Tu Carrito está vacío</h1>
    <router-link to="/productos" class="btn">Ver Productos</router-link>
  </section>
</template>

<style scoped>
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
  align-items: center;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 12px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.06);
}
.info {
  flex: 1;
}
.item-acciones {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-direction: column;
}
.precio {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0;
}
.btn-eliminar {
  background: #ff4444;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  transition: 0.2s;
  white-space: nowrap;
}
.btn-eliminar:hover {
  background: #cc0000;
  transform: scale(1.05);
}
.btn-eliminar:active {
  transform: scale(0.95);
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
  transition: 0.2s;
  text-decoration: none;
  display: inline-block;
}
.btn:hover {
  background: #d86700;
}
</style>