
const express = require(`express`)

const app = express()

app.use(express.json())

const memberController = require(`../controllers/member.controller`)

app.get("/", memberController.getAllMember)
app.post("/add", memberController.addMember)
app.post("/:id", memberController.findMember)
app.put("/:id", memberController.updateMember)
app.delete("/:id", memberController.deleteMember)

module.exports = app