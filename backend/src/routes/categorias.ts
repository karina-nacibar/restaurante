// src/routes/categorias.ts
import { Router } from "express";
import { categorias, nextCategoriaId } from "../data";
import { Categoria } from "../models";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Endpoints para gestionar categorías
 */

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Obtiene todas las categorías
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista de categorías
 */
router.get("/", (req, res) => {
  res.json(categorias);
});

/**
 * @swagger
 * /categorias/{id}:
 *   get:
 *     summary: Obtiene una categoría por id
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *       404:
 *         description: Categoría no encontrada
 */
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const cat = categorias.find(c => c.id === id);
  if (!cat) return res.status(404).json({ message: "Categoría no encontrada" });
  res.json(cat);
});

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Crea una nueva categoría
 *     tags: [Categorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoría creada
 *       400:
 *         description: Datos inválidos
 */
router.post("/", (req, res) => {
  const { nombre } = req.body as { nombre?: string };
  if (!nombre) return res.status(400).json({ message: "nombre es requerido" });
  const newCat: Categoria = { id: nextCategoriaId(), nombre };
  categorias.push(newCat);
  res.status(201).json(newCat);
});

/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     summary: Actualiza una categoría
 *     tags: [Categorias]
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
 *     responses:
 *       200:
 *         description: Categoría actualizada
 *       404:
 *         description: Categoría no encontrada
 */
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const cat = categorias.find(c => c.id === id);
  if (!cat) return res.status(404).json({ message: "Categoría no encontrada" });
  const { nombre } = req.body;
  if (nombre) cat.nombre = nombre;
  res.json(cat);
});

/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Elimina una categoría
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoría eliminada
 *       404:
 *         description: Categoría no encontrada
 */
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = categorias.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ message: "Categoría no encontrada" });
  const deleted = categorias.splice(idx, 1)[0];
  res.json(deleted);
});

export default router;