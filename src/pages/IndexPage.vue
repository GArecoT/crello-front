<template>
  <q-page class="">
    <div class="q-pa-sm row q-gutter-x-sm">
      <cmpColuna
        v-for="(coluna, index) in colunas"
        :key="coluna.id"
        :titulo="coluna.titulo_coluna"
        :lista="coluna.cards"
        :id="coluna.id"
        @atualizar-card="
          (val) => {
            handleAtualizarCard(index, val);
          }
        "
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import cmpColuna from "src/components/cmpColuna.vue";
import type { Coluna } from "src/composables/tipos";
import { ref } from "vue";
import type { Ref } from "vue";

const colunas: Ref<Coluna> = ref([
  {
    id: 0,
    titulo_coluna: "Coluna 1",
    cards: [
      { id: "1.0", titulo: "card 1.1", id_coluna: 0 },
      { id: "1.1", titulo: "card 1.2", id_coluna: 0 },
      { id: "1.2", titulo: "card 1.3", id_coluna: 0 },
      { id: "1.3", titulo: "card 1.4", id_coluna: 0 },
      { id: "1.4", titulo: "card 1.5", id_coluna: 0 },
    ],
  },
  {
    id: 1,
    titulo_coluna: "Coluna 2",
    cards: [
      { id: "2.0", titulo: "card 2.1", id_coluna: 1 },
      { id: "2.1", titulo: "card 2.2", id_coluna: 1 },
      { id: "2.2", titulo: "card 2.3", id_coluna: 1 },
      { id: "2.3", titulo: "card 2.4", id_coluna: 1 },
      { id: "2.4", titulo: "card 2.5", id_coluna: 1 },
    ],
  },
  {
    id: 2,
    titulo_coluna: "Coluna 3",
    cards: [
      { id: "3.0", titulo: "card 3.1", id_coluna: 2 },
      { id: "3.1", titulo: "card 3.2", id_coluna: 2 },
      { id: "3.2", titulo: "card 3.3", id_coluna: 2 },
      { id: "3.3", titulo: "card 3.4", id_coluna: 2 },
      { id: "3.4", titulo: "card 3.5", id_coluna: 2 },
    ],
  },
]);

function handleAtualizarCard(
  index_coluna: number,
  card: {
    index: number;
    titulo: string;
  },
) {
  if (
    colunas.value[index_coluna] !== undefined &&
    colunas.value[index_coluna].cards[card.index] !== undefined
  )
    try {
      colunas.value[index_coluna].cards[card.index]!.titulo = card.titulo;
    } catch {
      console.log("Não foi possível renomear");
    }
}
</script>
