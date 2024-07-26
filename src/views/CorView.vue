<script setup>
import { ref, reactive, onMounted } from 'vue'
import CoresApi from '@/api/cores'
const coresApi = new CoresApi()

const defaultCor = { id: null, descricao: '' }
const cores = ref([])
const cor = reactive({ ...defaultCor })

onMounted(async () => {
  cores.value = await coresApi.buscarTodasAsCores()
})

function limpar() {
  Object.assign(cor, { ...defaultCor })
}

async function salvar() {
  if (cor.id) {
    await coresApi.atualizarCor(cor)
  } else {
    await coresApi.adicionarCor(cor)
  }
  cores.value = await coresApi.buscarTodasAsCores()
  limpar()
}

function editar(cor_para_editar) {
  Object.assign(cor, cor_para_editar)
}

async function excluir(id) {
  await coresApi.excluirCor(id)
  cores.value = await coresApi.buscarTodasAsCores()
  limpar()
}
</script>

<template>
  <h1 class="tittle">Cor</h1>
  <div class="form">
    <input class="input" type="text" v-model="cor.descricao" placeholder="Descrição" />
    <button class="botao" @click="salvar">Salvar</button>
    <button class="botao" @click="limpar">Limpar</button>
  </div>
  <ul class="lista">
    <li class="item" v-for="cor in cores" :key="cor.id">
      <span @click="editar(cor)"> ({{ cor.id }}) - {{ cor.descricao }} - </span>
      <button class="excluir" @click="excluir(cor.id)">X</button>
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
