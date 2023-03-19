const mongoose = require('mongoose')

const mongoURI = 'mongodb+srv://usama:Gre4V6FXzPBCIil2@cluster0.skpdzg5.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect( mongoURI, { useNewUrlParser: true})

module.exports = mongoose