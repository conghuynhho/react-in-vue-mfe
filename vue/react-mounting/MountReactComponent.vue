<template>
  <div>
    <div ref="reactRoot" />
    <div v-if="isError">
      <component :is="fallbackUI" />
    </div>
    <div v-else-if="isLoading">
      <component :is="loadingUI" />
    </div>
  </div>
</template>

<script>
import LoadingUI from '../LoadingUI.vue'
import ErrorUI from '../ErrorUI.vue'

export default {
  name: 'MountReactComponent',
  data() {
    return {
      isLoading: true,
      isError: false,
    }
  },
  components: {
    LoadingUI,
    ErrorUI,
  },
  props: {
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
      console.log('mounted', this.$refs.reactRoot)
      await this.importFunction(this.$refs.reactRoot)
      this.isLoading = false
    } catch (error) {
      console.log(error)
      this.isError = true
    }
  }
}
</script>
