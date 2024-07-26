<script setup>
import { ref, reactive, onMounted } from 'vue'
import MarcasApi from '@/api/marcas'
const marcasApi = new MarcasApi()

const defaultMarca = { id: null, nome: '', nacionalidade: '' }
const marcas = ref([])
const marca = reactive({ ...defaultMarca })

onMounted(async () => {
  marcas.value = await marcasApi.buscarTodasAsMarcas()
})

function limpar() {
  Object.assign(marca, { ...defaultMarca })
}

async function salvar() {
  if (marca.id) {
    await marcasApi.atualizarMarca(marca)
  } else {
    await marcasApi.adicionarMarca(marca)
  }
  marcas.value = await marcasApi.buscarTodasAsMarcas()
  limpar()
}

function editar(marca_para_editar) {
  Object.assign(marca, marca_para_editar)
}

async function excluir(id) {
  await marcasApi.excluirMarca(id)
  marcas.value = await marcasApi.buscarTodasAsMarcas()
  limpar()
}
</script>

<template>
  <h1 class="tittle">Marca</h1>
  <div class="form">
    <input class="input" type="text" v-model="marca.nome" placeholder="Descrição" />
    <input class="input" type="text" v-model="marca.nacionalidade" placeholder="Nacionalidade" />
    <button class="botao" @click="salvar">Salvar</button>
    <button class="botao" @click="limpar">Limpar</button>
  </div>
  <ul class="lista">
    <li class="item" v-for="marca in marcas" :key="marca.id">
      <span @click="editar(marca)">
        ({{ marca.id }}) - {{ marca.nome }} - {{ marca.nacionalidade }} -
      </span>
      <button class="excluir" @click="excluir(marca.id)">X</button>
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
@media screen and (max-width: 768px) {
  .form {
    flex-direction: column;
    width: 30vw;
    margin: auto;
  }
}
</style>
