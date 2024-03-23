const mongoose=require("mongoose")



const UserSchema= mongoose.Schema({
    username:String,
    email:String,
    password:String,
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
})

const UserModel= mongoose.model("User",UserSchema)


module.exports={
    UserModel
}