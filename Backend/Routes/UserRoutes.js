const express = require("express");
const { passport } = require("../Helper/GoogleOauth");
const { UserModel } = require("../Model/userSchema");

const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const { sendEmailForOTP } = require("../Helper/Mail");

const userRouter = express.Router();




userRouter.post("/SignUp", async (req, res) => {
  const { username, email, password ,role} = req.body;

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
      const newUser = new UserModel({ username, email, password: hash ,role});
      
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
        // res.redirect(`http://localhost:1234/?userData=${encodeURIComponent(JSON.stringify({ existingUser, token }))}`);
        res.redirect(`https://vegy-food.vercel.app/?userData=${encodeURIComponent(JSON.stringify({ existingUser, token }))}`);
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

        // res.redirect(`http://localhost:1234/?userData=${encodeURIComponent(JSON.stringify({ user: newUserFromDB, token }))}`);
        res.redirect(`https://vegy-food.vercel.app/?userData=${encodeURIComponent(JSON.stringify({ user: newUserFromDB, token }))}`);
      }
    } catch (error) {
      console.error("Error during Google OAuth callback:", error);
      res.status(500).send({ msg: "An error occurred during Google OAuth callback" });
    }
  }
);





// Function to generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
var arr=[]



// Route to request OTP and update password
userRouter.post("/request-otp", async (req, res) => {
  const { email } = req.body;

  console.log("jghgbh2")

  try {
    // // Generate OTP
    // const otp = generateOTP();

    // Save OTP to user document in the database
    let UserData = await UserModel.findOneAndUpdate({ email });

 

    const otp = generateOTP();
     arr.push(otp)

    const emailData = {
      email: UserData.email,
      subject: "Your OTP - FORK & JSA Restaurant",
      body: `
        <html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto;">
          <div style="background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #333; text-align: center; margin-bottom: 20px;">OTP Verification</h2>
            
            <p style="font-size: 16px;">Dear ${UserData.username},</p>
      
            <p style="font-size: 18px; margin-bottom: 20px;">Your OTP for verification is: <span style="font-weight: bold; color: #ff5722;">${otp}</span></p>
            
            <p style="font-size: 16px; margin-bottom: 20px;">Please use this OTP to complete the verification process.</p>
            
            <p style="font-size: 16px;">Thank you for using our service!</p>
            
            <div style="border-top: 1px solid #ccc; margin-top: 30px; padding-top: 20px;">
              <p style="font-weight: bold; font-size: 16px; margin-bottom: 10px;">Best regards,</p>
              <p style="font-size: 16px;">FORK & JSA Restaurant Team</p>
            </div>
          </div>
        </div>
      </body>
      
        </html>
      `,
    };

    sendEmailForOTP(emailData);

    res.status(200).send({ email, otp });

  } catch (error) {
    console.error("Error requesting OTP:", error);
    res.status(500).send({ msg: "Failed to request OTP" });
  }
});



userRouter.post("/verify-otp", async (req, res) => {
  try {
    const { otp } = req.body;
    console.log("Received OTP from body:", otp);
    
    // Parse otp as an integer
    const numericOTP = parseInt(otp);
    console.log("Parsed OTP as integer:", numericOTP);
    
    console.log("Current arr:", arr);

    // Check if the OTP matches the one stored in memory or database
    if (!arr.includes(numericOTP)) {
      console.log("Invalid OTP:", numericOTP);
      return res.status(400).send({ msg: "Invalid OTP" });
    }
    
    console.log("Valid OTP:", numericOTP);
    
    // If OTP is valid, perform necessary actions (e.g., update password)
    // Example: Update the password
    // userData.password = newPassword;
    // await userData.save();

    // Clear the stored OTP from memory or database
    const index = arr.indexOf(numericOTP);
    arr.splice(index, 1);
    console.log("Updated arr:", arr);

    res.status(200).send({ msg: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).send({ error: "Failed to verify OTP" });
  }
});







// Route for updating password
userRouter.patch("/update-password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });

    // If user not found, return error
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Hash the new password
    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    // Send success response
    return res.status(200).json({ msg: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ error: "Failed to update password" });
  }
});


module.exports = { userRouter };
