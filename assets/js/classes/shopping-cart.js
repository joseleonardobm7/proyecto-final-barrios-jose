import global from "../global/main.js";

export default class shoppingCartClass {
  constructor() {
    this.products = global.ls.getLocalStorage("shoppingCart") || [];
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
    global.ls.setLocalStorage("shoppingCart", this.products);
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
    global.ls.setLocalStorage("shoppingCart", this.products);
  }
}
