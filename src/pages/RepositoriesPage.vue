<script setup>
import axios from "axios";
import {ref, reactive, onMounted } from 'vue';

const dataLoading = ref(true);
async function getRepositories() {
  axios.get("https://api.github.com/users/kszygenda/repos")
    .then((response) => {
      const data = response.data;

    })
    .catch((err) => {

    })
    .finally(() => {
      dataLoading.value = false;
    })
}
onMounted(() => {
  getRepositories();
})
</script>

<template>
  <h1>Repositories View</h1>
</template>

<style scoped lang="sass">

</style>
