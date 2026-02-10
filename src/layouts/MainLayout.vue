<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      flat
      :class="`${config.darkMode ? 'bg-grey-10' : 'bg-grey-2'} text-${config.corDestaque}`"
    >
      <q-toolbar>
        <q-toolbar-title> Crello </q-toolbar-title>
        <q-select
          label="Quadro"
          v-model.number="contexto.mainLayout.quadro"
          :options="storeQuadros.getQuadros"
          option-value="codigo"
          option-label="nome"
          map-options
          emit-value
          dense
          borderless
          options-dense
          :color="config.corDestaque"
          :label-color="config.corDestaque"
          @update:model-value="atualizarQuadro"
        />
        <!-- TODO: Sistema de notificações -->
        <q-btn flat round dense icon="sym_o_filter_list" />
        <!-- TODO: Sistema de notificações -->
        <q-btn flat round dense icon="sym_o_notifications" />
        <!-- TODO: Tela de configurações -->
        <q-btn flat round dense icon="sym_o_settings" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { useConfigStore } from "src/stores/config/config";
import { useContextoStore } from "src/stores/contexto/contexto";
import { useQuadrosStore } from "src/stores/quadros/quadros";
import { onMounted } from "vue";

const contextoStore = useContextoStore();
const configStore = useConfigStore();
const storeQuadros = useQuadrosStore();

const config = configStore.config;
const contexto = contextoStore.contexto;

function pegaQuadros() {
  storeQuadros.actListarQuadros();
}

function atualizarQuadro(codigo: number) {
  console.log("mudou quadro", codigo);
}

onMounted(() => {
  pegaQuadros();
});
</script>
