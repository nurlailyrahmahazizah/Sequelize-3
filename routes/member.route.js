
const express = require(`express`)

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

/** load middleware for validation request */
let { validateMember } = require(`../middlewares/member-validation`)

const { authorize } = require(`../controllers/auth.controller`)

const memberController = require(`../controllers/member.controller`)

app.get("/",[authorize], memberController.getAllMember)
app.post("/add",[authorize], memberController.addMember)
app.put("/:id",[authorize], memberController.updateMember)
app.post("/:id",[authorize], memberController.findMember)
app.delete("/:id",[authorize], memberController.deleteMember)

module.exports = app
