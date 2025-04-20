const mongoose  = require("mongoose");

//----------------------Connect MongoDb Compass----------------------------------------
const compassConnection=mongoose.createConnection(process.env.MONGOCOMPASS)

compassConnection.asPromise()
.then(() => console.log("MongoDb Compass Connected"))
.catch((error) => console.log("error 1 :",error));


//----------------------Connect MongoDb Atlas----------------------------------------
const atlasConnection=mongoose.createConnection(process.env.MONGOATLAS)

atlasConnection.asPromise()
.then(() => console.log("MongoDb Atlas Connected"))
.catch((error) => console.log("error 2 :",error));


module.exports={mongoose,compassConnection,atlasConnection};