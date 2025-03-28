<template>
  <v-app>
    <v-card>
      <v-layout>
        <v-app-bar
          color="teal-darken-1"
          prominent>
          <v-app-bar-nav-icon
            variant="text"
            @click.stop="drawer = !drawer">
          </v-app-bar-nav-icon>
          <v-toolbar-title>{{tm('HomeView.toolbar_title')}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip location="bottom">{{tm('HomeView.theme_tooltip')}}
            <template v-slot:activator="{props}">
              <v-btn
                :icon="theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
                @click="toggleTheme"
                v-bind="props">
              </v-btn>
            </template>
          </v-tooltip>
          <v-tooltip location="bottom">{{tm('HomeView.language_tooltip')}}
            <template v-slot:activator="{props}">
              <v-btn
                icon="mdi-translate"
                @click="openDialog"
                v-bind="props">
              </v-btn>
            </template>
          </v-tooltip>
          <languageChangeDialogue ref="langDialog"/>
        </v-app-bar>
        <v-navigation-drawer
          v-model="drawer"
          :location="$vuetify.display.mobile ? 'bottom' : undefined"
          temporary>
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
        <v-main style="height: 100vh;">
          <router-view/>
          <v-footer
            app
            class="footer"
            style="flex-shrink: 0;">
            <footerComponent/>
          </v-footer>

        </v-main>
      </v-layout>
    </v-card>
  </v-app>
</template>

<script setup>
import { ref, reactive, onMounted, computed} from 'vue';
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n';
import { useTheme } from 'vuetify'
import languageChangeDialogue from "@/components/LanguageChangeDialogue.vue";
import {useMainStore} from "@/stores/mainStore.js";
import footerComponent from "@/components/Footer.vue";
// web navigation,state, multilanguage support, theme changing
const { tm } = useI18n();
const router = useRouter();
const theme = useTheme();
const mainStore = useMainStore();
// components elements
const langDialog = ref(false);
const openDialog = () => {
  langDialog.value.isActive = true;
};
const drawer = ref(false);
const iconMapping = {
  "Home": "mdi-home",
  "Experience": "mdi-briefcase",
  "About": "mdi-information",
  "Hobbies": "mdi-gamepad-variant",
  "Repositories": "mdi-github"
}
const drawerItems = computed( () => {
  return reactive(Object.entries(tm('Router')).map((arr) => (
    { title: arr[1], route: arr[0], icon: iconMapping[arr[0]] }
  )))
});
mainStore.replaceRouterList(drawerItems.value);

// Functions
function itemClicked(item) {
  router.push('/'+item.route);
}
function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
// Lifecycle hook
onMounted(() => {
  console.log('Component mounted');
});
</script>
<style scoped>
.footer {
  position: sticky;
  bottom: 0;
  width: 100%;
  z-index: 1000;
}
</style>


