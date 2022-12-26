import { defineStore } from 'pinia'
import axios from '../plugins/axios'
import type { PermissionsModel, UserModel, UsuarioGrupo } from '~/interfaces/models'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: {} as UserModel,
      groups: [] as UsuarioGrupo[],
      permissions: [] as PermissionsModel[],
      persona_id: 0,
    }
  },
  getters: {

    get_groups: state => () => {
      return state.groups
    },

    get_full_name: (state) => {
      return `${state.user.first_name} ${state.user.last_name}`
    },

    get_short_name: (state) => {
      if (!state.user)
        return ''
      let first_name = state.user.first_name || ''
      let last_name = state.user.last_name || ''
      if (first_name)
        first_name = first_name.split(' ')[0]
      if (last_name)
        last_name = last_name.split(' ')[0]

      return `${first_name} ${last_name}`
    },

    get_char_full_name: (state) => {
      if (!state.user)
        return ''
      let first_name = state.user.first_name || ''
      let last_name = state.user.last_name || ''
      if (first_name)
        first_name = first_name.charAt(0)
      if (last_name)
        last_name = last_name.charAt(0)

      return `${first_name}${last_name}`
    },
  },
  actions: {
    async save_to_local_storage(payload: string) {
      return new Promise((resolve) => {
        setTimeout(() => {
          localStorage.setItem('userpgtoken', payload)
          resolve(true)
        }, 500)
      },
      )
    },

    async login(email: string, password: string) {
      try {
        const { status, data } = await axios.post('/accounts/login/', {
          email,
          password,
          cliente: import.meta.env.VITE_APP_CLIENTE_KEY,
        })
        const { token, user, groups, permissions, persona_id } = data
        await this.save_to_local_storage(token)
        this.user = user
        this.groups = groups
        this.permissions = permissions
        this.persona_id = persona_id
        return { status, data }
      }
      catch (e: any) {
        return { status: e.response.status, data: e.response.data }
      }
    },

    logout() {
      localStorage.removeItem('userpgtoken')
      this.user = {} as UserModel
      this.groups = []
      this.permissions = []
    },

    check_credentials() {
      const token = localStorage.getItem('userpgtoken')
      return !!token
    },

    async get_user_data_by_token() {
      try {
        const { data } = await axios.post('/accounts/get_user_data_by_token/', {
          cliente: import.meta.env.VITE_APP_CLIENTE_KEY,
        })
        const { user, groups, permissions, persona_id } = data
        this.user = user
        this.groups = groups
        this.permissions = permissions
        this.persona_id = persona_id
        return data
      }
      catch (e) {
        return null
      }
    },
  },
})
