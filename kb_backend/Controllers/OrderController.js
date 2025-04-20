const { displayOrderModel, placedOrderModel, cancelOrderModel } = require("../Models/OrderModel");

const displayOrderController = async (req,res) => {
    const userId = req.user.data._id;

    try {
        const response = await displayOrderModel({userId});

        return res.send({
            status:200,
            message:"Display Order",
            data:response,
         });
    } catch (error) {
        return res.send({
            status:500,
            message:"Internal server error",
            error:error,
        });
    }
}



const placedOrderController = async (req,res) => {  
    const userId = req.user.data._id;
    const login = req.body.login; 
    const orderSummary = req.body.orderSummary; 
    const deliveryAddress = req.body.deliveryAddress; 
    const priceDetails = req.body.priceDetails; 
    const paymentMethod = req.body.paymentMethod;

    // console.log("login =>",login,"orderSummary =>",orderSummary,"deliveryAddress =>",deliveryAddress,"priceDetails =>",priceDetails,"paymentMethod =>",paymentMethod);

    try {
        const response = await placedOrderModel({userId,login,orderSummary,deliveryAddress,priceDetails,paymentMethod});

        return res.send({
            status:200,
            message:"Add To Order",
            data:response,
         });
    } catch (error) {
        return res.send({
            status:500,
            message:"Internal server error",
            error:error,
        });
    }
}



const cancelOrderController = async (req,res) => {
    const userId = req.user.data._id;
    const orderId = req.query.orderId;
    console.log(orderId);

    try {
        const response = await cancelOrderModel({userId,orderId});

        return res.send({
            status:200,
            message:"Remove From Order",
            data:response,
         });
    } catch (error) {
        return res.send({
            status:500,
            message:"Internal server error",
            error:error,
        });
    }
}

 

module.exports = {displayOrderController,placedOrderController,cancelOrderController};