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

        // 👉 Actualizar cantidad en backend
        await axios.post("http://localhost:3000/carrito", {
          productoId: producto.id,
          cantidad: 1
        });

      } else {
        this.items.push({
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: 1
        });

        // 👉 Agregar nuevo item al backend
        await axios.post("http://localhost:3000/carrito", {
          productoId: producto.id,
          cantidad: 1
        });
      }
    },

    clearCart() {
      this.items = [];
    }
  }
});
