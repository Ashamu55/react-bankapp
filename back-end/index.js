const express = require('express');
require("dotenv").config();
let port = process.env.PORT
const app = express();
const cors = require('cors')
const userRouter = require("./Routes/User.Route")
const mongoose = require('mongoose');
let uri = "mongodb+srv://timex2024:ifeoluwaoluwatimileyin2018@cluster0.x5uz6mh.mongodb.net/march_db?retryWrites=true&w=majority&appName=Cluster0"


app.use(cors())
app.use(express.json());
app.use("/student", userRouter)

app.listen(port, ()=>{
    mongoose.connect(uri)
        .then(()=>{
           console.log(`server listening on port ${port} and database is connected successfully`) ;
        })
        .catch((error)=>{
               console.log(error);
        })
})