import { defineStore } from 'pinia'

export const usePolicyModalStore = defineStore('policyModal', {
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
