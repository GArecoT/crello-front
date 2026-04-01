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
import { debounce } from "quasar";
import cmpColuna from "src/components/cmpColuna.vue";
import { useColunasStore } from "src/stores/colunas/colunas";
import { onMounted } from "vue";
import consts from "../composables/consts.json";

const storeColuna = useColunasStore();
let inativo = false;

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

async function update() {
  if (inativo) await storeColuna.actAtualizar();
  inativo = false;
  storeColuna.bloqueioAtualizar = false;
  debounceInatividade();
}

const debounceInatividade = debounce(() => {
  inativo = true;
  storeColuna.bloqueioAtualizar = true;
}, 5 * 60000);
document.onmousemove = async () => {
  await update();
};
document.addEventListener(
  "keydown",
  () => {
    void update();
  },
  false,
);

setInterval(() => {
  void (async () => {
    await storeColuna.actAtualizar();
  })();
}, consts.debounceAtualizarPadrao);

onMounted(async () => {
  await storeColuna.actLista();
});
</script>
