const { usersWhoBoughtProduct, totalPanier } = require("../paniers.js");

const paniers = require("../paniers.json");
const products = require("../products.json");

describe("usersWhoBoughtProduct", () => {
    describe("Si le produits n'existe pas", () => {
        it("Doit retourner une erreur", () => {
            expect(() => usersWhoBoughtProduct(500)).toThrow("Ce produit n'existe pas");
        });
    });
    describe("Si le produit n'est présent dans aucun panier", () => {
        it("Doit retourner une erreur", () => {
            expect(() => usersWhoBoughtProduct(5)).toThrow("Ce produit n'est présent dans aucun panier");
        });
    });

    describe("Si le produit existe et est présent dans des paniers", () => {
        it("Doit retourner les utilisateurs ayant acheté le produit", () => {
            expect(usersWhoBoughtProduct(1)).toEqual([ 79 ]);
        });
    });
});
describe("totalPanier", () => {
    describe("Si l'utilisateur n'a pas de panier", () => {
        it("Doit retourner l'email de l'utilisateur", () => {
            expect(totalPanier(6)).toEqual({ email: 'jtreleven5@nhs.uk' })
        });
    });
    describe("Si l'utilisateur a un prix total supérieur a 1000", () => {
        it("Doit retourner le prix total et le prix total de son (ou ses) panier(s)", () => {
            expect(totalPanier(1)).toEqual({
                utilisateur: 'Medhurst Terry',
                total: 1129,
                email: 'atuny0@sohu.com'
                });
        });
    });
});
