import global from "../global/main.js";

export default class wishListClass {
  constructor() {
    const wishList = global.ls.getLocalStorage("wishList") || {};
    const currentUser = global.ls.getLocalStorage("currentUser") || {};
    const userProducts = wishList[currentUser?._id] || [];
    this.products = [...userProducts];
  }
  manageProduct(idProduct) {
    const wishList = global.ls.getLocalStorage("wishList") || {};
    const currentUser = global.ls.getLocalStorage("currentUser") || {};
    let userProducts = wishList[currentUser?._id] || [];
    console.log(wishList, currentUser, userProducts);
    const product = userProducts.find((p) => p === idProduct);
    if (product) userProducts = userProducts.filter((p) => p !== idProduct);
    else userProducts.push(idProduct);
    this.products = [...userProducts];
    if (!!currentUser?._id) wishList[currentUser._id] = this.products;
    global.ls.setLocalStorage("wishList", wishList);
  }
  setWishList() {
    const wishList = global.ls.getLocalStorage("wishList") || {};
    const currentUser = global.ls.getLocalStorage("currentUser") || {};
    const userProducts = wishList[currentUser?._id] || [];
    this.products = [...userProducts];
  }
  getTotalProducts() {
    return this.products.length;
  }
}
