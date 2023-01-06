import { defineStore } from 'pinia'
import axios from '../plugins/axios'
import type { TramiteModel } from '~/interfaces/models'

export const useTramiteStore = defineStore('tramite', {
  state: () => {
    return {
      tramite: {} as TramiteModel,
      tramites: [] as TramiteModel[],
    }
  },
  getters: {

  },
  actions: {

  },
})
