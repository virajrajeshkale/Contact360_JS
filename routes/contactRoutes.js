const  express  = require ("express");
const router = express.Router();


const {getContacts,getContact,deleteContact,updateContact,createContact} = require("../controllers/contactControllers");
const validateToken = require("../middleware/validateTokenHandler");

// before doing any opeartion check user token validate 
router.use(validateToken);

// rest Apis

// 1.to get all contacts
router.route("/").get(getContacts);

// 2.create contact
router.route("/").post(createContact);

// getting an idivisual contact
router.route("/:id").get(getContact);

// 3.Update contact
router.route("/:id").put(updateContact);

// 4.delete contact api 
router.route("/:id").delete(deleteContact);




module.exports = router;