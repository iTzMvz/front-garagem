<script setup>
import { ref, reactive, onMounted } from "vue";
import CategoriasApi from "@/api/categorias";
const categoriasApi = new CategoriasApi();

const defaultCategoria = { id: null, descricao: "" };
const categorias = ref([]);
const categoria = reactive({ ...defaultCategoria });

onMounted(async () => {
  categorias.value = await categoriasApi.buscarTodasAsCategorias();
});

function limpar() {
  Object.assign(categoria, { ...defaultCategoria });
}

async function salvar() {
  if (categoria.id) {
    await categoriasApi.atualizarCategoria(categoria);
  } else {
    await categoriasApi.adicionarCategoria(categoria);
  }
  categorias.value = await categoriasApi.buscarTodasAsCategorias();
  limpar();
}

function editar(categoria_para_editar) {
  Object.assign(categoria, categoria_para_editar);
}

async function excluir(id) {
  await categoriasApi.excluirCategoria(id);
  categorias.value = await categoriasApi.buscarTodasAsCategorias();
  limpar();
}
</script>

<template>
  <h1 class="tittle">Categoria</h1>
  <div class="form">
    <input class="input" type="text" v-model="categoria.descricao" placeholder="Descrição" />
    <button class="botao" @click="salvar">Salvar</button>
    <button class="botao" @click="limpar">Limpar</button>
  </div>

  <ul class="lista">
    <li class="item" v-for="categoria in categorias" :key="categoria.id">
      <span @click="editar(categoria)">
        ({{ categoria.id }}) - {{ categoria.descricao }} -
      </span>
      <button class="excluir" @click="excluir(categoria.id)">X</button>
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
  }

  .botao {
    margin: 5px;
    padding: 5px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
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