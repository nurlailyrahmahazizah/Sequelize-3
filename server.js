const express = require(`express`)

const app = express()

const PORT = 8000

const cors = require(`cors`)

app.use(cors())

const memberRoute = require(`./routes/member.route`)
const bookRoute = require(`./routes/book.route`)
const adminRoute = require(`./routes/admin.route`)
const borroRoute = require(`./routes/borrow.route`)

app.use(`/book`, bookRoute)
app.use(express.static(__dirname))
app.use('/member',memberRoute)
app.use('/admin',adminRoute)
app.use(`/borrow`, borroRoute)

app.listen(PORT, () => {
    console.log(`Server of Schools Library runs on port ${PORT}`)
})

const md5 = require(`md5`)
let password = md5(`password`)