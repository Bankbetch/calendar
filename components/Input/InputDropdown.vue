<template>
  <validation-provider :rules="rules" v-slot="validationContext">
    <b-form-group :label="label" :label-class="required" :label-cols="labelCol">
      <multiselect
        :value="selectedOptions"
        :options="options"
        :multiple="multiple"
        :searchable="searchable"
        :show-labels="showLabels"
        :state="getValidationState(validationContext)"
        :placeholder="placeholder"
        :class="selectedOptions.length === 0 ? validationContext.classes : ''"
        :track-by="track"
        :label="labelOption"
        :allow-empty="allowEmpty"
        @input="onSelectionChanged"
        @search-change="asyncFind"
        @close="$emit('close', $event)"
        :disabled="disabled"
        :name="track"
        :loading="loading"
        :internal-search="false"
      >
        <template v-slot:singleLabel="{ option }">
          <slot name="singleLabel" :option="option" />
        </template>

        <template v-slot:option="{ option }">
          <slot name="option" :option="option" />
        </template>

        <span slot="noResult">No result.</span>
        <span slot="noOptions">No result.</span>
      </multiselect>
    </b-form-group>
  </validation-provider>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    required: {
      type: [String, Boolean],
      default: 'required',
    },
    placeholder: {
      type: String,
      default: '',
    },
    labelCol: {
      type: undefined,
      default: undefined,
    },
    rules: {
      type: [Object, String],
      default: () => {
        return { required: false }
      },
    },
    options: {
      type: [Object, String, Array],
      default: () => {
        return []
      },
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    searchable: {
      type: Boolean,
      default: true,
    },
    showLabels: {
      type: Boolean,
      default: false,
    },
    track: {
      type: String,
      required: true,
    },
    labelOption: {
      type: String,
      default: 'name',
    },
    allowEmpty: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [Object, String, Number, Array],
      default: () => {
        return undefined
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  computed: {
    selectedOptions() {
      return this.value ? this.options.filter((x) => x[this.track] === this.value[this.track]) : []
    },
  },
  methods: {
    onSelectionChanged($event) {
      this.$emit('input', $event)
    },
    asyncFind($event) {
      this.$emit('asyncFind', $event)
    },
  },
}
</script>

<style></style>
