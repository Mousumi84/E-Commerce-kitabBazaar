const { mongoose } = require("mongoose");
const { checkEmailModel, storeUserInfoModel, userFoundModel, saveAddressModel, displayAddressModel, removeAddressModel } = require("../Models/AuthModel");
const { dataValidation, dataValidationLogin, dataValidationAddressUpdate } = require("../Utils/AuthUtil");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signupController = async (req,res)  => {
    console.log("Signup");
    const {name,email,password} = req.body;
    
    //Data Validation
    try {
        await dataValidation({name,email,password});
    } catch (error) {
        return res.send({
            status:400,
            message: error,
        });
    }

    
    //check if Email id already registered or not
    try {
        await checkEmailModel({email});
    } catch (error) {
        return res.send({
            status:400,
            message: error,
            error:error,
        });
    }


    //Store User Details in DB 
    try {
        const userDb = await storeUserInfoModel({name,email,password});

        return res.send({
            status:200,
            message:"Signup Successfully",
            data:userDb,
        });
    } catch (error) {
        return res.send({
            status:500,
            message:"Internal Server Error",
        });
    }
}



const loginController = async (req,res)  => {
    console.log("Login");
    const {email,password} = req.body;

    
    //Data Validation
    try {
        await dataValidationLogin({email,password});
    } catch (error) {
        return res.send({
            status:400,
            message: error,
        });
    }

    
    //User registered / not
    try {
        const userDb = await userFoundModel({email});
       
        const checkPassword = await bcrypt.compare(password,userDb.password);

        if(!checkPassword) {
            return res.send({
                status:400,
                message: "Incorrect Password",
            });
        }

        const jwtToken = jwt.sign({data:userDb},process.env.SECRETKEY);

        //Session Base Auth
        req.session.isAuth=true;
        req.session.user = {
            userId:userDb._id,
            useremail:userDb.email,
            name:userDb.name,
        }
        let session = req.session;


        return res.send({
            status:200,
            message:"Login Successfully",
            token:jwtToken,
            session,
        });
    } catch (error) {
        return res.send({
            status:400,
            message: error,
            error:error,
        });
    }

}



const schema = mongoose.Schema;
const sessionSchema = new schema({_id:String},{strict:false});
const sessionModel = mongoose.model("sessions",sessionSchema);

const logoutController = async (req,res)  => {
    console.log("Logout");
    const email = req.user.data.email;

    try {
        const deletesession=await sessionModel.deleteMany({"session.user.useremail" : email});

        return res.send({
            status:200,
            message:"Logout from all devices",
        });
    } catch (error) {
        console.log(error);
        return res.send({
            status:500,
            message:"Internal server error can't logout",
            error:error
        });
    }

}



const displayAddressController = async (req,res) => {
    const userId = req.user.data._id;
   
    try {
        const response = await displayAddressModel({userId});

        return res.send({
            status:200,
            message:"Display Address",
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



const updateAddressController = async (req,res)  => {
    
    const {name,phone,pincode,locality,area,city,state,addtype} = req.body;
    const userId = req.user.data._id;

    //Data Validation
    try {
        await dataValidationAddressUpdate({name,phone,pincode,locality,area,city,state,addtype});
    } catch (error) {
        return res.send({
            status:400,
            message: error,
        });
    }

    try {
        const response = await saveAddressModel({name,phone,pincode,locality,area,city,state,addtype,userId});

        return res.send({
            status:200,
            message:"update-address Successfully",
            data:response
        });
    } catch (error) {
        return res.send({
            status:400,
            message: error,
            error:error,
        });
    }
}



const removeAddressController = async (req,res) => {
    const userId = req.user.data._id;
    const AddressId = req.query.addressid;

    try {
        const response = await removeAddressModel({userId,AddressId});

        return res.send({
            status:200,
            message:"Remove Address",
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


module.exports = {signupController,loginController,logoutController,displayAddressController,updateAddressController,removeAddressController}