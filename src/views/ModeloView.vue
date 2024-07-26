<script setup>
import { ref, reactive, onMounted } from 'vue'
import ModelosApi from '@/api/modelos'
import CategoriasApi from '@/api/categorias'
import MarcasApi from '@/api/marcas'

const modelosApi = new ModelosApi()
const marcasApi = new MarcasApi()
const categoriasApi = new CategoriasApi()

const marcas = ref([])
const categorias = ref([])

const defaultModelo = { id: null, nome: '', categoria: '', marca: '' }
const modelos = ref([])
const modelo = reactive({ ...defaultModelo })

onMounted(async () => {
  modelos.value = await modelosApi.buscarTodosOsModelos()
  categorias.value = await categoriasApi.buscarTodasAsCategorias()
  marcas.value = await marcasApi.buscarTodasAsMarcas()
})

function limpar() {
  Object.assign(modelo, { ...defaultModelo })
}

async function salvar() {
  if (modelo.id) {
    await modelosApi.atualizarModelo(modelo)
  } else {
    await modelosApi.adicionarModelo(modelo)
  }
  modelos.value = await modelosApi.buscarTodosOsModelos()
  limpar()
}

function editar(modelo_para_editar) {
  Object.assign(modelo, modelo_para_editar)
}

async function excluir(id) {
  await modelosApi.excluirModelo(id)
  modelos.value = await modelosApi.buscarTodosOsModelos()
  limpar()
}
</script>

<template>
  <h1 class="tittle">Modelo</h1>
  <div class="form">
    <input class="input" type="text" v-model="modelo.nome" placeholder="Nome" />
    <select class="seleciona" v-model="modelo.categoria">
      <option value="" selected disabled>Categorias</option>
      <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
        {{ categoria.descricao }}
      </option>
    </select>
    <select class="seleciona" v-model="modelo.marca">
      <option value="" selected disabled>Marcas</option>
      <option v-for="marca in marcas" :key="marca.id" :value="marca.id">
        {{ marca.nome }}
      </option>
    </select>
    <button class="botao" @click="salvar">Salvar</button>
    <button class="botao" @click="limpar">Limpar</button>
  </div>
  <hr />
  <ul class="lista">
    <li class="item" v-for="modelo in modelos" :key="modelo.id">
      <span @click="editar(modelo)"> ({{ modelo.id }}) - {{ modelo.nome }} - </span>
      <button class="excluir" @click="excluir(modelo.id)">X</button>
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
  background-color: #4caf50;
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
.seleciona {
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
}
@media screen and (max-width: 768px) {
  .form {
    flex-direction: column;
    width: 30vw;
    margin: auto;
  }
}
</style>
