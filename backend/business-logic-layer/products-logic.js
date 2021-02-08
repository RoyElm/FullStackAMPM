const dal = require("../data-access-layer/dal");

// async function getAllProductsAsync() {
//     const sql = `SELECT id,name,dateManufacture,dateExpiration,c.categoryName,price 
//                 FROM products as p left join categories as c
//                  on p.categoryId = c.categoryId`;
//     const products = dal.executeAsync(sql);
//     return products;
// }

async function getAllCategoriesAsync() {
    const sql = `SELECT categorieId,categorieName FROM categories as c`;
    const categories = await dal.executeAsync(sql);
    return categories;
}

async function getProductsByCategoryAsync(categoryId) {
    const sql = `SELECT id,name,dateManufacture,dateExpiration,c.categorieName,price 
                FROM products as p right join categories as c
                 on p.categoryId = c.categorieId WHERE c.categorieId = ?`;
    const products = await dal.executeAsync(sql, [categoryId]);
    return products;
}

async function addNewProductAsync(product) {
    const sql = `INSERT INTO products VALUES(DEFAULT,?,?,?,?,?)`;
    const info = await dal.executeAsync(sql, [product.name, product.dateManufacture, product.dateExpiration, product.categoryId, product.price]);
    product.id = info.insertId;
    return product;
}

async function deleteProductAsync(id) {
    const sql = `DELETE FROM products WHERE id = ?`;
    await dal.executeAsync(sql, [id]);
}

module.exports = {
    getAllCategoriesAsync,
    getProductsByCategoryAsync,
    addNewProductAsync,
    deleteProductAsync
}
