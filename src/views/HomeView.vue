<script setup>
import { onMounted } from 'vue';
import { PassageUser } from '@passageidentity/passage-elements/passage-user';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const getUserInfo = async () => {
  try {
    const authToken = localStorage.getItem('psg_auth_token');
    const passageUser = new PassageUser(authToken);
    const user = await passageUser.userInfo(authToken);
    if (user) {
      await authStore.setToken(authToken);
    } else {
      authStore.unsetToken();
    }
  } catch (error) {
    authStore.unsetToken();
  }
};

onMounted(() => {
  getUserInfo();
});
</script>

<template>
 <h1>Garagem</h1>
 <div>Bem Vindos ao sistema de Garagem</div>
</template>

<style scoped>
h1{
  text-align: center;
  margin: 20px 0;
}
div{
  background-color: #f0f0f0;
  color: #333;
  padding: 20px;
  border-radius: 5px;
  margin: 20px 0;
  text-align: center;
  font-size: 1.5em;
}
</style>