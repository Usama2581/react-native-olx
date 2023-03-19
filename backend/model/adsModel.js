const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
})


const Ads = mongoose.model('Ads', adsSchema)

module.exports = Ads