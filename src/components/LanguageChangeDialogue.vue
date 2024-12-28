<template>
  <v-dialog v-model="isActive" max-width="500">
    <v-card>
      <v-card-title>
        {{ tm('LanguangeChangeDialogue.title') }}
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item
            v-for="(value,key) in languages"
            :key="key"
            :title="value"
            @click="() => {locale = key}">
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          @click="closeDialog"
          variant="outlined"
          color="primary">
          {{ tm('LanguangeChangeDialogue.close_dialog') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref, computed } from 'vue'
import { useI18n } from "vue-i18n";

export default {
  setup(){
    const { tm, locale } = useI18n();
    const isActive = ref(false);
    const closeDialog = () => {
      isActive.value = false;
    };
    const languages = computed(() => {
      return {...tm('LanguangeChangeDialogue.languages')};
    });
    return {
      isActive,
      languages,
      closeDialog,
      tm,
      locale,
    };
  }
};
</script>

<style scoped lang="sass">

</style>
