<template>
  <div v-if="loaded">
    <component :is="webComponentName" v-bind="$attrs" />
  </div>
  <div v-else-if="isError">
    <component :is="fallbackUI" />
  </div>
  <div v-else>
    <component :is="loadingUI" />
  </div>
</template>

<script>
import LoadingUI from '../LoadingUI.vue'
import ErrorUI from '../ErrorUI.vue'

export default {
  name: 'LoadMFEWebComponent',
  data() {
    return {
      loaded: false,
      isError: false,
    }
  },
  components: {
    LoadingUI,
    ErrorUI,
  },
  props: {
    webComponentName: {
      type: String,
      required: true,
    },
    importFunction: {
      type: Function,
      required: true,
    },
    loadingUI: {
      type: String,
      required: false,
      default: 'LoadingUI',
    },
    fallbackUI: {
      type: String,
      required: false,
      default: 'ErrorUI',
    },
  },
  async mounted() {
    try {
      await this.importFunction()
      this.loaded = true
    } catch (error) {
      console.log(error)
      this.isError = true
    }
  }
}
</script>
