<template>
  <v-card>
    <v-layout>
      <v-app-bar
        color="primary"
        prominent
      >
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>{{tm('HomeView.toolbar_title')}}</v-toolbar-title>

        <v-spacer></v-spacer>
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
          :prepend-icon="item.icon"
          @click="itemClicked(item)">
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>

          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 100vh;">

      </v-main>
    </v-layout>
  </v-card>

</template>

<script setup>

</script>
<style scoped lang="sass">

</style>
