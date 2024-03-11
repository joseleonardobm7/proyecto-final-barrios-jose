import global from "../global/main.js";

export default class shoppingCartClass {
  constructor() {
    const shoppingCart = global.ls.getLocalStorage("shoppingCart") || {};
    const currentUser = global.ls.getLocalStorage("currentUser") || {};
    const userCart = shoppingCart[currentUser?._id] || [];
    this.products = [...userCart];
  }
  addProduct(allProducts, id, quantity) {
    const existingProduct = allProducts.find((p) => p.id === id);
    if (existingProduct) {
      const addedProduct = this.products.find((p) => p.id === id);
      if (addedProduct) {
        addedProduct.quantity += quantity;
        if (addedProduct.quantity <= 0) {
          this.products = this.products.filter((p) => p.id != id);
        }
      } else {
        const product = {
          id,
          title: existingProduct.title,
          price: existingProduct.price,
          quantity: quantity,
        };
        this.products.push(product);
      }
    } else {
      console.error("No se encontró el Producto con #" + id + "!");
    }
    const shoppingCart = global.ls.getLocalStorage("shoppingCart") || {};
    const currentUser = global.ls.getLocalStorage("currentUser") || {};
    shoppingCart[currentUser?._id] = [...this.products];
    global.ls.setLocalStorage("shoppingCart", shoppingCart);
  }
  listCart() {
    return this.products
      .map(
        (p) =>
          `<li>${p.quantity} unidad(es) de ${
            p.title
          } por $${p.price.toLocaleString("de-DE")} c/u.</li>`
      )
      .join("");
  }
  getTotalProducts() {
    return this.products.length;
  }
  getTotalCart() {
    let total = 0;
    this.products.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total;
  }
  idProducts() {
    return this.products.map((p) => p.id);
  }
  getProductQuantity(id) {
    const product = this.products.find((p) => p.id === id);
    return product?.quantity || 0;
  }
  emptyCart() {
    this.products.splice(0, this.products.length);
    const shoppingCart = global.ls.getLocalStorage("shoppingCart") || {};
    const currentUser = global.ls.getLocalStorage("currentUser") || {};
    delete shoppingCart[currentUser?._id];
    global.ls.setLocalStorage("shoppingCart", shoppingCart);
  }
  setShoppingCart() {
    const shoppingCart = global.ls.getLocalStorage("shoppingCart") || {};
    const currentUser = global.ls.getLocalStorage("currentUser") || {};
    const userCart = shoppingCart[currentUser?._id] || [];
    this.products = [...userCart];
  }
}
