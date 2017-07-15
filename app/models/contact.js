const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Contact = new Schema({
  name: String,
  type: String,
  img: {data: Buffer, contentType: String},
})

module.exports = mongoose.model('Contact', Contact)
