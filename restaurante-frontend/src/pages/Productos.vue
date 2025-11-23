<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

import { useCartStore } from "../stores/cart";
const cart = useCartStore();


const route = useRoute();


const categoriaSeleccionada = ref(route.query.categoria || "todos");


const productos = ref([
  {
    id: 1,
    nombre: "Quiches",
    precio: 12,
    categoria: "entradas",
    imagen: "https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480/img/recipe/ras/Assets/275D2066-5040-41D0-9BD3-05D18B0F0962/Derivates/3550E8BB-562E-4300-BC80-D98DDC718CDB.jpg"
  },
  {
    id: 2,
    nombre: "Gateau de Verduras en Salsa Napolitana",
    precio: 37,
    categoria: "entradas",
    imagen: "https://dvzwo3mu4ucsq.cloudfront.net/images/restaurants/anttoninas/product/2deef09f-0463-4dfe-92d7-3cc3793dce0d.webp"
  },
  {
    id: 3,
    nombre: "Salbutes de Cochinita Pibil",
    precio: 23,
    categoria: "entradas",
    imagen: "https://dvzwo3mu4ucsq.cloudfront.net/images/restaurants/cantinala15/product/5a118f98-5601-4b90-bbc2-58b1912aaeca.webp"
  },
  {
    id: 4,
    nombre: "Aguachile Blanco",
    precio: 90,
    categoria: "entradas",
    imagen: "https://dvzwo3mu4ucsq.cloudfront.net/images/restaurants/cantinala15/product/5c0c4b20-a016-4a95-a35e-82f68606c1b1.webp"
  },
  {
    id: 5,
    nombre: "Spaghetti Napolitana",
    precio: 31,
    categoria: "platos",
    imagen: "https://dvzwo3mu4ucsq.cloudfront.net/images/restaurants/anttoninas/product/3792b84e-0e17-4838-a06e-8e95d93277fb.webp"
  },
  {
    id: 6,
    nombre: "Lomo en salsa",
    precio: 30,
    categoria: "platos",
    imagen: "https://images.pexels.com/photos/410648/pexels-photo-410648.jpeg"
  },
  {
    id: 7,
    nombre: "Lasagna Bolognesa",
    precio: 49,
    categoria: "platos",
    imagen: "https://dvzwo3mu4ucsq.cloudfront.net/images/restaurants/anttoninas/product/6645c86a-0233-4a86-a0c5-09e8c79a861f.webp"
  },
  {
    id: 8,
    nombre: "Gringa al Pastor",
    precio: 39,
    categoria: "platos",
    imagen: "https://dvzwo3mu4ucsq.cloudfront.net/images/restaurants/cantinala15/product/1b68e046-666a-495f-8e38-e022e0d68922.webp"
  },
  {
    id: 9,
    nombre: "Maracuyá",
    precio: 16,
    categoria: "bebidas",
    imagen: "https://dvzwo3mu4ucsq.cloudfront.net/images/restaurants/cantinala15/product/875ce7c4-48ee-46a6-b9a0-d275428c3833.webp"
  },
  {
    id: 10,
    nombre: "Cappuccino",
    precio: 9,
    categoria: "bebidas",
    imagen: "https://dvzwo3mu4ucsq.cloudfront.net/images/restaurants/anttoninas/c679a6a3-7ab8-4059-b5c7-3c3a540200ca.webp"
  },
  {
    id: 11,
    nombre: "Jugos en Agua",
    precio: 11,
    categoria: "bebidas",
    imagen: "https://dvzwo3mu4ucsq.cloudfront.net/images/restaurants/anttoninas/7b9e349f-1c1a-4208-8e0a-e03f420f344d.webp"
  },
  {
    id: 12,
    nombre: "Soda Italiana Frutos Rojos",
    precio: 21,
    categoria: "bebidas",
    imagen: "https://dvzwo3mu4ucsq.cloudfront.net/images/restaurants/anttoninas/d92b1be4-ab0d-4233-82a0-0a0d08444969.webp"
  },
  {
    id: 13,
    nombre: "Torta de chocolate",
    precio: 15,
    categoria: "postres",
    imagen: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg"
  },
  {
    id: 14,
    nombre: "Cheesecake De Frutos Rojos",
    precio: 29,
    categoria: "postres",
    imagen: "https://dvzwo3mu4ucsq.cloudfront.net/images/restaurants/cantinala15/product/3423d281-8b9f-4d2d-8353-eb53df499068.webp"
  },
  {
    id: 15,
    nombre: "Pie de Manzana",
    precio: 14,
    categoria: "postres",
    imagen: "https://dvzwo3mu4ucsq.cloudfront.net/images/restaurants/anttoninas/46c2c477-8ef5-4421-b131-b84fae40447b.webp"
  },
  {
    id: 16,
    nombre: "Galleta Red Velvet",
    precio: 14,
    categoria: "postres",
    imagen: "https://dvzwo3mu4ucsq.cloudfront.net/images/restaurants/anttoninas/product/c45f2f2e-f84e-4003-81d5-3d344a75f42a.webp"
  }
]);

const productosFiltrados = computed(() => {
  if (categoriaSeleccionada.value === "todos") {
    return productos.value;
  }
  return productos.value.filter((p) => p.categoria === categoriaSeleccionada.value);
});

function agregarAlCarrito(producto) {
  cart.addItem(producto);
  alert(`✓ "${producto.nombre}" agregado al carrito`);
}

</script>

<template>
  <section class="contenedor">
    <h1 class="titulo">Productos</h1>

    <h2 class="subtitulo">
      Categoría:
      <span class="etiqueta">{{ categoriaSeleccionada }}</span>
    </h2>

    <div class="grid">
      <div v-for="p in productosFiltrados" :key="p.id" class="card">
        <img :src="p.imagen" class="imagen" />

        <h3>{{ p.nombre }}</h3>
        <p class="precio">$ {{ p.precio }}</p>

        <button class="btn" @click="agregarAlCarrito(p)">Agregar al carrito</button>
      </div>
    </div>

    <p v-if="productosFiltrados.length === 0" class="no-data">
      No hay productos en esta categoría.
    </p>
  </section>
</template>

<style scoped>
.contenedor {
  padding: 40px 20px;
  margin-top: 30px;
  text-align: center;
}

.titulo {
  font-size: 2.4rem;
  font-weight: bold;
}

.subtitulo {
  margin-top: 10px;
  font-size: 1.2rem;
}

.etiqueta {
  font-weight: bold;
  color: #ff914d;
  text-transform: capitalize;
}

/* Grid de productos */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 25px;
  max-width: 1100px;
  margin: 40px auto 0;
}

/* Tarjeta */
.card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07);
  transition: 0.2s;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 7px 18px rgba(0, 0, 0, 0.15);
}

.imagen {
  width: 100%;
  height: 150px;
  border-radius: 10px;
  object-fit: cover;
}

.precio {
  margin: 10px 0;
  font-weight: bold;
  color: #333;
}

.btn {
  padding: 10px 18px;
  background: #ff914d;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

.btn:hover {
  background: #e67c33;
}

.no-data {
  margin-top: 20px;
  font-size: 1.2rem;
  color: #777;
}
</style>
