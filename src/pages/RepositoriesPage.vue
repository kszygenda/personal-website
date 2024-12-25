<template>
  <!-- the idea is to create 2 columns with reach repo having individual card-->
  <v-container fluid>
    <h1>Repositories View</h1>
    <v-row>
      <v-col
        class="red-outline">
        <v-row
          class="red-outline"
          v-for="n in ((repositories?.length || 0)/2)"
          :key="n">
        </v-row>
      </v-col>
      <v-col
        class="red-outline">
        <v-row
          class="red-outline"
          v-for="n in (Math.ceil((repositories?.length || 0)/2))"
          :key="2*n+1">
        </v-row>
      </v-col>
    </v-row>
  </v-container>

</template>
<script setup>
import axios from "axios";
import {ref, reactive, onMounted } from 'vue';
import { useI18n } from "vue-i18n";

//components
const { tm } = useI18n();
const dataLoading = ref(true);
//TODO
const repositories = await getRepositories();
console.log('repositories',repositories);
//functions
async function getRepositories() {
  let data;
  axios.get("https://api.github.com/users/kszygenda/repos")
    .then((response) => {
      data = response.data.map((obj) => ({
        name: obj.name,
        url: obj.url,
        created_at : obj.created_at,
        languages: getProjectLanguages(obj.languages),
        license: obj.license | tm("Repository_default_license_text"),
        description: obj.description
      }));
    })
    .catch((err) => {
      alert(tm("Repositories_fetching_error") + err);
      return [];
    })
    .finally(() => {
      dataLoading.value = false;
    })
  return data;
}
async function getProjectLanguages(url) {
  axios.get(url)
    .then((response) => {
      return Object.keys(response.data);
    })
    .catch((err) => {
      alert(tm("Repository_languages_error") + err)
      return [];
    })

}
onMounted(() => {
  getRepositories();
})
</script>



<style scoped>
.red-outline {
  border: 2px solid red;
  border-radius: 4px; /* Opcjonalne: zaokrąglenie rogów */
}
</style>
