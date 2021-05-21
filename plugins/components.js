import Vue from 'vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/locale/en'
import 'vue2-datepicker/index.css'
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('DatePicker', DatePicker)
Vue.config.warnHandler = function (msg, vm, trace) {
  return `Message:--->${msg}, vm:---->${vm}`
}
Vue.config.disableNoTranslationWarning = true
