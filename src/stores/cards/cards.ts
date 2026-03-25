import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import handleErrorServidor from "src/composables/handleErrorServidor";
import type { Response } from "src/composables/tipos";

export const useCardsStore = defineStore("cards", {
  state: () => ({
  }),

  getters: {
  },
  actions: {
    async actMoverColuna(id_card: number, id_coluna: number): Promise<Response> {
      try {
        const res = await api.post(`${api.defaults.baseURL}cards/moverColuna/${id_coluna}`, { id: id_card })
        const data = res.data as Response
        return data
      } catch (error) {
        const erro = handleErrorServidor(error)
        return erro
      }
    },
    async actRenomear(id_card: number, nome: string): Promise<Response> {
      try {
        const res = await api.post(`${api.defaults.baseURL}cards/renomear/${id_card}`, { nome: nome })
        const data = res.data as Response
        return data
      } catch (error) {
        const erro = handleErrorServidor(error)
        return erro
      }
    }
  },
});
