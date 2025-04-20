const mongoose = require("mongoose");
const { atlasConnection } = require("../db");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "UserSchema",
    },
    login: {},
    orderSummary: [], 
    deliveryAddress: {},
    priceDetails: {},
    paymentMethod: {},
},
{
    timestamps: true,
});

const OrderSchema = atlasConnection.model("Order",orderSchema);

module.exports = OrderSchema;