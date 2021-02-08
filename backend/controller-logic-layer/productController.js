const express = require("express");
const productsLogic = require("../business-logic-layer/products-logic");

const router = express.Router();

router.get("/", async (request, response) => {
    try {
        const categories = await productsLogic.getAllCategoriesAsync();
        response.json(categories);
    } catch (error) {
        response.status(500).send(error.message);
    }
})

router.get("/:id", async (request, response) => {
    try {
        const id = +request.params.id;
        const products = await productsLogic.getProductsByCategoryAsync(id);
        response.json(products);
    } catch (error) {
        response.status(500).send(error.message);
    }
})

router.post("/", async (request, response) => {
    try {
        const product = request.body;
        const newProduct = await productsLogic.addNewProductAsync(product);
        response.status(201).json(newProduct);
    } catch (error) {
        response.status(500).send(error.message);
    }
})

router.delete("/:id", async (request, response) => {
    try {
        const id = +request.params.id;
        await productsLogic.deleteProductAsync(id);
        response.sendStatus(204);
    } catch (error) {
        response.status(500).send(error.message);
    }
})

module.exports = router;