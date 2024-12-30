// stores/counter.js
import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainStore', {
  state: () => {
    return { router_items: [] }
  },
  getters: {
    getRouterList: (state) => state.router_items,
  },
  actions: {
    replaceRouterList(list) {
      console.log('pina Store replaceRouterList',list);
      if (list.constructor == Array){
        this.router_items = list;
      }
      console.log('router_items',this.router_items);
    }
  },
});
