const mongoose = require ("mongoose");

// this is an mongoose object that describe the structure of it

const contactSchema = mongoose.Schema({
    
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user",
    },

    name:{
        type : String,
        required :[true,"Please add the contact name.."]
    },
    email:{
        type : String,
        required :[true,"Please add the contact email address.."]
    },
    phone:{
        type : String,
        required :[true,"Please add the contact number.."]
    }

},{
    timestampes:true,
});

module.exports = mongoose.model("Contact",contactSchema)