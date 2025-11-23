// src/app.ts
import express from "express";
import cors from "cors";

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// Importación de rutas
import categoriasRoutes from "./routes/categorias";
import productosRoutes from "./routes/productos";   // ← Usa este o productRoutes, no ambos
import carritoRoutes from "./routes/carrito";
import ordenesRoutes from "./routes/ordenes";
// import productRoutes from "./routes/productosRoutes"; // ← ELIMINADO para evitar conflicto

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Configuración Swagger
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Restaurante",
      version: "1.0.0",
      description: "API para el sistema de pedidos de restaurante",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./src/routes/*.ts", "./dist/routes/*.js"],
});

// Ruta Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de la API
app.use("/categorias", categoriasRoutes);
app.use("/productos", productosRoutes); // ← QUEDA SOLO ESTA
app.use("/carrito", carritoRoutes);
app.use("/ordenes", ordenesRoutes);

// Ruta base
app.get("/", (req, res) => res.send("API Restaurante funcionando"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación Swagger: http://localhost:${PORT}/api-docs`);
});

export default app;
