global.config = require("./config.json");
const express = require("express");
const cors = require("cors");
const productController = require("./controller-logic-layer/productController");


const server = express();

server.use(express.json());
server.use(cors());
server.use("/api/ampm", productController);

server.listen(3001,() => console.log("Listening...."))