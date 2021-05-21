const CalendarModel = require('../models/calendar.model')
const moment = require('moment')
const { errorHandle, successHandle, errorMongo } = require('../helpers/handleMessage.helper')
const escapeSearchQuery = (keyword) => {
  const regex = new RegExp(/(\+|\-|\=|&&|\|\||\>|\<|\!|\(|\)|\{|\}|\[|\]|\^|"|~|\*|\?|\:|\\|\/)/g)
  return [keyword.replace(regex, '\\$&')]
}

const methods = {
  async searchEvent(req, res) {
    try {
      const { q } = req.query
      let query = { title: { $eq: null } }
      if (q) {
        query = {
          $or: [
            {
              title: {
                $regex: q,
                $options: 'i',
              },
            },
            {
              content: {
                $regex: q,
                $options: 'i',
              },
            },
            {
              contentFull: {
                $regex: q,
                $options: 'i',
              },
            },
          ],
        }
      }
      const result = await CalendarModel.find(query).select(['class', 'start', 'end', 'title'])
      return res.success(successHandle(result))
    } catch (error) {
      res.error(errorHandle(error.message))
    }
  },
  async getEvent(req, res) {
    try {
      const result = await CalendarModel.find({}).select(['_id', 'class', 'start', 'end', 'title', 'content', 'contentFull'])
      return res.success(successHandle(result))
    } catch (error) {
      res.error(errorHandle(error.message))
    }
  },
  async createEvent(req, res) {
    try {
      const body = req.body
      const model = new CalendarModel({
        start: moment(body.date[0]).format('YYYY-MM-DD HH:mm'),
        end: moment(body.date[1]).format('YYYY-MM-DD HH:mm'),
        startOriginal: body.date[0],
        endOriginal: body.date[1],
        title: body.title,
        content: body.content,
        contentFull: body.contentFull,
        class: body.class,
      })
      await model.save((error) => {
        if (error) res.error(errorHandle(errorMongo(error), 400))
        else res.success(successHandle())
      })
    } catch (error) {
      res.error(errorHandle(error.message))
    }
  },
  async editEvent(req, res) {
    try {
      const body = req.body
      if (!body.hasOwnProperty('date')) {
        body.date = []
        body.date[0] = body.start
        body.date[1] = body.end
      }
      await CalendarModel.findByIdAndUpdate(req.params.id, {
        start: moment(body.date[0]).format('YYYY-MM-DD HH:mm'),
        end: moment(body.date[1]).format('YYYY-MM-DD HH:mm'),
        startOriginal: body.date[0],
        endOriginal: body.date[1],
        title: body.title,
        content: body.content,
        contentFull: body.contentFull,
        class: body.class,
      })
      res.success(successHandle())
    } catch (error) {
      res.error(errorHandle(error.message))
    }
  },
}

module.exports = { ...methods }
