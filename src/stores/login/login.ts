import { defineStore } from "pinia";
import { SessionStorage } from "quasar";
import { api } from "src/boot/axios";
import handleErrorServidor from "src/composables/handleErrorServidor";
import type { Response } from "src/composables/tipos";

export const useLoginStore = defineStore("login", {
  actions: {
    async actLogin(payload?: object): Promise<Response> {
      try {
        const res = await api.post(`${api.defaults.baseURL}auth/login`, payload)
        const data = res.data as Response
        if (!(data.info.cdg_erro > 0) && data.data.chave && data.data.chave.length > 0) {
          SessionStorage.setItem('chave', data.data.chave)
        }
        return data
      } catch (error) {
        const erro = handleErrorServidor(error)
        return erro
      }
    },
  },
});
