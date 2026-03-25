<template>
  <q-page class="">
    <div class="q-pa-sm row q-gutter-x-sm" style="width: max-content">
      <cmpColuna
        v-for="(coluna, index) in storeColuna.getColunas"
        :key="coluna.id"
        :titulo="coluna.nome"
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
import { useColunasStore } from "src/stores/colunas/colunas";
import { onMounted } from "vue";

const storeColuna = useColunasStore();

function handleAtualizarCard(
  index_coluna: any,
  card: {
    index: number;
    nome: string;
  },
) {
  console.log(storeColuna.colunas[index_coluna], card);
  if (
    storeColuna.getColunas[index_coluna] !== undefined &&
    storeColuna.getColunas[index_coluna].cards[card.index] !== undefined
  )
    try {
      storeColuna.colunas[index_coluna].cards[card.index]!.nome = card.nome;
    } catch {
      console.log("Não foi possível renomear");
    }
}

onMounted(async () => {
  await storeColuna.actLista();
});
</script>
