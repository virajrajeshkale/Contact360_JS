// express -async-handler is an express package that is used to handle expcetion and avoid to use multilevel or multpile try catch block
const asyncHandler = require("express-async-handler");
const Contact = require ("../models/contactModel");
//@desc Get all contacts
//@route GET/api/contacts
//@access private

const getContacts=asyncHandler (async(req,res)=>{
    const contacts =await Contact.find({user_id : req.user.id});
    res.status(200).json(contacts);
});

//@desc get contacts
//@route GET/api/contacts/:id
//@access private

const getContact=asyncHandler(async(req,res)=>{
    const contact =await Contact.findById(req.params.id)
    if(!contact)
    {
        res.status(404);
        throw new Error ("Contact not Found");
    }
    res.status(200).json(contact);
});

//@desc Create New contacts
//@route POST/api/contacts
//@access private

const createContact= asyncHandler(async(req,res)=>{
    console.log("The request body:",req.body);
    const{name,email,phone} = req.body;
    
      if(!name || !email || !phone )
    {
        res.status(400);
         throw new Error ("All fields are mandatory..!");
    }
   
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
});
    res.status(201).json(contact);
});



//@desc Update old contact
//@route PUT/api/contacts/:id
//@access private

const updateContact=asyncHandler(async(req,res)=>{
    const contact =await Contact.findById(req.params.id)
    if(!contact)
    {
        res.status(404);
        throw new Error ("Contact not Found");
    }

    if(contact.user_id.toString()!==req.user.id)
    {
        req.status(403);
        throw new Error ("User dont have permission to update other contact..")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new :true}
    );
    res.status (200).json(updatedContact);
});


//@desc delete contact
//@route DELETE/api/contacts/:id
//@access private
const deleteContact=asyncHandler(async(req,res)=>{
    const contact =await Contact.findById(req.params.id)
    if(!contact)
    {
        res.status(404);
        throw new Error ("Contact not Found");
    }

    if(contact.user_id.toString()!==req.user.id)
        {
            req.status(403);
            throw new Error ("User dont have permission to delete other contact..")
        }
    await Contact.deleteOne({_id : req.params.id});
    res.status(200).json(contact);
});


module.exports = {getContacts,deleteContact,createContact,updateContact,getContact,};