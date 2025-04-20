const express = require("express");
const isAuth = require("../Middlewares/isAuth");
const { displayOrderController, placedOrderController, cancelOrderController } = require("../Controllers/OrderController");
const OrderRouter = express.Router();


OrderRouter.get('/display-order',isAuth,displayOrderController);
OrderRouter.post('/placed-order',isAuth,placedOrderController);
OrderRouter.post('/cancel-order',isAuth,cancelOrderController);

module.exports = OrderRouter;