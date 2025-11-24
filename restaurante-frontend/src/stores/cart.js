import axios from "axios";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: []
  }),

  getters: {
    total: (state) =>
      state.items.reduce((t, p) => t + p.precio * p.cantidad, 0)
  },

  actions: {
    async addItem(producto) {
      const existe = this.items.find(item => item.id === producto.id);

      if (existe) {
        existe.cantidad++;
      } else {
        this.items.push({
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: 1
        });
      }

      try {
        // Agregar al carrito del backend
        await axios.post("http://localhost:3000/carrito", {
          productoId: producto.id,
          cantidad: 1
        });
      } catch (error) {
        console.error("Error al agregar al carrito:", error);
      }
    },

    // Método corregido: clearCart en lugar de clear
    clearCart() {
      this.items = [];
    }
  }
});