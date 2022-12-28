<script setup lang="ts">
import { createToast } from 'mosha-vue-toastify'
import { useUserStore } from '~/store/user'

const email = ref('')
const password = ref('')
const userStore = useUserStore()
const router = useRouter()

const login = async () => {
  const result = await userStore.login(email.value, password.value)
  if (result.status === 200) {
    createToast('Bienvenido', {
      type: 'success',
      hideProgressBar: true,
    })

    router.push('/inicio')
    return
  }
  createToast(result.data, {
    type: 'danger',
    hideProgressBar: true,
  })
}

onMounted(() => {
  userStore.logout()
})
</script>

<template>
  <!-- template -->
  <div class="min-h-screen flex">
    <div class="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img class="h-16 w-auto " src="/src/media/img/epg-2022.png" alt="logo-epg">
          <h2 class="mt-6 text-2xl font-semibold text-primary-700">
            MESA DE PARTES - VIRTUAL
          </h2>
          <p class="mt-2 text-sm text-gray-600 uppercase">
            Mesa de Partes - EPG
          </p>
        </div>
        <div class="mt-6">
          <form class="space-y-6" @submit.prevent="login">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                Usuario
              </label>
              <div class="mt-1">
                <input
                  id="email" v-model="email" name="email" type="email" autocomplete="email" required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 shadow placeholder-gray-400 focus:outline-none sm:text-sm"
                >
              </div>
            </div>

            <div class="space-y-1">
              <label for="password" class="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div class="mt-1">
                <input
                  id="password" v-model="password" name="password" type="password" autocomplete="current-password"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
                >
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me" name="remember-me" type="checkbox"
                  class="h-4 w-4 text-primary-500 focus:ring-cyan-900 border-gray-300 rounded"
                >
                <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Recuérdame </label>
              </div>
              <div class="text-sm">
                <a href="#" target="_blank" class="font-medium text-primary-500 hover:text-cyan-900">Descargar Manual</a>
              </div>
              <!-- <div class="text-sm">
                <a href="#" class="font-medium text-primary-500 hover:text-cyan-900"> ¿Olvidaste tu contraseña? </a>
              </div> -->
            </div>
            <div>
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-cyan-900 focus:outline-none"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="hidden lg:block relative w-0 flex-1 ">
      <img
        class="absolute   w-full h-full" src="/src/media/img/epg-mp.svg"
        alt="Puerta principal"
      >
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: empty
</route>
