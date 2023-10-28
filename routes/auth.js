const authControllers = require("../controllers/authControllers");
const midlewareController = require("../controllers/middlewareController");
const router = require("express").Router();
// RESISTER
router.post("/register", authControllers.registerUser);
//LOGIN
router.post("/login", authControllers.loginUser);
// REFESH TOKEN
router.post("/refresh", authControllers.refreshToken);
// LOGOUT
router.post(
    "/logout",
    midlewareController.verifyToken,
    authControllers.userLogout
);
module.exports = router;
