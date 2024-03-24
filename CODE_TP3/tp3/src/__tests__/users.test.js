const { age, numero, userInfos } = require('../users');

describe('age', () => {
  it('retourne la liste des utilisateurs de plus de 50 ans', () => {
    const users = [
      { id: 1, firstName: "Terry", lastName: "Medhurst", age: 50 },
      { id: 2, firstName: "Sheldon", lastName: "Quigley", age: 28 }
    ];
    expect(age(users)).toEqual([{ id: 1, firstName: "Terry", lastName: "Medhurst", age: 50 }]);
  });
});

describe('numero', () => {
  it('retourne la liste des numéros de téléphone des utilisateurs de plus de 50 ans', () => {
    const users = [
      { id: 1, firstName: "Terry", lastName: "Medhurst", age: 50, phone: "+63 791 675 8914" },
      { id: 2, firstName: "Sheldon", lastName: "Quigley", age: 28, phone: "+12 345 678 9101" }
    ];
    expect(numero(users)).toEqual(["+63 791 675 8914"]);
  });
});

describe('userInfos', () => {
  const users = [
    { id: 1, firstName: "Terry", lastName: "Medhurst", age: 50 },
    { id: 2, firstName: "Sheldon", lastName: "Quigley", age: 28 }
  ];

  const products = [
    { id: 1, title: "iPhone 9", category: "smartphones", rating: 4.69 },
    { id: 2, title: "Samsung Galaxy S20", category: "smartphones", rating: 4.8 }
  ];

  it('retourne les informations relatives à l\'utilisateur', () => {
    expect(userInfos(users, products, 1)).toEqual([
      { id: 2, title: "Samsung Galaxy S20", category: "smartphones", rating: 4.8 }
    ]);
  });
});
