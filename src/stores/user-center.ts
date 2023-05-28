import { defineStore } from 'pinia'

export const userCenterStore = defineStore('user-center', {
  state: () => {
    return {
      userCenterRef: null as any,
    }
  },
  actions: {
    openUserCenter() {
      this.userCenterRef && this.userCenterRef.show()
    },
  }
})
