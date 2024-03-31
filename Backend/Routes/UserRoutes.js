const express = require("express");
const { passport } = require("../Helper/GoogleOauth");
const { UserModel } = require("../Model/userSchema");

const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const userRouter = express.Router();




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

  




  try {
    const isUser = await UserModel.findOne({ email });
    if (!isUser) {
      return res.status(200).send({ msg: "You are not  signed up, You need to SignUp" });
    }

    bcrypt.compare(password,isUser.password,((err,result)=>{
      if(result){

        console.log("-----user--",isUser,isUser.role,"-----------")

        const token=jwt.sign({userID:isUser._id,role:isUser.role},process.env.tokenSecretSign,{expiresIn:"24h"})
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



// //---------------- Functions Here -----------------------------------

// function token_Generator(res, name, id, image) {
//   console.log("token genrater : --", res, name, image);
//   // let token = jwt.sign(
//   //     { user: name, userID: id ,role : "User" },
//   //     "jammi",
//   //     { expiresIn: "7d" }
//   // );
//   // let refreshToken = jwt.sign(
//   //     { user: name, id: id },
//   //     "jammi",
//   //     { expiresIn: "12d" }
//   // );
//   // res.cookie("token", token);
//   // res.redirect(`http://127.0.0.1:5500/PROJECT_Front/index.html?token=${token}&username=${name}&image=${image}`)

//   res.redirect(`https://vegy-food.vercel.app/`);
//   // res.status(202).json({ refreshToken });
// }


userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  async function (req, res) {
    try {
      const userData = req.user; // User data returned from Google OAuth
      const existingUser = await UserModel.findOne({ email: userData.email });

      if (existingUser) {
        // User already exists, update the password with the encrypted access token
        const encryptedToken = bcrypt.hashSync(userData.accessToken, 10); // Encrypt the access token
        await UserModel.findByIdAndUpdate(existingUser._id, { password: encryptedToken });

        const token = jwt.sign({ userID: existingUser._id,role:existingUser.role }, process.env.tokenSecretSign, { expiresIn: "24h" });
        console.log("--------------------user Updated------------------")
        res.redirect(`http://localhost:1234/?userData=${encodeURIComponent(JSON.stringify({ existingUser, token }))}`);
      } else {
        // Create a new user with encrypted access token as password
        const encryptedToken = bcrypt.hashSync(userData.accessToken, 10); // Encrypt the access token

        let userdata = {
          username: userData.username,
          email: userData.email,
          password: encryptedToken,
        };

        const newUser = new UserModel(userdata);
        await newUser.save();

        // Fetch the newly created user from the database
        const newUserFromDB = await UserModel.findOne({ email: userData.email });
        const token = jwt.sign({ userID: newUserFromDB._id,role:existingUser.role }, process.env.tokenSecretSign, { expiresIn: "24h" });

        console.log("--------------------new user added------------------")

        res.redirect(`http://localhost:1234/?userData=${encodeURIComponent(JSON.stringify({ user: newUserFromDB, token }))}`);
      }
    } catch (error) {
      console.error("Error during Google OAuth callback:", error);
      res.status(500).send({ msg: "An error occurred during Google OAuth callback" });
    }
  }
);




module.exports = { userRouter };
