<template>
  <v-card>
    <v-layout>
      <v-app-bar
        color="primary"
        prominent
      >
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>{{tm('HomeView.toolbar_title')}}</v-toolbar-title>

        <v-spacer></v-spacer>
        <LanguageChangeDialogue/>
        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        temporary
      >
        <v-list
          :items="drawerItems">
          <v-list-item
          v-for="item in drawerItems"
          :key="item.title"
          :prepend-icon="item.icon"
          @click="itemClicked(item)">
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>

          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 500px;">

      </v-main>
    </v-layout>
  </v-card>

</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n';
import LanguageChangeDialogue from "@/components/LanguageChangeDialogue.vue";
// web navigation,state, multilanguage support
const { tm } = useI18n();
const router = useRouter();
// components elements
const drawer = ref(false);
const iconMapping = {
  "Home": "mdi-home",
  "Experience": "mdi-briefcase",
  "About": "mdi-information",
  "Hobbies": "mdi-gamepad-variant",
  "Repositories": "mdi-github"
}
const drawerItems = reactive(Object.entries(tm('Router')).map((arr) => (
  { title: arr[1], route: arr[0], icon: iconMapping[arr[0]] }
)));


// Functions
const fetchData = async () => {
  try {
    const response = await axios.get('url...');
    // console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
function itemClicked(item) {
  console.log(item);
}

// Lifecycle hook
onMounted(() => {
  console.log('Component mounted');
  fetchData();
});
</script>
<style scoped lang="sass">

</style>
