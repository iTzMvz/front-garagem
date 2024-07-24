<script setup>
import { ref, reactive, onMounted } from "vue";
import VeiculosApi from "@/api/veiculos";
import ModelosApi from "@/api/modelos";
import CoresApi from "@/api/cores";
import AcessoriosApi from "@/api/acessorios";


const veiculosApi = new VeiculosApi();
const modelosApi = new ModelosApi();
const coresApi = new CoresApi();
const acessoriosApi = new AcessoriosApi();

const modelos = ref([]);
const cores = ref([]);
const acessorios = ref([]);

const defaultVeiculo = { id: null, preco: null, ano: null, modelo: "", cor: "", acessorios: []};
const veiculos = ref([]);
const veiculo = reactive({ ...defaultVeiculo });

onMounted(async () => {
    veiculos.value = await veiculosApi.buscarTodosOsVeiculos();
    modelos.value = await modelosApi.buscarTodosOsModelos();
    cores.value = await coresApi.buscarTodasAsCores();
    acessorios.value = await acessoriosApi.buscarTodosOsAcessorios();
});

function limpar() {
  Object.assign(veiculo, { ...defaultVeiculo});
}

async function salvar() {
  if (veiculo.id) {
    await veiculosApi.atualizarVeiculo(veiculo);
  } else {
    await veiculosApi.adicionarVeiculo(veiculo);
  }
  veiculos.value = await veiculosApi.buscarTodosOsVeiculos();
  limpar();
}

function editar(veiculo_para_editar) {
  Object.assign(veiculo, veiculo_para_editar);
}

async function excluir(id) {
  await veiculosApi.excluirVeiculo(id);
  veiculos.value = await veiculosApi.buscarTodosOsVeiculos();
  limpar();
}
</script>

<template>
  <h1>Veículo</h1>
  <hr />
  <div class="form">
    <input type="number" v-model="veiculo.ano" placeholder="Ano">
    <input type="number" v-model="veiculo.preco" placeholder="Preço">
    <select v-model="veiculo.modelo">
        <option value="" selected disabled>Modelo</option>
        <option v-for="modelo in modelos" :key="modelo.id" :value="modelo.id">{{ modelo.nome }}</option>
    </select>
    <select v-model="veiculo.cor">
        <option value="" selected disabled>Cor</option>
        <option v-for="cor in cores" :key="cor.id" :value="cor.id">{{ cor.descricao }}</option>
    </select>
    <select v-model="veiculo.acessorios" multiple>
        <option value="" selected disabled>Acessorios</option>
        <option v-for="acessorio in acessorios" :key="acessorio.id" :value="acessorio.id">{{ acessorio.descricao }}</option>
    </select>
    <button @click="salvar">Salvar</button>
    <button @click="limpar">Limpar</button>
  </div>
  <hr />
  <ul>
    <li v-for="veiculo in veiculos" :key="veiculo.id">
      <span @click="editar(veiculo)">
        ({{ veiculo.id }}) - {{ veiculo.nome }} -
      </span>
      <button @click="excluir(veiculo.id)">X</button>
    </li>
  </ul>
</template>

<style></style>
