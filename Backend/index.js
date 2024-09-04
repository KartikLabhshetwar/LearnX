const express = require("express");
const cors = require("cors")
const mainRoute = require("./routes/index")
const dotenv = require("dotenv")


app.use(cors())
const app = express();
dotenv.config();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/v1", mainRoute)



app.listen(3000, ()=>{
    console.log("server is running....")
})