<script setup>
import { computed} from 'vue';
import { useI18n } from 'vue-i18n';
const { tm } = useI18n();
const ExperienceObject = computed(() => tm('ExperienceView'));

// copy of i18n json object for front v-for without title and icon
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
          <!-- TODO design and implement a card "insides"-->
          <template v-for="(value2,key2) in cardTextObject(value)">
            <v-list>
              <v-list-subheader>
                <h4>{{key2}}</h4><h4>{{value2.timestamp}}</h4>
              </v-list-subheader>
              <v-list-item
                v-for="listItem in value2.bullet_points">
                <template v-slot:prepend>
                  <v-icon icon="mdi-circle-small"></v-icon>
                </template>
                {{listItem}}
              </v-list-item>
            </v-list>
          </template>
        </v-card>
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
