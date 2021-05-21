<template>
  <validation-provider :rules="rules" v-slot="validationContext">
    <b-form-group
      :label="label"
      :label-class="required"
      :label-cols="labelCol"
      :class="classForm"
      :description="description"
    >
      <template v-slot:label="{ option }">
        <slot name="label" :option="option" />
      </template>
      <b-input
        :state="getValidationState(validationContext)"
        :value="value"
        :name="label"
        :class="classInput"
        :maxlength="maxlength"
        @input="$emit('input', $event)"
      ></b-input>
    </b-form-group>
  </validation-provider>
</template>

<script>
export default {
  props: {
    maxlength: {
      type: Number,
      default: 1000000000000,
    },
    description: { type: String, default: undefined },
    label: {
      type: String,
      default: undefined,
    },
    required: {
      type: String,
      default: 'required',
    },
    rules: {
      type: [Object, String],
      default: () => {
        return { required: false }
      },
    },
    value: {
      type: undefined,
      default: undefined,
    },
    labelCol: {
      type: undefined,
      default: undefined,
    },
    classInput: {
      type: undefined,
      default: undefined,
    },
    classForm: {
      type: undefined,
      default: undefined,
    },
  },
  data() {
    return {}
  },
  computed: {},
}
</script>

<style></style>
