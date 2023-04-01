import { defineStore } from 'pinia'
import Cookies from 'universal-cookie'
import { info } from '@/api/auth'

const cookies = new Cookies()

export const authStore = defineStore('auth', {
  state: () => {
    return {
      info: {}
    }
  },
  actions: {
    isAuth() {
      // @ts-ignore
      return !!cookies.get('satoken') && this.info.id
    },
    resetToken() {
      cookies.remove('satoken')
    },
    getInfo() {
      return new Promise((resolve, reject) => {
        info().then((res: any) => {
          this.info = res.data
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
})
