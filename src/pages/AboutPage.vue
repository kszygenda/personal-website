<template>
  <div class="text-center">
    <h1>{{tm('AboutView.title')}}</h1>
  </div>
  <div>
    {{tm('AboutView.info_text')}}
  </div>
  <div>
    <h2>{{tm('AboutView.technologies')}}</h2>
  </div>
  <!--FUTUREWORKS add animation to list -->
  <v-list>
    <v-list-item
      v-for="item in technologies_list"
      :key="item.technology"
      :prepend-icon="item.icon">
      <v-list-item-title>{{ item.technology }}</v-list-item-title>
      <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>


<script setup>
import {computed} from "vue";
import { useI18n } from "vue-i18n";
const { tm } = useI18n();
console.log(tm('AboutView.title'));
console.log(tm('AboutView.technologies_text'))
const technologies_list = computed(() => tm('AboutView.technologies_text'))

</script>

<style scoped lang="sass">
.text-center
  text-align: center
  margin-top: 20px

h1
  font-size: 2.5rem
  font-weight: bold
  margin-bottom: 10px

h2
  font-size: 1.8rem
  font-weight: 600
  margin-top: 30px
  text-align: center

div
  font-size: 1rem
  line-height: 1.5
  margin: 10px 20px

v-list
  margin: 20px auto
  max-width: 800px
  padding: 0

v-list-item
  margin-bottom: 10px
  border-radius: 10px
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)
  padding: 15px

v-list-item-title
  font-weight: 600

v-list-item-subtitle
  font-weight: 400
  font-size: 0.9rem
  margin-top: 5px

</style>
