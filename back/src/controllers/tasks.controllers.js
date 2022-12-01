const usersCollection = require("../models/user")
const addTask = async (req, res) => {
  try {
    const { uid, ...newTask } = req.body
    usersCollection.findOneAndUpdate(
      {
        _id: uid
      },
      {
        $push: {
          tasks: newTask
        }
      },
      {
        new: true
      }
    ).then(doc => {
      console.log(doc)
      res.status(201).json(doc)
    }).catch(e => console.log(e))
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Internal server error." })
  }
}

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id
    const { uid, ...task } = req.body
    usersCollection.findOneAndUpdate({
      uid,
      "tasks._id": taskId
    }, {
      $set: { "tasks.$": task }
    }, {
      new: true
    }).then(doc => {
      console.log(doc)
      res.status(200).json(doc)

    })
      .catch(e => console.log(e))
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Internal server error." })
  }
}

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id
    const { uid } = req.body
    usersCollection.findOneAndUpdate({
      _id: uid
    }, {
      $pull: {
        tasks: { _id: taskId }
      }
    }, {
      new: true
    })
      .then(doc => {
        console.log(doc)
        res.status(200).json(doc)
      })
      .catch(e => console.log(e))
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Internal server error." })
  }
}

module.exports = {
  addTask,
  updateTask,
  deleteTask
}