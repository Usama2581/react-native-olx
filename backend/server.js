const express = require('express')
const app = express()
const db = require('./config/db')

app.listen(4000, () => {
    console.log('app is listenign to port 4000')
})


db.connection
.once('open', () => console.log('connected'))
.on('err', (err) => console.log(err))
// console.log('hello')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', require('./routes/root'))