const express = require(`express`)

const app = express()

app.use(express.json())

const borrowController = require(`../controllers/borrow.controller`)

let {validateBorrow} = require(`../middlewares/borrow-validation`)

/** load authorization function from controllers */
const { authorize } = require(`../controllers/auth.controller`)

app.post("/",[authorize], [validateBorrow], borrowController.addBorrowing)
app.put("/:id",[authorize], [validateBorrow], borrowController.updateBorrowing)
app.delete("/:id",[authorize], borrowController.deleteBorrowing)
app.get("/return/:id",[authorize], borrowController.returnBook)
app.get("/",[authorize], borrowController.getBorrow)
app.get("/find",[authorize], borrowController.findBorrow)

module.exports = app