/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createI18n } from "vue-i18n";
import i18n_en from 'multilanguage/i18n_en.json'
import i18n_pl from 'multilanguage/i18n_pl.json'

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: {i18n_en,i18n_pl}
})
const app = createApp(App)

registerPlugins(app)

app.use(i18n)
app.mount('#app')

