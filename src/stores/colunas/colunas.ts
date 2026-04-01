import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import handleErrorServidor from "src/composables/handleErrorServidor";
import type { Coluna, ObjetoArrayGenerico, Response } from "src/composables/tipos";
import consts from '../../composables/consts.json'

export const useColunasStore = defineStore("colunas", {
  state: () => ({
    colunas: [] as ObjetoArrayGenerico,
    coluna: [] as ObjetoArrayGenerico,
    bloqueioAtualizar: false as boolean,
    timestamp_atualizacao: Date.now()
  }),

  getters: {
    getColunas: (state) => state.colunas,
  },
  actions: {
    async actLista(): Promise<Response> {
      try {
        const res = await api.get(`${api.defaults.baseURL}colunas`)
        const data = res.data as Response
        if (!(data.info.cdg_erro > 0)) {
          await Promise.all(data.data.map(async (val: Coluna, index: number) => {
            const res = await this.actGet(val.id)
            if (res !== undefined)
              data.data[index] = res.data

          }))
          this.colunas = data.data
        }
        this.timestamp_atualizacao = Date.now()
        return data
      } catch (error) {
        const erro = handleErrorServidor(error, true)
        return erro
      }
    },
    async actGet(id: number | string) {
      if ((typeof id === 'number' && id > 0) || (typeof id === 'string' && id.length > 0)) {
        try {
          const res = await api.get(`${api.defaults.baseURL}coluna/${id}`)
          const data = res.data as Response
          if (!(data.info.cdg_erro > 0)) {
            this.coluna = data.data
          }
          return data
        } catch (error) {
          const erro = handleErrorServidor(error, true)
          return erro
        }
      }
      return
    },
    async actAtualizar(ms = consts.debounceAtualizarPadrao): Promise<Response> {
      const agora = Date.now()
      if (this.bloqueioAtualizar || agora - this.timestamp_atualizacao < ms)
        return {
          data: {},
          info: { msg: '', cdg_erro: 0 }
        }
      else
        return await this.actLista()
    }
  },
});
