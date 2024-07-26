<script setup>
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>
<template>
  <header>
    <h1>Garagem</h1>
    <nav>
      <router-link :to="{ name: 'home' }">Home</router-link> |
      <router-link to="/acessorios">Acessórios</router-link> |
      <router-link to="/categorias">Categorias</router-link> |
      <router-link to="/cores">Cores</router-link> |
      <router-link to="/marcas">Marcas</router-link> |
      <router-link to="/modelos">Modelos</router-link> |
      <router-link to="/veiculos">Veículos</router-link> |
      <div v-if="authStore.loggedIn">
        <router-link  to="/logout">Logout</router-link> |
        {{ authStore.user.email }}
      </div>
      <router-link v-else to="/login">Login</router-link>
    </nav>
  </header>
</template>
<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 5px;
  text-align: center;
}
header a {
  color: #fff;
  text-decoration: none;
}
header a:hover {
  text-decoration: underline;
}
nav {
  display: flex;
  gap: 5px;
  margin-right: 40px;
}
h1{
  margin-left: 20px;
}
</style>