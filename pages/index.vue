<template>
  <div class="w-100 h-100">
    <div class="d-flex justify-content-between mb-2 p-0" style="height: 35px">
      <b-button variant="primary" @click="onCreateEvent('create')"> Create </b-button>
      <InputDropdown
        v-model="search"
        class="col-6 p-0"
        :options="optionSearch"
        :track="'_id'"
        :allowEmpty="true"
        :required="false"
        :placeholder="'Search'"
        :loading="isLoadingSearch"
        @asyncFind="onSearchEvent"
        @input="onChangeSearch"
      >
        <template slot="singleLabel" slot-scope="props">
          <div class="d-flex justify-content-between">
            <span class="option__name">
              <span :class="`vuecal__event ${props.option.class}`" class="dot"></span> {{ props.option.title }}</span
            >
            <span class="option__text">{{ props.option.start }} - {{ props.option.end }}</span>
          </div>
        </template>
        <template slot="option" slot-scope="props">
          <div class="d-flex justify-content-between">
            <span class="option__name">
              <span :class="`vuecal__event ${props.option.class}`" class="dot"></span> {{ props.option.title }}</span
            >
            <span class="option__text">{{ props.option.start }} - {{ props.option.end }}</span>
          </div>
        </template>
      </InputDropdown>
    </div>
    <vue-cal
      class="vuecal--green-theme"
      events-count-on-year-view
      editable-events
      :active-view.sync="actionView"
      :selected-date.sync="calendarSelectedDate"
      :time-from="0 * 60"
      :time-to="23 * 60"
      :events="events"
      :on-event-click="onEventClick"
      @event-drop="onDragAndDropEvent($event)"
      @event-duration-change="onDragAndDropEvent($event)"
      @view-change="onClickViewChange"
    >
      <template #no-event>
        <!-- @view-change="" -->
        <div>No event</div>
      </template>
      <template v-slot:cell-content="{ cell, view, events }">
        <span class="vuecal__cell-date">{{ cell.content }}</span>
        <span
          class="vuecal__cell-events-count"
          v-if="['years', 'year', 'month'].includes(view.id) && customEventsCount(events)"
        >
          {{ customEventsCount(events) }}
        </span>
      </template>
    </vue-cal>
    <OpenDialog
      id="openDialog"
      @onConfirmDialog="submitConfirmModal"
      :title="modal.title"
      :textButtonSubmit="'Save'"
      :statusLoading="modal.statusLoading"
    >
      <template #body>
        <validation-observer ref="observerForm">
          <InputTextNormal
            labelCol="3"
            class="col-12"
            v-model="form.title"
            :label="'Title'"
            :maxlength="20"
            :rules="`required|max:40`"
          />
          <InputTextNormal
            labelCol="3"
            required=""
            class="col-12"
            v-model="form.content"
            :label="'Content'"
            :maxlength="40"
          />
          <InputTextArea labelCol="3" required="" class="col-12" v-model="form.contentFull" :label="'Content Full'" />
          <validation-provider :rules="'required'" v-slot="validationContext">
            <b-form-group :label="'Date'" :label-class="'required'" :label-cols="'3'">
              <DatePicker
                v-model="form.date"
                type="datetime"
                placeholder="YYYY-MM-DD HH:mm"
                format="YYYY-MM-DD HH:mm"
                value-type="format"
                :class="validationContext.errors[0] ? 'mxValidate' : ''"
                range
                :not-before="afterEndDate"
                :not-after="beforeStartDate"
              />
            </b-form-group>
          </validation-provider>
          <InputDropdown
            v-model="form.class"
            labelCol="3"
            class="col-12"
            :label="'Type'"
            :options="optionType"
            :track="'id'"
            :allowEmpty="false"
            :rules="`required`"
          >
            <template slot="singleLabel" slot-scope="props">
              <div class="d-flex justify-content-between">
                <span class="option__name">
                  <span :class="`vuecal__event ${props.option.id}`" class="dot"></span> {{ props.option.name }}</span
                >
              </div>
            </template>
            <template slot="option" slot-scope="props">
              <div class="d-flex justify-content-between">
                <span class="option__name">
                  <span :class="`vuecal__event ${props.option.id}`" class="dot"></span> {{ props.option.name }}</span
                >
              </div>
            </template>
          </InputDropdown>
        </validation-observer>
      </template>
    </OpenDialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
export default {
  async asyncData({ store, axios }) {
    try {
      await store.dispatch('calendar/getEvent')
    } catch (error) {}
  },
  data() {
    return {
      modal: {
        title: undefined,
        statusLoading: undefined,
      },
      calendarSelectedDate: moment(new Date()).format('YYYY-MM-DD'),
      form: {
        title: undefined,
        date: [],
        content: '',
        contentFull: '',
        class: '',
      },
      optionType: [
        {
          id: 'sport',
          name: 'Sport',
        },
        {
          id: 'work',
          name: 'Work',
        },
        {
          id: 'health',
          name: 'Health',
        },
        {
          id: 'default',
          name: 'Default',
        },
      ],
      filters: {},
      edited: false,
      search: undefined,
      optionSearch: [],
      isLoadingSearch: false,
      actionView: 'month',
    }
  },
  computed: {
    ...mapState({
      events: (state) => state.calendar.events,
    }),
  },
  methods: {
    onChangeSearch(event) {
      if (event) {
        this.calendarSelectedDate = event.start
        this.actionView = 'week'
      }
    },
    async onSearchEvent(e) {
      this.isLoadingSearch = true
      this.optionSearch = []
      this.search = undefined
      await this.delaySearch(e, 'calendar/getSearch').then(() => {
        this.isLoadingSearch = false
        this.optionSearch = this.$store.state.calendar.searchOptions
      })
      // this.$store.dispatch('calendar/getEvent', e)
    },
    async getEvent() {
      await this.$store.dispatch('calendar/getEvent', this.filters)
    },
    onClickViewChange(event) {
      switch (event.view) {
        case 'week':
          this.calendarSelectedDate = moment(event.startDate).format('YYYY-MM-DD')
          break
        default:
          this.calendarSelectedDate = moment(new Date()).format('YYYY-MM-DD')
          break
      }
      this.actionView = event.view
    },
    async onDragAndDropEvent(event) {
      await this.$store.dispatch(`calendar/editEvent`, event.event)
    },
    resetForm() {
      this.form = { title: undefined, date: [], content: '', contentFull: '', class: '' }
    },
    async submitConfirmModal(status) {
      const type = this.edited ? 'editEvent' : 'createEvent'
      if (status) {
        const res = await this.$refs.observerForm.validate()
        if (res) {
          this.modal.statusLoading = true
          try {
            await this.$store.dispatch(`calendar/${type}`, this.form, this.form._id)
            this.modal.statusLoading = false
            this.$bvModal.hide('openDialog')
            this.getEvent()
            this.edited = false
          } catch (error) {
            this.edited = false
            this.modal.statusLoading = false
          }
        }
      } else {
        this.$bvModal.hide('openDialog')
      }
    },
    onCreateEvent() {
      this.modal.title = 'Create Events'
      this.$bvModal.show('openDialog')
      this.edited = false
      this.resetForm()
    },
    onEventClick(event, e) {
      this.modal.title = 'Edit Events'
      this.form.title = event.title
      this.form.date[0] = moment(event.start).format('YYYY-MM-DD HH:mm')
      this.form.date[1] = moment(event.end).format('YYYY-MM-DD HH:mm')
      this.form.content = event.content
      this.form.contentFull = event.contentFull
      this.form.class = this.optionType.find((x) => x.id === event.class)
      this.form._id = event._id
      this.$bvModal.show('openDialog')
      this.edited = true
    },
    customEventsCount(events) {
      return events.length
    },
    beforeStartDate(date) {
      if (this.form.date[0]) {
        const startDate = new Date(this.form.date[0])
        startDate.setHours(0, 0, 0, 0)
        return date < startDate
      } else {
        return false
      }
    },
    afterEndDate(date) {
      if (this.form.date[1]) {
        const endDate = new Date(this.form.date[1])
        endDate.setHours(0, 0, 0, 0)
        return date > endDate
      } else {
        return false
      }
    },
  },
}
</script>
