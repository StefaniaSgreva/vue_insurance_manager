import { defineStore } from 'pinia'

export const useClientModalStore = defineStore('clientModal', {
  state: () => ({
    isOpen: false,
  }),
  actions: {
    openModal() {
      this.isOpen = true
    },
    closeModal() {
      this.isOpen = false
    },
  },
})
