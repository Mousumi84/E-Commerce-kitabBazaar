const express = require("express");
const isAuth = require("../Middlewares/isAuth");
const { displayCartController, addToCartController, removeFromCartController, noCartController } = require("../Controllers/CartController");
const CartRouter = express.Router();


CartRouter.get('/display-cart',isAuth,displayCartController);
CartRouter.post('/add-to-cart',isAuth,addToCartController);
CartRouter.post('/remove-from-cart',isAuth,removeFromCartController);
CartRouter.post('/nocart',isAuth,noCartController);

module.exports = CartRouter;