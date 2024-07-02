const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    
    username :{
        type : String,
        required : [true , "Please add the user name..!"]
    },
    email : {
        type : String,
        required:[true,"Please add the user email..!"],
        unique:[true,"Email addrss already register"]
    },
    password : {
        type : String,
        required :[true,"please add the user Password..!"]
    },
    
},
{
    timestamps :true,
});

module.exports = mongoose.model("User",userSchema);