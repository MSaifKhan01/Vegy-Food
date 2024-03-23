// Express setup
const express = require("express");

const { MailRouter } = require("./Routes/MailRoute");
const {userRouter} =require("./Routes/UserRoutes")

const cors=require("cors");
const { RestraurentRoute } = require("./Routes/RestraurentRoute");
const { DB } = require("./DB/db");
const app = express();

// Middleware setup
app.use(express.json());
app.use(cors())
app.use("/",userRouter)
app.use("/Mail", MailRouter);

app.use("/",RestraurentRoute)

// Start server
const port = 4000;
app.listen(port, async() => {

    try {
        await DB
        console.log("Coonnected DB");
    } catch (error) {
        console.log(error);
    }
    console.log(`Express Server is running on port ${port}`);
});
