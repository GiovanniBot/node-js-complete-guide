const fs = require("fs");
const path = require("path");
const p = path.join(path.dirname(require.main.filename), "data", "products.json");

const getProductsFromFile = (callback) => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        callback([]);
      } else {
        try {
          const products = JSON.parse(fileContent);
          callback(products);
        } catch (err) {
          console.error("Error parsing json data:", err);
          callback([]);
        }
      }
    });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.error(err);
      });
    });
  };

  static fetchAll(callback) {
    getProductsFromFile(callback);
  };

  static findById(id, callback) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      callback(product);
    });
  };
};