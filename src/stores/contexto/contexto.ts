import { defineStore } from "pinia";
import { LocalStorage } from "quasar";

export type Contexto = {
  mainLayout: MainLayout
}
export type MainLayout = {
  quadro: number
}

const contextoPadrao = {
  mainLayout: {
    quadro: 0,
  }
}

function pegaContexto(): Contexto {
  let contexto = LocalStorage.getItem('contexto') as Contexto

  if (typeof contexto === 'object')
    contexto = { ...contextoPadrao, ...contexto }
  else
    contexto = { ...contextoPadrao }

  return contexto
}

export const useContextoStore = defineStore("contexto", {
  state: () => ({
    contexto: { ...pegaContexto() }
  }),

  getters: {
    getContexto: (state) => state.contexto,
  },
  actions: {
    actSetContexto(payload: Contexto) {
      this.contexto = payload;
      LocalStorage.setItem('contexto', payload)
    },
    actResetContexto() {
      LocalStorage.removeItem('contexto')
      this.actSetContexto({ ...contextoPadrao })
      LocalStorage.setItem('contexto', contextoPadrao)
    },
  },
});
