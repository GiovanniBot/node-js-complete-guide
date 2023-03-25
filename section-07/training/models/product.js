const fs = require("fs");
const path = require("path");
const p = path.join(path.dirname(require.main.filename), "data", "products.json");
const Cart = require("./cart");

const getProductsFromFile = (callback) => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        callback([]);
      } else {
          callback(JSON.parse(fileContent));
      }
    });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        // Updating existing product
        const existingProductIndex = products.findIndex(prod => prod.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.error(err);
        });
      } else {
        // Creating new product
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.error(err);
        });
      }
    });
  }

  static deleteById(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);
      const updatedProducts = products.filter(p => p.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
        console.error(err);
      });
    });
  }

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