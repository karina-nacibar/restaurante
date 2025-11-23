// src/data.ts
import { Categoria, Producto, CarritoItem, Orden } from "./models";

let categoriaIdSeq = 4;
let productoIdSeq = 6;
let carritoItemIdSeq = 1;
let ordenIdSeq = 1;

export const categorias: Categoria[] = [
  { id: 1, nombre: "Entradas" },
  { id: 2, nombre: "Platos fuertes" },
  { id: 3, nombre: "Bebidas" },
];

export const productos: Producto[] = [
  { id: 1, nombre: "Ensalada César", descripcion: "Lechuga, pollo, aderezo", precio: 12.5, categoriaId: 1 },
  { id: 2, nombre: "Sopa de verduras", descripcion: "Calentita y casera", precio: 8.0, categoriaId: 1 },
  { id: 3, nombre: "Lomo a la plancha", descripcion: "250g con guarnición", precio: 20.0, categoriaId: 2 },
  { id: 4, nombre: "Pasta Alfredo", descripcion: "Con salsa cremosa", precio: 15.0, categoriaId: 2 },
  { id: 5, nombre: "Refresco", descripcion: "Lata 330ml", precio: 3.0, categoriaId: 3 },
];

export const carrito: CarritoItem[] = []; // inicialmente vacío
export const ordenes: Orden[] = [];

// helpers para generar ids y reset (útil en pruebas)
export function nextCategoriaId() { return ++categoriaIdSeq; }
export function nextProductoId() { return ++productoIdSeq; }
export function nextCarritoItemId() { return ++carritoItemIdSeq; }
export function nextOrdenId() { return ++ordenIdSeq; }
