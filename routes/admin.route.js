/** load library express */
const express = require(`express`)

/** initiate object that instance of express */
const app = express()

/** allow to read 'request' with json type */
app.use(express.json())

/** load admin's controller */
const adminController = require(`../controllers/admin.controller`)

/** load middleware for validation request */
let { validateAdmin } = require(`../middlewares/admin-validation`)

/** load authorization function from controllers */
const { authorize } = require(`../controllers/auth.controller`)

/** create route to get data with method "GET" */
app.get("/", [authorize], adminController.getAllAdmin)

/** create route to add new member using method "POST" */
app.post("/add", [validateAdmin], [authorize], adminController.addAdmin)

/** create route to find member
 * using method "POST" and path "find" */
app.post("/find", [authorize], adminController.findAdmin)

/** create route to update member 
 * using method "PUT" and define parameter for "id" */
app.put("/:id", [validateAdmin], [authorize], adminController.updateAdmin)

/** create route to delete member
 * using method "DELETE" and define parameter for 'id */

app.delete("/:id", [authorize], adminController.deleteAdmin)

/** export app in order to load in another file */
module.exports = app