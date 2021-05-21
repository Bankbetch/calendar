import Vue from 'vue'

Vue.mixin({
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      if (dirty && validated && valid) {
        return null
      } else if (validated && valid) {
        return null
      } else if (validated) {
        return false
      } else {
        return null
      }
    },
    delaySearch(params, path) {
      return new Promise((resolve, reject) => {
        try {
          const now = Date.now()
          !this.now ? (this.now = now) : now
          const diff = now - this.now
          this.now = now
          diff < 800 ? clearTimeout(this.timeout) : 800
          this.timeout = setTimeout(() => {
            clearTimeout(this.timeout)
            resolve(this.$store.dispatch(path, params))
          }, 800)
        } catch (error) {
          reject(error)
        }
      })
    },
  },
})
