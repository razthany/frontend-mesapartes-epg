import { defineStore } from 'pinia'
import menu from '../data/menu.json'
import { useUserStore } from './user'
import type { MenuModel } from '~/interfaces/models'

export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      menuData: menu as unknown as MenuModel[],
    }
  },

  getters: {
    get_menu_for_profile: (state) => {
      const data: any[] = []
      const groups = useUserStore().get_groups()
      state.menuData.forEach((row) => {
        const profiles = row.profiles
        const group = groups.find(item => profiles.includes(item.name))
        if (group) {
          const exist = data.find(item => item.name === group.name)
          if (!exist)
            data.push(row)
        }
      })
      return data
    },
  },

  actions: {

  },
})
