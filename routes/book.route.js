const express = require(`express`)

const app = express()

app.use(express.json())

const bookController = require(`../controllers/book.controller`)

/** load middleware for validation request */
// let { validateBook } = require(`../middlewares/book-validation`)

const {authorize} = require(`../controllers/auth.controller`)

// const upload = require("../controllers/upload-cover")

/** load function from simple-middleware */
const { midOne } = require(`../middlewares/simple-middleware`)

app.get("/",[authorize], [midOne] , bookController.getAllBooks)

app.post("/find",[authorize], bookController.findBook)
app.post("/add",[authorize],  bookController.addBook)
app.put("/:id",[authorize],  bookController.updateBook)
app.delete("/:id",[authorize], bookController.deleteBook)
module.exports = app
