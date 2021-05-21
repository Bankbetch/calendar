<template>
  <validation-provider :rules="rules" v-slot="validationContext">
    <b-form-group :label="label" :label-class="required" :label-cols="labelCol">
      <b-form-textarea
        :state="getValidationState(validationContext)"
        :value="value"
        @input="$emit('input', $event)"
        :name="label"
        :class="classInput"
        :rows="rows"
        :maxlength="maxlength"
      ></b-form-textarea>
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
      type: String,
      default: undefined,
    },
    rows: {
      type: Number,
      default: 3,
    },
    maxlength: {
      type: Number,
      default: 300,
    },
  },
  data() {
    return {}
  },
  computed: {},
}
</script>

<style></style>
