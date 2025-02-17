<template>
  <div>
    <h1>MFE</h1>
    <div style="border: 1px solid black; padding: 10px; margin: 10px;">
      <h3>Parent store</h3>
      <p>Counter: {{ counter }}</p>
      <p>User: {{ user }}</p>

      <button @click="incrementCounter">
        Increment Counter
      </button>
      <button @click="setUser">
        Set User
      </button>
    </div>
    <br />
    <br />
    <MountReactComponent
      :import-function="importBanner2Function"
    />
  </div>
</template>

<script>
import MountReactComponent from '@/components/mfe/react-mounting/MountReactComponent.vue'
import { BehaviorSubject, distinctUntilChanged } from 'rxjs'
import { loadRemote, loadShare } from '@module-federation/enhanced/runtime'
import initMFE from '@/common/mfe/init'
import { sampleModule2 } from '@/common/mfe/modules'

initMFE(sampleModule2)
loadShare('react')

export default {
  name: 'MfeIndex',
  components: {
    MountReactComponent,
  },
  data() {
    return {
      counter: 0,
      user: null,
      store: {
        counter: new BehaviorSubject(0),
        user: new BehaviorSubject(null),
        lang: new BehaviorSubject(this.$i18n.locale),

        // Methods to update state
        incrementCounter() {
          const currentValue = this.counter.getValue()
          this.counter.next(currentValue + 1)
        },

        setUser(user) {
          this.user.next(user)
        }
      }
    }
  },
  watch: {
    locale: {
      handler() {
        this.store.locale.next(this.$i18n.locale)
      },
    },
  },
  mounted() {
    this.store.counter.pipe(distinctUntilChanged()).subscribe((value) => {
      this.counter = value
    })
    this.store.user.pipe(distinctUntilChanged()).subscribe((value) => {
      this.user = value
    })
  },
  methods: {
    async importBanner2Function(element) {
      // const mountFunction = await import('reactModule2/Banner2').then(module => module.default)
      const mountFunction = await loadRemote('reactModule2/Banner2').then(module => module.default)
      console.log('mountFunction kakakakakaak', element)
      return mountFunction({
        store: this.store,
        appConfig: process.env,
        VueHTTP: Vue.GoGoHTTP
      }, element)
    },
    handleButtonClick() {
      console.log('button clicked')
    },
    incrementCounter() {
      this.store.incrementCounter()
    },
    setUser() {
      this.store.setUser('John Doe from Parent')
    },
  },
}
</script>
