const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
    startOriginal: {
      type: Date,
      required: true,
    },
    endOriginal: {
      type: Date,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    contentFull: {
      type: String,
    },
    class: {
      type: String,
      default: 'default',
    },
  },
  { timestamps: true }
)
schema.methods.toJSON = function () {
  return {
    class: this.class,
    _id: this._id,
    start: this.start,
    end: this.end,
    title: this.title,
    content: this.content,
    contentFull: this.contentFull,
  }
}
module.exports = mongoose.model('calendars', schema)
