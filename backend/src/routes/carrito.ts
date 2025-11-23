// src/routes/carrito.ts
import { Router } from "express";
import { carrito, productos, nextCarritoItemId } from "../data";
import { CarritoItem } from "../models";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Carrito
 *   description: Gestión del carrito
 */

/**
 * @swagger
 * /carrito:
 *   get:
 *     summary: Obtiene los items del carrito
 *     tags: [Carrito]
 *     responses:
 *       200:
 *         description: Lista de items en el carrito
 */
router.get("/", (req, res) => {
  res.json(carrito);
});

/**
 * @swagger
 * /carrito:
 *   post:
 *     summary: Agrega un item al carrito
 *     tags: [Carrito]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productoId
 *               - cantidad
 *             properties:
 *               productoId:
 *                 type: integer
 *               cantidad:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Item agregado correctamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post("/", (req, res) => {
  const { productoId, cantidad } = req.body as { productoId?: number; cantidad?: number };
  if (!productoId || !cantidad) return res.status(400).json({ message: "productoId y cantidad son requeridos" });
  const prod = productos.find(p => p.id === productoId);
  if (!prod) return res.status(400).json({ message: "productoId inválido" });
  const newItem: CarritoItem = { id: nextCarritoItemId(), productoId, cantidad };
  carrito.push(newItem);
  res.status(201).json(newItem);
});

/**
 * @swagger
 * /carrito/{itemId}:
 *   delete:
 *     summary: Elimina un item del carrito
 *     tags: [Carrito]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item eliminado
 *       404:
 *         description: Item no encontrado
 */
router.delete("/:itemId", (req, res) => {
  const itemId = Number(req.params.itemId);
  const idx = carrito.findIndex(i => i.id === itemId);
  if (idx === -1) return res.status(404).json({ message: "Item no encontrado en carrito" });
  const deleted = carrito.splice(idx, 1)[0];
  res.json(deleted);
});

/**
 * @swagger
 * /carrito:
 *   delete:
 *     summary: Vacía todo el carrito
 *     tags: [Carrito]
 *     responses:
 *       200:
 *         description: Carrito vaciado correctamente
 */
router.delete("/", (req, res) => {
  carrito.length = 0;
  res.json({ message: "Carrito vaciado" });
});

export default router;