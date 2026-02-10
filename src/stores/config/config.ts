import { defineStore } from "pinia";
import { LocalStorage } from "quasar";

type Config = {
  darkMode: boolean,
  corDestaque: string
}

const configPadrao = {
  darkMode: false,
  corDestaque: 'indigo',
}

function pegaConfig(): Config {
  let config = LocalStorage.getItem('config') as Config

  if (typeof config === 'object')
    config = { ...config, ...configPadrao }
  else
    config = { ...configPadrao }

  if (config != null) {
    configPadrao.corDestaque = config.corDestaque
  }
  return configPadrao
}

export const useConfigStore = defineStore("config", {
  state: () => ({
    config: { ...pegaConfig() }
  }),

  getters: {
    getConfig: (state) => state.config,
    getCorDestaque: (state) => {
      if (state.config.darkMode) {
        return `${state.config.corDestaque}-4`
      } else {
        return `${state.config.corDestaque}-5`
      }
    }
  },
  actions: {
    actSetConfig(payload: Config) {
      this.config = payload;
      LocalStorage.setItem('config', payload)
    },
    actResetConfig() {
      LocalStorage.removeItem('config')
      this.actSetConfig({ ...configPadrao })
    },
  },
});
