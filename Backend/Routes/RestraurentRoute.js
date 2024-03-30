



const express=require("express")
const fs = require("fs");

const path = require("path");

const RestraurentRoute=express.Router()

const dbFilePath = path.join(__dirname, "../db.json");
RestraurentRoute.get("/restaurants", (req, res) => {
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

module.exports={
    RestraurentRoute
}