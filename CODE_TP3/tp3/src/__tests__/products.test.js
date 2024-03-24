const { productsInfo } = require("../products.js"); 

// Données de produits de test
const testProducts = [
    { title: "Produit 1", category: "Catégorie A", stock: 5 },
    { title: "Produit 2", category: "Catégorie A", stock: 15 },
    { title: "Produit 3", category: "Catégorie B", stock: 30 },
    { title: "Produit 4", category: "Catégorie B", stock: 60 },
    { title: "Produit 5", category: "Catégorie C", stock: 3 },
];

const testArrayVoid = {};

describe("products.js", () => {
    describe("productsInfo", () => {
        it("Doit retourner le nom et la disponibilité des produits par catégorie", () => {
            const res = productsInfo(testProducts);
            expect(res).toEqual({
                "Catégorie A": [
                    { libelle: "Produit 1", dispo: "low" },
                    { libelle: "Produit 2", dispo: "medium" },
                ],
                "Catégorie B": [
                    { libelle: "Produit 3", dispo: "medium" },
                    { libelle: "Produit 4", dispo: "high" },
                ],
                "Catégorie C": [
                    { libelle: "Produit 5", dispo: "low" },
                ],
            });
        });
    });
    it("Doit throw une erreur car la liste des produits est vide", () => {
        expect(() => {
            productsInfo(testArrayVoid);
        }).toThrow(new Error("La liste des produits est vide"));
    });
});