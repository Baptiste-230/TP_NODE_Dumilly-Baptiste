const products = require("./products.json")

/**
 * @function
 * @param {Array} products
 * Retourne le nom et la disponibilité des produits par catégorie
 * @returns {Object}
 */
function productsInfo(products) {
    if (Object.keys(products).length === 0) {
        throw new Error("La liste des produits est vide");
    }

    const categorizedProducts = {};
    products.forEach(product => {

        const category = product.category;

        if (!categorizedProducts[category]) {
            categorizedProducts[category] = [];
        }

        let stockStatus;
        const stock = product.stock;

        if (stock < 10) {
            stockStatus = "low";
        } else if (stock >= 10 && stock <= 50) {
            stockStatus = "medium";
        } else {
            stockStatus = "high";
        }

        categorizedProducts[category].push({ libelle: product.title, dispo: stockStatus });
    });

    return categorizedProducts;
}

module.exports = { productsInfo };
