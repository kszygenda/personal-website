<template>
  <v-footer
    class="text-center d-flex flex-column">
    <div>
      <v-row
        align="center">
        {{ footer_text }}
        <v-btn
          v-for="btn in footer_buttons"
          :key="btn.name"
          :icon="btn.icon"
          class="mx-4"
          variant="text"
          @click="openLink(btn.url)">
        </v-btn>
        <v-spacer></v-spacer>
        Rafał Szygenda - {{new Date().getFullYear()}}
      </v-row>
    </div>
  </v-footer>
</template>

<script>
import {useI18n} from "vue-i18n";
import {computed} from "vue";
export default {
  setup(){
    const {t} = useI18n()
    const footer_text = computed(() => {
      return t('Footer.text');
    });
    const footer_buttons = [
      {
        name: "github",
        url: "https://github.com/kszygenda",
        icon: "mdi-github"
      },
      {
        name: "linkedin",
        url: "https://www.linkedin.com/in/kszygenda/",
        icon: "mdi-linkedin"
      },
      {
        name: "mail",
        url: "mailto:kszygenda12@gmail.com",
        icon: "mdi-email"
      },
    ];
    const openLink = (url) => {
      window.open(url,'_blank');
    }
    return {
      openLink,
      footer_text,
      footer_buttons
    };
  }
};
</script>

<style scoped lang="sass">

</style>
