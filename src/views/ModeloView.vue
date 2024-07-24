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
  <h1>Modelo</h1>
  <hr />
  <div class="form">
    <input type="text" v-model="modelo.nome" placeholder="Nome" />
    <select v-model="modelo.categoria">
      <option value="" selected disabled>Categorias</option>
      <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
        {{ categoria.descricao }}
      </option>
    </select>
    <select v-model="modelo.marca">
      <option value="" selected disabled>Marcas</option>
      <option v-for="marca in marcas" :key="marca.id" :value="marca.id">
        {{ marca.nome }}
      </option>
    </select>
    <button @click="salvar">Salvar</button>
    <button @click="limpar">Limpar</button>
  </div>
  <hr />
  <ul>
    <li v-for="modelo in modelos" :key="modelo.id">
      <span @click="editar(modelo)"> ({{ modelo.id }}) - {{ modelo.nome }} - </span>
      <button @click="excluir(modelo.id)">X</button>
    </li>
  </ul>
</template>

<style></style>
