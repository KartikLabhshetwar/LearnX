const express = require("express");
const cors = require("cors")
const mainRoute = require("./routes/index")
const dotenv = require("dotenv")

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

dotenv.config();

app.use("/api/v1", mainRoute)

const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log("server is running....")
})
