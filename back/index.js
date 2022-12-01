require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api", require("./src/routes"))

mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("*** DATABASE CONNECTED ***")
    app.listen("5000", () => {
      console.log("*** SERVER LISTENING ON PORT 5000 ****")
    })
  })
  .catch((err) => console.log(err))
