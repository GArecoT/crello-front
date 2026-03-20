<template>
  <div
    class="bg-black window-height window-width row justify-center items-center"
  >
    <div
      class="bg-white q-pa-md arredondado"
      :class="`text-${config.corDestaque}`"
      style="width: 300px"
    >
      <p class="texto-titulo text-bold q-ma-none q-pt-sm q-pl-xs">Login</p>
      <q-form class="q-mt-md" @submit="fazerLogin">
        <q-input
          outlined
          label="Nome"
          :color="config.corDestaque"
          :label-color="config.corDestaque"
          :rules="rules.campo"
          lazy-rules="ondemand"
          v-model="login.nome"
        />
        <q-input
          outlined
          label="Senha"
          :color="config.corDestaque"
          :label-color="config.corDestaque"
          type="password"
          :rules="rules.campo"
          lazy-rules="ondemand"
          v-model="login.senha"
        />
        <q-btn
          class="full-width q-py-sm"
          style="border-radius: 10px"
          unelevated
          :color="config.corDestaque"
          no-caps
          label="Login"
          type="submit"
        />
      </q-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import rules from "src/composables/rules";
import { useConfigStore } from "src/stores/config/config";
import { useLoginStore } from "src/stores/login/login";
import { ref } from "vue";

const store = useLoginStore();
const storeConfig = useConfigStore();
const config = storeConfig.config;

const login = ref({
  nome: "",
  senha: "",
});

async function fazerLogin() {
  await store.actLogin(login.value);
}
</script>
