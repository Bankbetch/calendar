import { extend } from 'vee-validate'
import { required, max, min } from 'vee-validate/dist/rules'

export default ({ app }) => {
  extend('required', {
    ...required,
    message: 'This field is required.',
  })
  extend('max', {
    ...max,
    message: 'The max length of {length} characters.',
  })

  extend('min', {
    ...min,
    message: 'The min length of {length} characters.',
  })
}
