<template>
  <v-col>
    <v-container fluid>
      <div v-if="dataLoading" class="text-center">
        <v-progress-circular
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
      <v-row v-else>
        <template
          v-for="repo in repositories"
          :key="repo.name">
          <!-- https://vuetifyjs.com/en/components/cards/#combined -->
          <v-col
            md="4"
            sm="6"
            xs="12">
            <v-card
              variant="outlined"
              class="mx-auto"
              prepend-icon="mdi-github">
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
  </v-col>
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
const githubAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
  },
});

//functions
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
        license: obj.license?.name || t('RepositoriesView.Repository_default_license_text'),
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
  });
})
</script>



<style scoped>
</style>
