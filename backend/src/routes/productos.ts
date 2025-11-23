// src/routes/productos.ts
import { Router } from "express";
import { productos, nextProductoId, categorias } from "../data";
import { Producto } from "../models";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Endpoints para productos
 */

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Lista productos (filtro opcional por categoriaId)
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: categoriaId
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get("/", (req, res) => {
  const categoriaId = req.query.categoriaId ? Number(req.query.categoriaId) : undefined;
  let result = productos;
  if (categoriaId) result = productos.filter(p => p.categoriaId === categoriaId);
  res.json(result);
});

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtiene un producto por id
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const p = productos.find(x => x.id === id);
  if (!p) return res.status(404).json({ message: "Producto no encontrado" });
  res.json(p);
});

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crea un producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - precio
 *               - categoriaId
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               categoriaId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Producto creado
 *       400:
 *         description: Datos inválidos
 */
router.post("/", (req, res) => {
  const { nombre, descripcion, precio, categoriaId } = req.body as Partial<Producto>;
  if (!nombre || precio == null || !categoriaId) {
    return res.status(400).json({ message: "nombre, precio y categoriaId son requeridos" });
  }
  const catExists = categorias.find(c => c.id === categoriaId);
  if (!catExists) return res.status(400).json({ message: "categoriaId inválido" });

  const newProd: Producto = {
    id: nextProductoId(),
    nombre,
    descripcion,
    precio,
    categoriaId,
  };
  productos.push(newProd);
  res.status(201).json(newProd);
});

/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Actualiza un producto
 *     tags: [Productos]
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
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               categoriaId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       404:
 *         description: Producto no encontrado
 */
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const p = productos.find(x => x.id === id);
  if (!p) return res.status(404).json({ message: "Producto no encontrado" });

  const { nombre, descripcion, precio, categoriaId } = req.body as Partial<Producto>;
  if (nombre !== undefined) p.nombre = nombre;
  if (descripcion !== undefined) p.descripcion = descripcion;
  if (precio !== undefined) p.precio = precio;
  if (categoriaId !== undefined) p.categoriaId = categoriaId;

  res.json(p);
});

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Elimina un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 */
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = productos.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ message: "Producto no encontrado" });
  const deleted = productos.splice(idx, 1)[0];
  res.json(deleted);
});

export default router;