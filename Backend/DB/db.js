const  mongoose=require("mongoose")


require("dotenv").config()

let DB= mongoose.connect(process.env.MongoDatabaseUrl)

module.exports={DB}


// const mongoose=require('mongoose')
// require('dotenv').config()


// const connection=mongoose.connect(process.env.url)

// module.exports=connection