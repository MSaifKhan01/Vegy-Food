// Express setup
const express = require("express");

const { MailRouter } = require("./Routes/MailRoute");
const {userRouter} =require("./Routes/UserRoutes")

const cors=require("cors")
const app = express();

// Middleware setup
app.use(express.json());
app.use(cors())
app.use("/",userRouter)

// Restaurant route
const fs = require("fs");
const path = require("path");
const router = require("./Routes/UserRoutes");
const dbFilePath = path.join(__dirname, "db.json");
app.get("/restaurants", (req, res) => {
    try {
        const { restaurantId } = req.query;
        if (restaurantId) {
            const data = JSON.parse(fs.readFileSync(dbFilePath, "utf-8"));
            const restaurant = data.RestraurentMenu.find(
                (ele) => ele.data.cards[0].card.card.info.id === restaurantId
            );
            if (restaurant) {
                res.json(restaurant);
            } else {
                res.status(404).json({ message: "Restaurant not found" });
            }
        } else {
            const data = fs.readFileSync(dbFilePath, "utf-8");
            res.json(JSON.parse(data).Restraurent);
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.use("/Mail", MailRouter);

// Start server
const port = 4000;
app.listen(port, () => {
    console.log(`Express Server is running on port ${port}`);
});
