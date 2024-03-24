const usersData = require("./users.json");
const productsData = require("./products.json");

/**
 * @function
 * @param {Array} users
 * Retourne la liste des utilisateurs de plus de 50 ans
 * @returns {Array}
 */
function age(users) {
  return users.filter((user) => user.age >= 50);
}

/**
 * @function
 * @param {Array} users
 * Retourne la liste des numéros de téléphone des utilisateurs de plus de 50 ans
 * @returns {Array}
 */
function numero(users) {
  return age(users).map(user => user.phone);
}

/**
 * @function
 * @param {Array} users
 * @param {Array} productsData
 * @param {number} id
 * Retourne les informations relatives à l'utilisateur
 * @returns {Array}
 */
function userInfos(users, productsData, id) {
  const user = users.find((user) => user.id === id);
  if (!user) {
    throw new Error("User not found");
  }

  if (user.age < 18) {
    throw new Error("Site interdit aux mineurs");
  }

  if (user.age >= 18 && user.age <= 25) {
    return productsData.filter((product) => product.category === "smartphones").sort((a, b) => b.price - b.discountPrice).slice(0, 10);
  }

  if (user.age >= 26 && user.age <= 50) {
    return productsData.filter((product) => product.rating > 4.7);
  }

  if (user.age > 50) {
    return productsData.filter((product) => product.category === "smartphones");
  }
}


console.log(userInfos(usersData, productsData, 4));

module.exports = {
  age,
  numero,
  userInfos,
};
