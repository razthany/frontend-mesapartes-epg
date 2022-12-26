import { defineStore } from 'pinia'
import axios from '~/plugins/axios'

export const useUtilsStore = defineStore('utils', {
  state: () => {
    return {
    }
  },
  getters: {
    get_media_url: () => (media: string) => {
      const url = import.meta.env.DEV ? import.meta.env.VITE_APP_URL_LOCAL : import.meta.env.VITE_APP_URL_PRODUCCION
      return url.substring(0, url.length - 1) + media
    },
  },
  actions: {
  },
})
