require('dotenv').config()

const express = require('express')
const expressLayout = require('express-ejs-layouts')
const cookies = require('cookie-parser')

const connectDB = require('./server/config/db')

const app = express()
const PORT = process.env.PORT || 5001

// Connect to DB
connectDB()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookies())

app.use(express.static('public'))

// Tepmlating Engine
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

const authMiddleware = require('./server/middleware/identify_user')
const router = require('./server/routes/main')

app.use(authMiddleware)
app.use('/', router)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
