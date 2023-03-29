import { defineStore } from 'pinia'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const authStore = defineStore('auth', {
  actions: {
    isAuth() {
      return !!cookies.get('satoken')
    },
    resetToken() {
      cookies.remove('satoken')
    }
  }
})