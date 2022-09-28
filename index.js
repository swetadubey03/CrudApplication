const express = require ("express")
const dotenv = require("dotenv").config()
const colors = require("colors")
const connectDB = require("./config/db")
const {errorHandler} = require("./middleware/errorMiddleware")


const port = process.env.PORT || 5000 

//initialize app
const app = express()


//database connection
connectDB()


//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//api
app.use('/api/users', require("./routes/userRoutes"))
app.use(errorHandler)

//app listen
app.listen(port, ()=> console.log(`Server listening on port ${port}`.bgMagenta))



