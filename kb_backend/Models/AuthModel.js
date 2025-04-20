const { mongoose } = require("mongoose");
const UserSchema = require("../Schemas/AuthSchema");
const bcrypt=require('bcryptjs');

const checkEmailModel=({email}) => {
    return new Promise(async (resolve,reject) => {

        try {
            const response=await UserSchema.findOne({email : email});

            if(response ) {
                reject("Email already registered");
            }

            resolve(response);
        } catch (error) {
            reject(error);
        }
    })
}



const storeUserInfoModel=({name,email,password}) => {
    return new Promise(async (resolve,reject) => {

        const hashPassword=await bcrypt.hash(password,Number(process.env.SALT));

        const userObj=new UserSchema({
            name : name,
            email : email,
            password : hashPassword, 
        });

        try {
            const response=await userObj.save();
            resolve(response);
        } catch (error) {
            reject(error);
        }
    })
}



const userFoundModel=({email}) => {
    return new Promise(async (resolve,reject) => {

        try {
            const response=await UserSchema.findOne({email : email}).select("+password");;

            if(!response ) {
                reject("User not registered");
            }

            resolve(response);
        } catch (error) {
            reject(error);
        }
    })
}



const displayAddressModel=({userId}) => {
    return new Promise(async (resolve,reject) => {

        try {
            const response=await UserSchema.findOne({_id : userId});

            if(!response ) {
                reject("User not found");
            }

            resolve(response);
        } catch (error) {
            reject(error);
        }
    })
}



const saveAddressModel=({name,phone,pincode,locality,area,city,state,addtype,userId}) => {
    return new Promise(async (resolve,reject) => {

        try {
            const response = await UserSchema.findOne({_id : userId});

            if(!response ) {
                reject("User not found");
            }
    
            const addObj=new Object({
                _id: new mongoose.Types.ObjectId(),
                name,
                phone,
                pincode,
                locality,
                area,
                city,
                state,
                addtype
            });

           // console.log(addObj)
            
            response.address.push(addObj);
            const result = await response.save();
           // console.log(result);
            
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}



const removeAddressModel = ({userId,AddressId}) => {
    return new Promise(async (resolve,reject) => {

        try {
            const response  = await UserSchema.findOne({_id:userId});

            if(response) {
                const AddIdIndex = response.address.findIndex(add => add._id.toString() === AddressId.toString());
                console.log(AddIdIndex);
                
                if(AddIdIndex !== -1) {
                    response.address.splice(AddIdIndex,1);
                    const updateaddress = await response.save();
        
                    resolve(updateaddress);
                }
                reject("No Address Fond");
            }

            reject("No User entry Fond");
        } catch (error) {
            reject(error);
        }
    });
}



module.exports={checkEmailModel,storeUserInfoModel,userFoundModel,displayAddressModel,saveAddressModel,removeAddressModel};