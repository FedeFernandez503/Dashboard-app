const {
  addTask,
  deleteTask,
  updateTask
} = require("../controllers/tasks.controllers")

const router = require("express").Router()

router.post("/", addTask)
router.put("/:id", updateTask)
router.delete("/:id", deleteTask)
module.exports = router
