<template>
  <div class="HomePage">
    <div class="text-center">
      <h1>{{ tm('HomeView.welcome') }}</h1>
      <h4>{{tm('HomeView.welcome_text')}}</h4>
      <p>{{tm("HomeView.options_text")}}</p>
    </div>
    <v-container fluid>
      <v-row justify="center">
        <template
          v-for="(item,index) in router_items"
          :key="index">
          <v-col
            cols="12"
            sm="5">
            <v-card
              :prepend-icon="item.icon"
              color="teal-lighten-1">
              <v-card-title>{{item.title}}</v-card-title>
              <v-card-text>
                {{item.description}}
              </v-card-text>
              <v-card-actions>
                <v-btn
                  :text="tm('HomeView.view_card_button_text')"
                  @click="goToPage(item.route)"
                  color="teal-darken-2"
                  variant="elevated">
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import {computed} from 'vue';
import {useI18n} from "vue-i18n";
import {useMainStore} from "@/stores/mainStore.js";
import {useRouter} from "vue-router";
const { tm } = useI18n();
const mainStore = useMainStore();
const router_items = computed(() => extendItems(mainStore.getRouterList));
const router = useRouter();

function extendItems(router_obj) {
  console.log(router_obj);
  const item_description = tm('HomeView.Views_card_descriptions');
  const router_items = router_obj.map(item => ({
    ...item,
    description: item_description[item.title],
  }));
  return router_items;
}

function goToPage(route) {
  router.push('/' + route)
}
</script>
<style scoped lang="sass">
.text-center
  text-align: center
  margin-top: 20px

h1
  font-size: 2.5rem
  font-weight: bold
  margin-bottom: 10px
  font-family: Georgia

h4
  font-size: 1.4rem
  font-weight: 300
  margin-top: 30px
  text-align: center
  font-family: Georgia

div
  font-size: 1rem
  line-height: 1.5
  margin: 10px 20px

p
  font-size: 1.2rem
  font-weight: 200
  margin-top: 15px
  text-align: center
  font-family: Georgia

</style>
