/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins/index.js'

// Components
import App from '@/App.vue'

// Composables
import { createApp } from 'vue'
import { createI18n } from "vue-i18n";
import { createPinia } from "pinia";
import i18n_en from '@/multilanguage/i18n_en.json'
import i18n_pl from '@/multilanguage/i18n_pl.json'
import router from "@/router/index.js";

const i18n = createI18n({
  legacy: false, //https://vue-i18n.intlify.dev/guide/advanced/composition
  locale: "en",
  fallbackLocale: "en",
  messages: {en : i18n_en, pl: i18n_pl}
})
const pinia = createPinia();
const app = createApp(App);

registerPlugins(app);

app.use(i18n);
app.use(router);
app.use(pinia);
app.mount('#app');

