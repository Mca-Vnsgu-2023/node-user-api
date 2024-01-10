require("dotenv").config();

const express=require("express");
const monogoose= require("mongoose");
const cors= require("cors")

const app=express();

const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

app.use(express.Router())

const port =  process.env.PORT || 3000
const UserRoute=require('./routes/User');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use('/User', UserRoute)

app.get('/',(req,res)=>{
    res.send("Hello ..!")
})

monogoose.connect(process.env.MONGOURL).then(()=>console.log("MongoDB connected successfully."))

app.listen(port,()=>console.log(`Example App Listening on port ${port} !` ))
