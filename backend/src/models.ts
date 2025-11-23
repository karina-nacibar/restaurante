// src/models.ts
export type EstadoOrden = "pendiente" | "preparando" | "entregado";

export interface Categoria {
  id: number;
  nombre: string;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  categoriaId: number;
}

export interface CarritoItem {
  id: number;
  productoId: number;
  cantidad: number;
}

export interface Orden {
  id: number;
  items: CarritoItem[];
  total: number;
  estado: EstadoOrden;
  creadoEn: string; // ISO date
}
