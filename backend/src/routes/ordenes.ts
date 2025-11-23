// src/routes/ordenes.ts
import { Router } from "express";
import { carrito, ordenes, nextOrdenId, nextCarritoItemId } from "../data";
import { Orden, CarritoItem } from "../models";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Ordenes
 *   description: Gestión de órdenes
 */

/**
 * @swagger
 * /ordenes:
 *   get:
 *     summary: Lista todas las órdenes
 *     tags: [Ordenes]
 *     responses:
 *       200:
 *         description: Lista de órdenes
 */
router.get("/", (req, res) => {
  res.json(ordenes);
});

/**
 * @swagger
 * /ordenes/{id}:
 *   get:
 *     summary: Obtiene una orden por id
 *     tags: [Ordenes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Orden encontrada
 *       404:
 *         description: Orden no encontrada
 */
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const o = ordenes.find(x => x.id === id);
  if (!o) return res.status(404).json({ message: "Orden no encontrada" });
  res.json(o);
});

/**
 * @swagger
 * /ordenes:
 *   post:
 *     summary: Crea una orden a partir del carrito (y lo vacía)
 *     tags: [Ordenes]
 *     responses:
 *       201:
 *         description: Orden creada correctamente
 *       400:
 *         description: El carrito está vacío
 */
  router.post("/", (req, res) => {
    if (carrito.length === 0) {
  return res.status(400).json({ message: "Carrito vacío" });
}

  // Importar productos (evitar ciclos)
  const { productos } = require("../data");

  const calculatedTotal = carrito.reduce((acc: number, item: CarritoItem) => {
    const prod = productos.find((p: any) => p.id === item.productoId);
    const price = prod ? prod.precio : 0;
    return acc + price * item.cantidad;
  }, 0);

  const newOrder: Orden = {
    id: nextOrdenId(),
    items: carrito.splice(0, carrito.length), // mover items a la orden
    total: calculatedTotal,
    estado: "pendiente",
    creadoEn: new Date().toISOString(),
  };
  ordenes.push(newOrder);
  res.status(201).json(newOrder);
});

/**
 * @swagger
 * /ordenes/{id}/estado:
 *   patch:
 *     summary: Actualiza el estado de una orden
 *     tags: [Ordenes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - estado
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [pendiente, preparando, entregado]
 *     responses:
 *       200:
 *         description: Estado actualizado
 *       400:
 *         description: Estado inválido
 *       404:
 *         description: Orden no encontrada
 */
router.patch("/:id/estado", (req, res) => {
  const id = Number(req.params.id);
  const o = ordenes.find(x => x.id === id);
  if (!o) return res.status(404).json({ message: "Orden no encontrada" });

  const { estado } = req.body as { estado?: string };
  if (!estado || !["pendiente", "preparando", "entregado"].includes(estado)) {
    return res.status(400).json({ message: "estado inválido. Valores permitidos: pendiente, preparando, entregado" });
  }
  o.estado = estado as any;
  res.json(o);
});

export default router;