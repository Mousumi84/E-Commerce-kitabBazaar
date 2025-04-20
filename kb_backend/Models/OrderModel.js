const OrderSchema = require("../Schemas/OrderSchema");


const displayOrderModel = ({userId}) => {
    return new Promise(async (resolve,reject) => {

        try {
            const response = await OrderSchema.find({userId:userId});

            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
}



const placedOrderModel = ({userId,login,orderSummary,deliveryAddress,priceDetails,paymentMethod}) => {
    return new Promise(async (resolve,reject) => {
       
        try {
            const OrderObj = new OrderSchema({
                userId : userId,
                login : login,
                orderSummary : orderSummary,
                deliveryAddress : deliveryAddress,
                priceDetails : priceDetails,
                paymentMethod : paymentMethod
            });

            const result = await OrderObj.save();
        
            resolve(result);

        } catch (error) {
            reject(error);
        }
    });
}



const cancelOrderModel = ({userId,orderId}) => {
    return new Promise(async (resolve,reject) => {

        try {
            const existingEntry  = await OrderSchema.findOneAndDelete({_id:orderId});
            const response = await OrderSchema.find({userId:userId});
           
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
}



module.exports = {displayOrderModel,placedOrderModel,cancelOrderModel};