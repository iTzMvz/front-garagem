<script setup>
import { ref, reactive, onMounted } from "vue";
import AcessoriosApi from "../api/acessorios";
const acessoriosApi = new AcessoriosApi();

const defaultAcessorio = { id: null, descricao: "" };
const acessorios = ref([]);
const acessorio = reactive({ ...defaultAcessorio });

onMounted(async () => {
  acessorios.value = await acessoriosApi.buscarTodosOsAcessorios();
});

function limpar() {
  Object.assign(acessorio, { ...defaultAcessorio });
}

async function salvar() {
  if (acessorio.id) {
    await acessoriosApi.atualizarAcessorio(acessorio);
  } else {
    await acessoriosApi.adicionarAcessorio(acessorio);
  }
  acessorios.value = await acessoriosApi.buscarTodosOsAcessorios();
  limpar();
}

function editar(acessorio_para_editar) {
  Object.assign(acessorio, acessorio_para_editar);
}

async function excluir(id) {
  await acessoriosApi.excluirAcessorio(id);
  acessorios.value = await acessoriosApi.buscarTodosOsAcessorios();
  limpar();
}
</script>

<template>
  <h1 class="tittle">Acessorio</h1>
  <div class="form">
    <input class="input" type="text" v-model="acessorio.descricao" placeholder="Descrição" />
    <button class="botao" @click="salvar">Salvar</button>
    <button class="botao" @click="limpar">Limpar</button>
  </div>
  <ul class="lista">
    <li class="item" v-for="acessorio in acessorios" :key="acessorio.id">
      <span @click="editar(acessorio)">
        ({{ acessorio.id }}) - {{ acessorio.descricao }} -
      </span>
      <button class="excluir" @click="excluir(acessorio.id)">X</button>
    </li>
  </ul>
</template>

<style scoped>
  .tittle {
    text-align: center;
  }
  .form {
    display: flex;
    justify-content: center;
    margin: 10px;
  }
  .input {
    margin: 5px;
    padding: 5px;
    border-radius: 5px;
  }

  .botao {
    margin: 5px;
    padding: 5px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }

  .lista {
    list-style-type: none;
    padding: 0;
  }

  .item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin: 5px;
    border: 1px solid #ddd;
  }

  .excluir {
    background-color: #f44336;
    color: white;
    border-radius: 50%;
    cursor: pointer;
    width: 30px;
    height: 30px;
  }
</style>
