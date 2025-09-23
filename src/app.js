const express = require('express')
const app = express()
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.urlencoded({ extended: true }))

const indexRouter = require('./routes/indexRouter')
app.use('/', indexRouter)

const PORT = 3000
app.listen(PORT, (err) => {
    if (err) {
        throw new Error(err)
    }
    console.log(`App running on PORT: ${PORT}`)
})