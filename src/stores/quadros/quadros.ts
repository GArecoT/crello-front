import { defineStore } from "pinia";

const quadros = [{ codigo: 0, nome: "Quadro 1" }, { codigo: 1, nome: "Quadro 2" }]

export const useQuadrosStore = defineStore("quadros", {
  state: () => ({
    quadros: [{}]
  }),

  getters: {
    getQuadros: (state) => state.quadros,
  },
  actions: {
    actListarQuadros(payload?: object) {
      //TODO: Fazer req ao servidor
      console.log(payload)
      this.quadros = quadros;
    },
  },
});
