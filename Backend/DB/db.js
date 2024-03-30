const  mongoose=require("mongoose")


require("dotenv").config()

let DB= mongoose.connect(process.env.MongoDatabaseUrl)

module.exports={DB}


