import { defineStore } from "pinia";
// import { SessionStorage } from "quasar";
import { api } from "src/boot/axios";

export const useLoginStore = defineStore("login", {
  actions: {
    async actLogin(payload?: object) {
      //TODO: Fazer req ao servidor
      const res = await api.post(`${api.defaults.baseURL}auth/login`, payload)
      // SessionStorage.
      console.log(res)
    },
  },
});
