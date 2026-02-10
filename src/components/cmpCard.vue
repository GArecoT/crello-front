<template>
  <q-card
    flat
    class="full-width q-pa-xs q-my-sm cursor-grab card non-selectable"
    :id="`card_${props.id}`"
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
        :model-value="props.titulo"
        ref="inputTitulo"
        @click="ativarEdicao"
        @blur="salvarEdicao"
        @keyup.enter="salvarEdicao"
        @update:model-value="(val) => (tituloTemporario = val)"
      />
    </div>
  </q-card>
</template>
<script setup lang="ts">
import { useConfigStore } from "src/stores/config/config";
import { ref } from "vue";
import type { Ref } from "vue";

const storeConfig = useConfigStore();
const config = storeConfig.config;
const props = defineProps({
  titulo: {
    type: String,
    default:
      "Teste de título gigante da pega rapaz ratinhooo Teste de título gigante da pega rapaz ratinhooo",
  },
  id: { type: [String, Number], default: 0 },
});


const emit = defineEmits(["atualizarTitulo"]);

const tituloEditavel = ref(false);
const inputTitulo = ref({ select: () => {}, focus: () => {}, blur: () => {} });
const tituloTemporario: Ref<string | number | null> = ref("");

function ativarEdicao() {
  tituloEditavel.value = true;
  tituloTemporario.value = props.titulo;
  inputTitulo.value.select();
}
function salvarEdicao() {
  if (tituloEditavel.value) {
    tituloEditavel.value = false;
    emit("atualizarTitulo", tituloTemporario.value);
    inputTitulo.value.blur();
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
  backgroud-color: yellow !important;
  border: 2px solid $primary;
}
</style>
