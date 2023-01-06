import { defineStore } from 'pinia'
import axios from '../plugins/axios'
import type { PersonaModel, TramiteModel } from '~/interfaces/models'

export const useTramiteStore = defineStore('tramite', {
  state: () => {
    return {
      tramite: {} as TramiteModel,
      tramites: [] as TramiteModel[],
      personas: [] as PersonaModel[],
    }
  },
  getters: {
    filter_persona_by_num_doc: state => (numero_documento: string) => {
      return state.personas.filter(row => row.numero_documento.toLowerCase().includes(numero_documento.toLowerCase()))
    },
  },
  actions: {
    async persona_by_num_doc(numero_documento: string) {
      try {
        const params = {
          numero_documento,
        }
        const { data } = await axios.get('mesa_partes/get_estudiante_by_dni/', { params })
        this.personas = data
      }
      catch (e) {
        return null
      }
    },
  },
})
