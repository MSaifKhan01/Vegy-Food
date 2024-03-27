const express = require("express");
const { passport } = require("../Helper/GoogleOauth");
const { UserModel } = require("../Model/userSchema");

const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const userRouter = express.Router();

// // Middleware to get IP address
// function getClientIp(req) {
//   const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//   return ipAddress;
// }

// // Middleware to get location based on IP address
// async function getLocation(ipAddress) {
//   try {
//     const response = await fetch(`http://ip-api.com/json/${ipAddress}`);
//     const responseData = await response.json();

//     if (responseData.status === 'success') {
//       const { city, regionName, country } = responseData;
//       return `${city}, ${regionName}, ${country}`;
//     } else {
//       throw new Error("Failed to fetch location");
//     }
//   } catch (error) {
//     console.error("Error fetching location:", error);
//     return null;
//   }
// }


userRouter.post("/SignUp", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists with the provided email
    const isUser = await UserModel.findOne({ email });
    if (isUser) {
      return res.status(200).send({ msg: "You are already signed up, directly login" });
    }

    // Hash the password
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        throw new Error("Error hashing password");
      }
      
      // Create a new user with the hashed password
      const newUser = new UserModel({ username, email, password: hash });
      
      // Save the new user
      await newUser.save();
      
      // Send the success message after saving the user
      res.status(200).send({ msg: "Sign up successful" });
    });
  } catch (error) {
    res.status(401).send({ msg: error.message });
  }
});





userRouter.post("/login",async(req,res)=>{
  const { email, password } = req.body;

  // const ipAddress = getClientIp(req); // Get client IP address
  // console.log("----------",ipAddress)

  // // Get location based on IP address
  // const location = await getLocation(ipAddress);
  // console.log("jkjlkj---------: --",location)




  try {
    const isUser = await UserModel.findOne({ email });
    if (!isUser) {
      return res.status(200).send({ msg: "You are not  signed up, You need to SignUp" });
    }

    bcrypt.compare(password,isUser.password,((err,result)=>{
      if(result){

        const token=jwt.sign({userID:isUser._id},process.env.tokenSecretSign,{expiresIn:"1h"})
        console.log({msg:"login succesful",token,isUser})

        res.status(200).send({msg:"login succesful",token,isUser});




      }else{

        return res.status(401).send({msg:"invalid credintials"})
      }

    }))
  } catch (error) {
    res.status(401).send({ msg: error.message });
  }



})



//------------------- Google Auth Here -----------------------------------------
userRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  async function (req, res) {

    const userDataString = JSON.stringify(req.user);
    res.redirect(
      `http://localhost:1234/?userData=${encodeURIComponent(userDataString)}`
      // `https://vegy-food.vercel.app/?userData=${encodeURIComponent(userDataString)}`
    );
    console.log("----------------", userDataString);
    // res.send({userDatafromGoogleOauth:req.user})
    // try {
    //     // const fetch_user = await userModel.findOne({ email: req.user.email });

    //     if (fetch_user) {
    //         token_Generator(res, fetch_user.name, fetch_user._id , fetch_user.image);
    //     } else {
    //         bcrypt.hash("password", 2, async (err, hash) => {
    //             const newUser = new userModel({
    //                 name: req.user.name,
    //                 email: req.user.email,
    //                 password: hash,
    //                 image : req.user.avtar
    //             });
    //             await newUser.save();

    //             token_Generator(res, req.user.name, "login with google",req.user.avtar);
    //         });
    //     }
    // } catch (error) {
    //     res.status(500).send({ msg: "An error occurred while authenticating with Google" });
    // }
  }
);

//---------------- Functions Here -----------------------------------

function token_Generator(res, name, id, image) {
  console.log("token genrater : --", res, name, image);
  // let token = jwt.sign(
  //     { user: name, userID: id ,role : "User" },
  //     "jammi",
  //     { expiresIn: "7d" }
  // );
  // let refreshToken = jwt.sign(
  //     { user: name, id: id },
  //     "jammi",
  //     { expiresIn: "12d" }
  // );
  // res.cookie("token", token);
  // res.redirect(`http://127.0.0.1:5500/PROJECT_Front/index.html?token=${token}&username=${name}&image=${image}`)

  res.redirect(`https://vegy-food.vercel.app/`);
  // res.status(202).json({ refreshToken });
}

module.exports = { userRouter };
