import global from "../global/main.js";

export default class wishListClass {
  constructor() {
    this.products = global.ls.getLocalStorage("wishList") || [];
  }
  manageProduct(id) {
    const product = this.products.find((p) => p === id);
    if (product) this.products = this.products.filter((p) => p !== id);
    else this.products.push(id);
    global.ls.setLocalStorage("wishList", this.products);
  }
  getTotalProducts() {
    return this.products.length;
  }
}
