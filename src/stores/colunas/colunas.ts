import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import handleErrorServidor from "src/composables/handleErrorServidor";
import type { ObjetoArrayGenerico, Response } from "src/composables/tipos";

export const useColunasStore = defineStore("colunas", {
  state: () => ({
    colunas: [] as ObjetoArrayGenerico
  }),

  getters: {
    getColunas: (state) => state.colunas,
  },
  actions: {
    async actLista(): Promise<Response> {
      try {
        const res = await api.get(`${api.defaults.baseURL}colunas`)
        const data = res.data as Response
        if (!(data.info.cdg_erro > 0) && data.data.chave && data.data.chave.length > 0) {
          this.colunas = data.data
        }
        return data
      } catch (error) {
        const erro = handleErrorServidor(error)
        return erro
      }
    },
  },
});
