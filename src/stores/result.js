import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useResultStore = defineStore('result', () => {
  // state
  const maxIndex= ref(0);

  return{
    maxIndex
  }


})
