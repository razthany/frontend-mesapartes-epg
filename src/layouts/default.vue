<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

import {
  BellIcon,
  MenuAlt2Icon,
  XIcon,
} from '@heroicons/vue/outline'

import {
  ExclamationIcon,
  SearchIcon,
} from '@heroicons/vue/solid'

import { useUserStore } from '~/store/user'
import { useUtilsStore } from '~/store/utils'
import { useMenuStore } from '~/store/menu'

const userStore = useUserStore()
const menuStore = useMenuStore()

const navigation = ref([] as any[])

const userNavigation = [
  { name: 'Perfil', href: 'perfil' },
  { name: 'Cerrar sesión', href: '/' },
]

const sidebarOpen = ref(false)
const router = useRouter()
const utilsStore = useUtilsStore()

onMounted(async () => {
  navigation.value = menuStore.get_menu_for_profile
})

const to = (item: any) => {
  const path = item.href
  navigation.value.forEach((nav) => {
    nav.current = false
  })
  item.current = true
  router.push(path)
}
</script>

<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-40 md:hidden" @close="sidebarOpen = false">
        <TransitionChild
          as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
          enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 flex z-40">
          <TransitionChild
            as="template" enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full" enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
              <TransitionChild
                as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0"
              >
                <div class="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="flex-shrink-0 flex items-center px-4 bg-white">
                <img class="h-8 w-auto" src="/src/media/img/epg-2022.png" alt="logo-epg">
              </div>
              <div class="mt-5 flex-1 h-0 overflow-y-auto">
                <nav class="px-2 space-y-1">
                  <a
                    v-for="item in navigation" :key="item.name"
                    class="group flex items-center px-2 py-2 text-base font-medium rounded-md"
                    :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white']"
                    @click="to(item)"
                  >
                    <component
                      :is="item.icon" class="mr-4 flex-shrink-0 h-6 w-6"
                      :class="[item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300']"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </a>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
          <div class="flex-shrink-0 w-14" aria-hidden="true">
            <!-- Dummy element to force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex-1 flex flex-col min-h-0 bg-gray-800">
        <div class="flex items-center h-16 flex-shrink-0 px-4 bg-white">
          <img class="h-10 w-auto" src="/src/media/img/epg-2022.png" alt="logo-epg">
        </div>
        <div class="flex-1 flex flex-col overflow-y-auto">
          <nav class="flex-1 px-2 py-4 space-y-1">
            <a
              v-for="item in navigation" :key="item.name"
              class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white']"
              @click="to(item)"
            >
              <component
                :is="item.icon" class="mr-3 flex-shrink-0 h-6 w-6"
                :class="[item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300']"
                aria-hidden="true"
              />
              {{ item.name }}
            </a>
          </nav>
        </div>
      </div>
    </div>

    <div class="md:pl-64 flex flex-col">
      <div class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <button
          type="button"
          class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <MenuAlt2Icon class="h-6 w-6" aria-hidden="true" />
        </button>
        <div class="flex-1 px-4 flex justify-between">
          <div class="flex-1 flex">
            <form class="w-full flex md:ml-0" action="#" method="GET">
              <label for="search-field" class="sr-only">Buscar</label>
              <div class="relative w-full text-gray-400 focus-within:text-gray-600">
                <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                  <SearchIcon class="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  id="search-field"
                  class="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                  placeholder="Buscar" type="search" name="search"
                >
              </div>
            </form>
          </div>
          <div class="ml-4 flex items-center md:ml-6">
            <button
              type="button"
              class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Profile dropdown -->
            <Menu as="div" class="ml-3 relative">
              <div>
                <MenuButton
                  class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    src="https://th.bing.com/th/id/R.e62421c9ba5aeb764163aaccd64a9583?rik=DzXjlnhTgV5CvA&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_210318.png&ehk=952QCsChZS0znBch2iju8Vc%2fS2aIXvqX%2f0zrwkjJ3GA%3d&risl=&pid=ImgRaw&r=0"
                    alt="img"
                  >
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                    <a
                      class="block px-4 py-2 text-sm text-gray-700" :class="[active ? 'bg-gray-100' : '']"
                      @click="to(item)"
                    >{{ item.name }}</a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <main class="flex-1">
        <div class="py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <!-- Replace with your content -->
            <main>
              <router-view />
            </main>
            <!-- /End replace -->
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
