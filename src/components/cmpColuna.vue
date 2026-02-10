<template>
  <div
    :class="`bg-${config.darkMode ? 'grey-10' : 'grey-2'}`"
    class="q-pa-sm rounded-borders col"
    style="
      max-width: 300px;
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
        :id="`coluna_${props.id}`"
        :list="props.lista"
        item-key="id"
        tag="div"
        :options="{
          group: 'colunas',
          ghostClass: 'ghost',
        }"
        @end="atualizarCard"
        style="min-height: calc(100vh - 270px); max-height: calc(100vh - 270px)"
      >
        <template #item="{ element, index }">
          <cmpCard
            ref="refCard"
            :titulo="element.titulo"
            :id="element.id"
            @atualizar-titulo="
              (val) => emit('atualizarCard', { index: index, titulo: val })
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
import type { Lista } from "src/composables/tipos";
import { Sortable } from "sortablejs-vue3";
import { ref } from "vue";

const storeConfig = useConfigStore();
const config = storeConfig.config;

interface Props {
  id?: string | number;
  titulo?: string;
  lista?: Lista;
}

const props = withDefaults(defineProps<Props>(), {
  id: 0,
  titulo: "Título",
  lista: () => [{ id: 1, titulo: "Titulo card", id_coluna: 0 }],
});

const emit = defineEmits(["atualizarCard"]);

const refCard = ref({
  destacar: (destacar?: boolean) => {
    return destacar;
  },
});

function atualizarCard(evt: {
  item: { id: string | number };
  to: { id: string | number };
}) {
  console.log("aaa", evt.item.id, evt.to.id);
}
</script>
<style lang="scss">
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
