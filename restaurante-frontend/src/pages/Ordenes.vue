<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const ordenes = ref([]);

// Cargar órdenes desde el backend
onMounted(async () => {
  await cargarOrdenes();
});

async function cargarOrdenes() {
  try {
    const res = await axios.get("http://localhost:3000/ordenes");
    ordenes.value = res.data;
    console.log("Órdenes cargadas:", res.data);
  } catch (error) {
    console.error("Error cargando órdenes:", error);
    alert("No se pudieron cargar las órdenes");
  }
}

async function cambiarEstado(ordenId, nuevoEstado) {
  try {
    await axios.patch(`http://localhost:3000/ordenes/${ordenId}/estado`, {
      estado: nuevoEstado
    });
    
    // Actualizar el estado localmente
    const orden = ordenes.value.find(o => o.id === ordenId);
    if (orden) {
      orden.estado = nuevoEstado;
    }
    
    console.log(`✅ Orden ${ordenId} actualizada a: ${nuevoEstado}`);
  } catch (error) {
    console.error("Error actualizando estado:", error);
    alert("❌ No se pudo actualizar el estado");
  }
}
</script>

<template>
  <section class="contenedor">
    <h1>Órdenes</h1>

    <div v-if="ordenes.length === 0" class="no-ordenes">
      <p>No hay órdenes registradas todavía.</p>
    </div>

    <table v-else>
      <thead>
        <tr>
          <th>ID</th>
          <th>Total</th>
          <th>Estado</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="o in ordenes" :key="o.id">
          <td>{{ o.id }}</td>
          <td>${{ o.total }}</td>
          <td>
            <span :class="['badge', o.estado.toLowerCase()]">
              {{ o.estado }}
            </span>
          </td>
          <td>{{ new Date(o.creadoEn).toLocaleDateString() }}</td>
          <td>
            <div class="botones-estado">
              <button 
                v-if="o.estado !== 'pendiente'"
                @click="cambiarEstado(o.id, 'pendiente')"
                class="btn-estado btn-pendiente"
                title="Marcar como pendiente">
                ⏸️
              </button>
              
              <button 
                v-if="o.estado !== 'preparando'"
                @click="cambiarEstado(o.id, 'preparando')"
                class="btn-estado btn-preparando"
                title="Marcar como preparando">
                👨‍🍳
              </button>
              
              <button 
                v-if="o.estado !== 'entregado'"
                @click="cambiarEstado(o.id, 'entregado')"
                class="btn-estado btn-entregado"
                title="Marcar como entregado">
                ✅
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
.contenedor {
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.no-ordenes {
  text-align: center;
  margin-top: 40px;
  font-size: 1.2rem;
  color: #777;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 25px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

th,
td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background: #f8f9fa;
  font-weight: bold;
  color: #333;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

tbody tr:hover {
  background: #f8f9fa;
}

/* Badges de estado */
.badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.85rem;
  display: inline-block;
  text-transform: uppercase;
}

.pendiente {
  background: #fff3cd;
  color: #856404;
}

.preparando {
  background: #cfe2ff;
  color: #084298;
}

.entregado {
  background: #d1e7dd;
  color: #0f5132;
}

/* Botones de cambio de estado */
.botones-estado {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn-estado {
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
  background: #f0f0f0;
}

.btn-estado:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.btn-estado:active {
  transform: translateY(0);
}

.btn-pendiente:hover {
  background: #fff3cd;
}

.btn-preparando:hover {
  background: #cfe2ff;
}

.btn-entregado:hover {
  background: #d1e7dd;
}

/* Responsive */
@media (max-width: 768px) {
  table {
    font-size: 0.9rem;
  }
  
  th, td {
    padding: 10px;
  }
  
  .botones-estado {
    flex-direction: column;
  }
}
</style>