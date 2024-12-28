<template>
  <!-- the idea is to create 2 columns with reach repo having individual card-->
  <v-container fluid>
    <v-row>
      <template
        v-for="repo in repositories"
        :key="repo.name">
        <!-- https://vuetifyjs.com/en/components/cards/#combined -->
        <v-col
          md="4"
          sm="6"
          xs="12">
          <v-card
            class="mx-auto"
            prepend-icon="mdi-github"
            width="400">
            <template v-slot:title>
              <span class="font-weight-black">{{repo.name}}</span>
            </template>
            <v-card-subtitle>
              {{repo.created_at}} <v-spacer></v-spacer> {{repo.license}}
            </v-card-subtitle>
            <v-card-text class="bg-surface-light pt-4">
              {{repo.description}}
            </v-card-text>
            <v-card-actions>
              <h5>Languages: {{repo.languages}}</h5>
              <v-spacer></v-spacer>
              <v-btn
                text="Link"
                prepend-icon="mdi-link-variant"
                @click="openLink(repo.url)">
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>
<script setup>
import axios from "axios";
import {ref, reactive, onMounted } from 'vue';
import { useI18n } from "vue-i18n";
import {GITHUB_TOKEN} from "../../.env/dev.js";
//components
const { t } = useI18n();
const dataLoading = ref(true);
const repositories = reactive([]);

const BASE_URL = 'https://api.github.com';
//functions
const githubAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
  },
});

// Fetch repositories
async function getRepositories() {
  let data;
  try {
    const response = await githubAPI.get('/users/kszygenda/repos');
    data = await Promise.all(
      response.data.map(async (obj) => ({
        name: obj.name,
        url: obj.svn_url,
        created_at: dateFormating(obj.created_at),
        languages: languagesFormating(await getProjectLanguages(obj.languages_url)),
        license: obj.license || t('RepositoriesView.Repository_default_license_text'),
        description: obj.description,
      }))
    );
  } catch (err) {
    alert(t('RepositoriesView.Repositories_fetching_error') + err);
    return [];
  } finally {
    dataLoading.value = false;
  }
  return data;
}

// Fetch project languages
async function getProjectLanguages(url) {
  try {
    const response = await githubAPI.get(url);
    return response.data;
  } catch (err) {
    alert(t('RepositoriesView.Repository_languages_error') + err);
    return [];
  }
}
function dateFormating(date) {
  return date.split("T")[0];
}
function languagesFormating(git_langs) {
  return Object.keys(git_langs).toString();
}
function openLink(url) {
  window.open(url,'_blank');
}


onMounted(() => {
  getRepositories().then((data) => {
    for(let i = 0;i<data.length;++i){
      repositories.push(data[i]);
    }
    console.log(repositories);
  });
})
</script>



<style scoped>
.red-outline {
  border: 2px solid red;
  border-radius: 4px; /* Opcjonalne: zaokrąglenie rogów */
}
</style>
