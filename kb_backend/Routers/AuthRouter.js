const express=require("express");
const { signupController, loginController, logoutController, updateAddressController, displayAddressController, removeAddressController } = require("../Controllers/AuthController");
const isAuth = require("../Middlewares/isAuth");
const AuthRouter=express.Router();

AuthRouter.post("/signup",signupController);
AuthRouter.post("/login",loginController);
AuthRouter.post("/logout",isAuth,logoutController);
AuthRouter.get("/display-address",isAuth,displayAddressController);
AuthRouter.post("/update-address",isAuth,updateAddressController);
AuthRouter.post("/remove-address",isAuth,removeAddressController);

module.exports=AuthRouter;