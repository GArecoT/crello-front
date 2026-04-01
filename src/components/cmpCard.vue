<template>
  <q-card
    flat
    class="full-width q-pa-xs q-my-sm cursor-grab card non-selectable"
    :id="props.card.id"
  >
    <div class="row items-start">
      <q-input
        :color="storeConfig.config.corDestaque"
        class="full-width q-mb-md col"
        :class="`text-${config.darkMode ? 'white' : 'dark'}`"
        style="overflow: hidden; text-overflow: ellipsis"
        dense
        :borderless="!tituloEditavel"
        :outlined="tituloEditavel"
        input-class="text-bold cursor-pointer"
        input-style="height: 20px; max-height: 2.5rem"
        :model-value="props.card.nome"
        ref="inputTitulo"
        @click="ativarEdicao"
        @blur="salvarEdicao"
        @keyup.enter="salvarEdicao"
        @update:model-value="(val) => (tituloTemporario = val)"
      />
    </div>
    <div class="q-gutter-x-xs q-gutter-y-xs">
      <q-badge :key="usuario.id" v-for="usuario in card.usuarios">{{
        usuario.nome
      }}</q-badge>
    </div>
    <div class="q-gutter-x-xs q-gutter-y-xs">
      <q-badge :key="categoria" v-for="categoria in card.categorias">{{
        categoria
      }}</q-badge>
    </div>
  </q-card>
</template>
<script setup lang="ts">
import { useCardsStore } from "src/stores/cards/cards";
import { useConfigStore } from "src/stores/config/config";
import { ref } from "vue";
import type { Ref } from "vue";
import type { Card } from "src/composables/tipos";
import { useColunasStore } from "src/stores/colunas/colunas";

const storeColuna = useColunasStore()
const storeCards = useCardsStore();
const storeConfig = useConfigStore();

const config = storeConfig.config;

const props = defineProps<{ card: Card }>();

const emit = defineEmits(["atualizarTitulo"]);

const tituloEditavel = ref(false);
const inputTitulo = ref({ select: () => {}, focus: () => {}, blur: () => {} });
const tituloTemporario: Ref<string | number | null> = ref("");

function ativarEdicao() {
  storeColuna.bloqueioAtualizar = true
  tituloEditavel.value = true;
  tituloTemporario.value = props.card.nome;
  inputTitulo.value.select();
}
async function salvarEdicao() {
  storeColuna.bloqueioAtualizar = false
  if (tituloEditavel.value) {
    tituloEditavel.value = false;
    inputTitulo.value.blur();
    const res = await storeCards.actRenomear(
      props.card.id as number,
      tituloTemporario.value as string,
    );
    if (!(res.info.cdg_erro > 0))
      emit("atualizarTitulo", tituloTemporario.value);
  }
}
</script>
<style lang="scss">
.card {
  cursor: grab;
}
.card:active {
  cursor: grabbing;
}
.card:hover {
  // background-color:  !important;
  border: 2px solid $primary;
}
</style>
