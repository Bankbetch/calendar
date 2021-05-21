<template>
  <b-modal
    v-bind="$attrs"
    :no-close-on-backdrop="true"
    centered
    :title="title"
    footer-class="border-0 py-2"
    @hide="onHideDialog"
  >
    <template v-slot:modal-header-close>
      <i class="icon-ic-close" @click="onCloseDialog(false)" />
    </template>
    <slot name="body" />
    <template v-slot:modal-footer>
      <b-form-group class="float-right">
        <b-button
          type="button"
          class="mr-2 b-7"
          variant="outline-primary"
          :class="lockButton ? 'button-locked' : ''"
          :disabled="lockButton"
          @click="onCloseDialog(false)"
        >
          <b-spinner v-if="lockButton" small></b-spinner>
          Cancel
        </b-button>
        <b-button
          type="button"
          size="md"
          variant="primary"
          class="text-white b-7"
          :class="lockButton ? 'button-locked' : ''"
          :disabled="lockButton"
          @click="onCloseDialog(true)"
        >
          <b-spinner v-if="lockButton" small></b-spinner>
          {{ textButtonSubmit }}
        </b-button>
      </b-form-group>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'OpenDialog',
  props: {
    title: {
      type: String,
    },
    statusLoading: {
      type: Boolean,
      default: false,
    },
    idModal: {
      type: String,
      default: 'openDialog',
    },
    textButtonSubmit: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      status: false,
    }
  },
  computed: {
    lockButton() {
      return this.statusLoading
    },
    getTitle() {
      return this.title
    },
  },
  methods: {
    onCloseDialog(status) {
      this.status = status
      return this.$emit('onConfirmDialog', status)
    },
    onHideDialog(e) {
      this.$emit('onCLickOverlay', this.status)
      if (this.status) {
        this.status = false
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.b-7 {
  width: 7rem;
}
</style>
