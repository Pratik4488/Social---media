const express = require("express");
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const helmet = require("helmet");
const userRoute = require('./Routes/users')
const authRoute = require('./Routes/auth')
const postRoute = require('./Routes/posts')
const app= express();
const multer = require("multer")

dotenv.config();

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedtopology: true
});
mongoose.connection.on("connected", () =>{
    console.log("Mongoose is connected...")
})


app.use("/images", express.static(path.join(__dirname, "public/images")));

// MIDDLE WARE
app.use(helmet());
app.use(express.json());
app.use(morgan('common'));

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "public/images");
    },
    filename:(req, file, cb) =>{
        cb(null,req.body.name);
    },
});

const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req, res) =>{
    try{
        return res.status(200).json("file uploaded successfully.");
    }catch(error){
        console.log(error);
    }
})


app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);


app.listen(8080, ()=>{
console.log("connected to server...")
})