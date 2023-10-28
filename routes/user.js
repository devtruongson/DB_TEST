const midlewareController = require("../controllers/middlewareController");
const userControllers = require("../controllers/userControlers");
const router = require("express").Router();

// GET ALL USER
router.get("/",midlewareController.verifyToken,userControllers.getAllUsers);
// DELETE USER
router.delete("/:id",midlewareController.verifyTokenAndAdmin, userControllers.deleteUser)
module.exports = router;