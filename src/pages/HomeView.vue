<template>
  <v-card>
    <v-layout>
      <v-app-bar
        color="primary"
        prominent
      >
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>My files</v-toolbar-title>

        <v-spacer></v-spacer>

        <template v-if="$vuetify.display.mdAndUp">
          <v-btn icon="mdi-magnify" variant="text"></v-btn>

          <v-btn icon="mdi-filter" variant="text"></v-btn>
        </template>

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
import { useI18n } from 'vue-i18n'
// web navigation,state, multilanguage support
const { t } = useI18n();
//TODO get t("Router") as object.
const router = useRouter();
const translation = t('Router', { returnObjects: true });
console.log(translation);
// components elements
const drawer = ref(false);

const drawerItems = reactive([
  {title: "app_bar1", route: ""},
  {title: "app_bar2", route: ""}
]);


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
