<script setup>
import { ref, reactive, onMounted, computed} from 'vue';
import { useI18n } from 'vue-i18n';
const { tm } = useI18n();
const ExperienceObject = computed(() => tm('ExperienceView'));

// return object without icon and title
const cardTextObject = (obj) => {
  const obj_cp = { ...obj };
  delete obj_cp['title'];
  delete obj_cp['icon'];
  return obj_cp;
};
</script>

<template>
  <v-container fluid>
    <v-row
      justify="center">
      <v-col
        v-for="(value,key) in ExperienceObject">
        <v-card
          class="mx-auto"
          :prepend-icon="value.icon"
          :title="value.title">
        </v-card>
        <!-- TODO design and implement a card "insides"-->
        <template v-for="(value2,key2) in cardTextObject(value)">
          <div>
            {{ key2}}
          </div>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

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
</style>
