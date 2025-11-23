<script setup></script>

<template>
  <section class="hero">
    <div class="overlay"></div>

    <div class="content">
      <h1>Bienvenido a Nuestro Restaurante</h1>
      <p>Disfruta de los mejores platos preparados con amor y tradición.</p>

      <div class="botones">
        <router-link to="/productos" class="btn">Ver Productos</router-link>
        <router-link to="/categorias" class="btn btn-secundario">Categorías</router-link>
      </div>
    </div>
  </section>

  <section class="info">
    <h2>¿Por qué elegirnos?</h2>

    <div class="cards">
      <div class="card">
        <h3>🍝 Comida deliciosa</h3>
        <p>Ingredientes frescos todos los días.</p>
      </div>

      <div class="card">
        <h3>⚡ Atención rápida</h3>
        <p>Pedidos preparados en pocos minutos.</p>
      </div>

      <div class="card">
        <h3>💳 Pagos seguros</h3>
        <p>Métodos modernos y confiables.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Hero grande con imagen */
.hero {
  position: relative;
  height: 70vh;
  background-image: url("https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Capa oscura */
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
}

/* Texto centrado */
.content {
  position: relative;
  text-align: center;
  color: white;
  max-width: 700px;
  padding: 20px;
}

.content h1 {
  font-size: 3rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.content p {
  font-size: 1.3rem;
  margin: 10px 0 25px;
}

/* Botones */
.btn {
  padding: 12px 25px;
  background: #ff914d;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-size: 1.1rem;
  margin: 0 10px;
  transition: 0.2s;
}

.btn:hover {
  background: #e67c33;
}

.btn-secundario {
  background: #2b7cff;
}

.btn-secundario:hover {
  background: #1a5ad1;
}

/* Sección de info */
.info {
  padding: 40px 20px;
  text-align: center;
}

.cards {
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-top: 30px;
  flex-wrap: wrap;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 260px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  transition: 0.2s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.card h3 {
  margin-bottom: 10px;
}
</style>
