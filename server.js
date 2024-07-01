const express  = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const  dotenv = require("dotenv").config();
connectDb();
const app = express();

//to convert server json data this is an parser
app.use(express.json());
const port = process.env.PORT || 5000;

// this is an middle ware for all api that mean all api get start with this path
app.use("/api/contacts",require("./routes/contactRoutes"));

//this is middle ware for the users opeartions
app.use("/api/user",require("./routes/userRoutes"));


//this is used show error in json format 
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`server listen on port ${port}`);
});


