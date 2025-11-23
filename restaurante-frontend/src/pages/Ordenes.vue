<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const ordenes = ref([]);

// Cargar órdenes desde el backend
onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/ordenes");
    ordenes.value = res.data;
  } catch (error) {
    console.error("Error cargando órdenes:", error);
  }
});
</script>

<template>
  <section class="contenedor">
    <h1>Órdenes</h1>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Estado</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="o in ordenes" :key="o.id">
          <td>{{ o.id }}</td>
          <td>{{ o.cliente }}</td>
          <td>
            <span :class="o.estado.toLowerCase()">{{ o.estado }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
.contenedor {
  padding: 30px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 25px;
}

th, td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
}

.pendiente {
  color: #ff9800;
  font-weight: bold;
}
.preparando {
  color: #007bff;
  font-weight: bold;
}
.entregado {
  color: #4caf50;
  font-weight: bold;
}
</style>
