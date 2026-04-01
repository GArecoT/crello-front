<template>
  <div
    :class="`bg-${config.darkMode ? 'grey-10' : 'grey-2'}`"
    class="q-pa-sm rounded-borders col"
    style="
      max-width: 300px;
      width: 300px;
      min-height: calc(100vh - 150px);
      max-height: calc(100vh - 150px);
    "
  >
    <div class="row items-start">
      <div
        class="full-width text-bold q-mb-md col"
        :class="`text-${config.darkMode ? 'white' : 'dark'}`"
        style="
          font-size: 1.1rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        "
      >
        {{ props.titulo }}
      </div>
      <q-btn
        flat
        dense
        round
        :color="config.corDestaque"
        icon="sym_o_more_vert"
      />
    </div>
    <div style="overflow: auto">
      <Sortable
        :id="props.id"
        :list="props.lista"
        item-key="id"
        :key="`${JSON.stringify(props.lista)}${key}`"
        tag="div"
        :options="{
          delay: 100,
          delayOnTouchOnly: true,
          group: 'colunas',
          ghostClass: 'ghost',
          animation: 150,
        }"
        @start="storeColuna.bloqueioAtualizar = true"
        @end="atualizarCard"
        style="min-height: calc(100vh - 270px); max-height: calc(100vh - 270px)"
      >
        <template #item="{ element, index }">
          <cmpCard
            ref="refCard"
            :card="element"
            @atualizar-titulo="
              async (val) => {
                emit('atualizarCard', { index: index, nome: val });
                key = Date.now()
                await storeColuna.actAtualizar(500);
              }
            "
          />
        </template>
      </Sortable>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useConfigStore } from "src/stores/config/config";
import cmpCard from "./cmpCard.vue";
import type { Cardslista } from "src/composables/tipos";
import { Sortable } from "sortablejs-vue3";
import { ref } from "vue";
import { useCardsStore } from "src/stores/cards/cards";
import { useColunasStore } from "src/stores/colunas/colunas";

const storeColuna = useColunasStore();
const storeCard = useCardsStore();
const storeConfig = useConfigStore();
const config = storeConfig.config;

const key = ref(1)

interface Props {
  id?: string | number;
  titulo?: string;
  lista?: Cardslista;
}

const props = withDefaults(defineProps<Props>(), {
  id: 0,
  titulo: "Título",
  lista: () => [
    { id: 1, nome: "Titulo card", id_coluna: 0, usuarios: [], categorias: [] },
  ],
});

const emit = defineEmits(["atualizarCard"]);

const refCard = ref({
  destacar: (destacar?: boolean) => {
    return destacar;
  },
});

async function atualizarCard(evt: {
  item: { id: string | number };
  to: { id: string | number };
}) {
  await storeCard.actMoverColuna(evt.item.id as number, evt.to.id as number);
  storeColuna.bloqueioAtualizar = false;
  await storeColuna.actAtualizar(5000);
}
</script>
<style lang="scss">
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
