<template>
  <div>
    <div ref="reactComponent"></div>
    <div v-if="isError">
      <ErrorUI />
    </div>
    <div v-else-if="isLoading">
      <LoadingUI />
    </div>
  </div>
</template>

<script>
import LoadingUI from '../LoadingUI.vue'
import ErrorUI from '../ErrorUI.vue'

export default {
  name: 'ReactComponent',
  components: {
    LoadingUI,
    ErrorUI,
  },
  props: {
    componentName: {
      type: String,
      required: true
    },
    componentProps: {
      type: Object,
      default: () => ({})
    },
    importFunction: {
      type: Function,
      required: true
    },
    store: {
      type: Object,
      optional: true
    }
  },
  data() {
    return {
      unmountFn: null,
      isError: false,
      isLoading: true
    }
  },
  mounted() {
    this.loadReactComponent()
  },
  beforeDestroy() {
    // Cleanup React component
    if (this.unmountFn) {
      this.unmountFn(this.$refs.reactComponent)
    }
  },
  methods: {
    async loadReactComponent() {
      try {
        // Using dynamic import to load the React component
        const module = await this.importFunction()

        if (module.mount) {
          // If the component exports a mount function, use it
          this.unmountFn = module.unmount
          module.mount(this.$refs.reactComponent, this.componentProps)
        } else {
          // If it's a direct React component, create mount/unmount manually
          const React = await import('react')
          const { createRoot } = await import('react-dom/client')

          const Component = module.default
          window.Component = Component
          const container = this.$refs.reactComponent
          const root = createRoot(container)
          root.render(React.createElement(Component, { ...this.componentProps, store: this.store }))

          this.unmountFn = () => root.unmount()
        }
        this.isLoading = false
      } catch (error) {
        console.error('Failed to load React component:', error)
        this.isError = true
      }
    }
  },
  watch: {
    // Re-render React component if props change
    componentProps: {
      deep: true,
      handler() {
        this.loadReactComponent()
      }
    }
  }
}
</script>