<script setup lang="ts">
import { createToast } from 'mosha-vue-toastify'
import {
  Combobox, ComboboxButton, ComboboxInput, ComboboxLabel, ComboboxOption, ComboboxOptions,
} from '@headlessui/vue'
import type { PersonaModel } from '~/interfaces/models'
import { useUserStore } from '~/store/user'
import { useTramiteStore } from '~/store/tramite'

const query = ref('')
const userStore = useUserStore()
const tramiteStore = useTramiteStore()
const personaSelected = ref({} as PersonaModel)
onMounted(() => {
  tramiteStore.persona_by_num_doc('7313')
  console.log('asd')
})
</script>

<template>
  <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Expediente
          </h3>
          <p class="mt-1 text-sm text-gray-600">
            -
          </p>
        </div>
      </div>
      <div class="mt-5 md:col-span-2 md:mt-0">
        <form action="#" method="POST">
          <div class="overflow-hidden shadow sm:rounded-md">
            <div class="bg-white px-4 py-5 sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 ">
                  <label for="first-name" class="block text-sm font-medium text-gray-700">Descripción:</label>
                  <textarea class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="hidden sm:block" aria-hidden="true">
    <div class="py-5">
      <div class="border-t border-gray-200" />
    </div>
  </div>

  <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Tramite
          </h3>
          <p class="mt-1 text-sm text-gray-600">
            -
          </p>
        </div>
      </div>
      <div class="mt-5 md:col-span-2 md:mt-0">
        <form action="#" method="POST">
          <div class="overflow-hidden shadow sm:rounded-md">
            <div class="bg-white px-4 py-5 sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-6">
                  <label for="country" class="block text-sm font-medium text-gray-700">Tipo Usuario</label>
                  <select id="country" name="country" autocomplete="country-name" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                    <option>INTERNO (Alumnos, Docentes, Administrativos)</option>
                    <option>EXTERNO </option>
                  </select>
                </div>

                <div class="col-span-6 sm:col-span-6">
                  <label for="last-name" class="block text-sm font-medium text-gray-700">Usuario</label>
                  <input id="last-name" type="text" name="last-name" autocomplete="family-name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                </div>
                <Combobox v-model="personaSelected" as="div" class="col-span-6">
                  <ComboboxLabel class="block text-sm font-medium text-gray-700">
                    Usuario
                  </ComboboxLabel>
                  <div class="relative mt-1">
                    <ComboboxInput
                      class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-info focus:outline-none focus:ring-1 focus:ring-info sm:text-sm"
                      autocomplete="off" :display-value="(persona: any) => `${persona.nombres} ${persona.apellido_paterno} ${persona.apellido_materno}` || ''"
                      @change="query = $event.target.value"
                    />
                    <ComboboxButton
                      class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
                    >
                      <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </ComboboxButton>

                    <ComboboxOptions
                      v-if="tramiteStore.personas.length > 0"
                      class="absolute z-10 mt-1 max-h-28 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    >
                      <ComboboxOption
                        v-for="persona in tramiteStore.persona_by_num_doc(query)"
                        :key="persona.id" v-slot="{ active, selected }" :value="persona" as="template"
                      >
                        <li
                          class="relative cursor-default select-none py-2 pl-3 pr-9" :class="[active ? 'bg-info text-white' : 'text-gray-900']"
                        >
                          <div class="flex">
                            <span class="truncate" :class="[selected && 'font-semibold']">{{ `${persona.nombres} ${persona.apellido_paterno} ${persona.apellido_materno}` }}</span>
                            <span
                              class="ml-2 truncate text-gray-500" :class="[active ? 'text-indigo-200' : 'text-gray-500']"
                            >{{
                              persona.numero_documento
                            }}</span>
                          </div>

                          <span
                            v-if="selected"
                            class="absolute inset-y-0 right-0 flex items-center pr-4" :class="[active ? 'text-white' : 'text-info']"
                          >
                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                          </span>
                        </li>
                      </ComboboxOption>
                    </ComboboxOptions>
                  </div>
                </Combobox>
                <div class="col-span-6 sm:col-span-2">
                  <label for="first-name" class="block text-sm font-medium text-gray-700">N° Documento</label>
                  <input id="first-name" type="text" name="first-name" autocomplete="given-name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                </div>

                <div class="col-span-6 sm:col-span-4">
                  <label for="last-name" class="block text-sm font-medium text-gray-700">Usuario</label>
                  <input id="last-name" type="text" name="last-name" autocomplete="family-name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                </div>
                <div class="col-span-6 sm:col-span-6">
                  <label for="email-address" class="block text-sm font-medium text-gray-700">Tipo Tramite</label>
                  <input id="email-address" type="text" name="email-address" autocomplete="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                </div>
                <div class="col-span-6 sm:col-span-6">
                  <label for="email-address" class="block text-sm font-medium text-gray-700">Asunto</label>
                  <textarea id="asunto" type="text" name="asunto" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="country" class="block text-sm font-medium text-gray-700">Sede</label>
                  <select id="country" name="country" autocomplete="country-name" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="street-address" class="block text-sm font-medium text-gray-700">Street address</label>
                  <input id="street-address" type="text" name="street-address" autocomplete="street-address" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="hidden sm:block" aria-hidden="true">
    <div class="py-5">
      <div class="border-t border-gray-200" />
    </div>
  </div>

  <div class="md:grid md:grid-cols-3 md:gap-6">
    <div class="md:col-span-1">
      <div class="px-4 sm:px-0">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Requisitos de Tramite
        </h3>
        <p class="mt-1 text-sm text-gray-600">
          -
        </p>
      </div>
    </div>
    <div class="mt-5 md:col-span-2 md:mt-0">
      <form action="#" method="POST">
        <div class="shadow sm:overflow-hidden sm:rounded-md">
          <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Requisitos
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul role="list" class="divide-y divide-gray-200 rounded-md border border-gray-200">
                  <li class="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                    <div class="flex w-0 flex-1 items-center">
                      <PaperClipIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                      <span class="ml-2 w-0 flex-1 truncate">DNI</span>
                    </div>
                  </li>
                  <li class="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                    <div class="flex w-0 flex-1 items-center">
                      <PaperClipIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                      <span class="ml-2 w-0 flex-1 truncate">Grado academico</span>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button type="submit" class=" mx-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Save
              </button>
              <button type="submit" class="mx-4 inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                return
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
