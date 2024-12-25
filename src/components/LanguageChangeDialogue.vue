<template>
  <v-dialog v-model="isActive" max-width="500">
    <v-card>
      <v-card-title>
        Dialog Title
      </v-card-title>
      <v-card-text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="closeDialog">Close Dialog</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ref from 'vue'
export default {
  setup(){
    const isActive = ref(false);
    const closeDialog = () => {
      isActive.value = false;
    };
    return {
      isActive,
      closeDialog
    };
  }
};
</script>

<style scoped lang="sass">

</style>
