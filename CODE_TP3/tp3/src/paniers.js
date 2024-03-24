const paniers = require("./paniers.json");
const products = require("./products.json");
const users = require("./users.json");

/**
 * @function
 * @param {Number} productId
 * Retourne les utilisateurs ayant acheté un produit
 * @returns {Array}
*/
function usersWhoBoughtProduct(productId) {
    if (!products.find(product => product.id === productId)) {
        throw new Error("Ce produit n'existe pas");
    }
    const users = paniers.filter(panier => panier.products.find(product => product.id === productId));
    if (users.length === 0) {
        throw new Error("Ce produit n'est présent dans aucun panier");
    }
    return users.map(user => user.userId);
}

/**
 * @function
 * @param {Number} userId
 * Retourne le prix total et le prix total de son (ou ses) panier(s)
 * @returns {Array}
 */
function totalPanier(userId) {
    const paniersUser = paniers.filter(panier => panier.userId === userId);
    if (paniersUser.length === 0) {
        return { "email": users.find(user => user.id === userId).email };
    }

    let totalPrice = 0;

    paniersUser.forEach(panier => {
        panier.products.forEach(product => {
            totalPrice += product.total;
        });
    });
    if (totalPrice >= 1000) {
        return { "utilisateur": users.find(user => user.id === userId).lastName + " " + users.find(user => user.id === userId).firstName, "total": totalPrice, "email": users.find(user => user.id === userId).email };
    }
    return { "utilisateur": users.find(user => user.id === userId).lastName + " " + users.find(user => user.id === userId).firstName, "total": totalPrice };
}

console.log(totalPanier(79));
module.exports = { 
    usersWhoBoughtProduct, 
    totalPanier };
