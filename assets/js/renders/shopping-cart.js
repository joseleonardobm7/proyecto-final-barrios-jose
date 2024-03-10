const renderShoppingCartQty = (shoppingCart) => {
  const shoppingCartQty = document.getElementById("shopping-cart-qty");
  shoppingCartQty.innerHTML = shoppingCart.getTotalProducts();
};

export default {
  renderShoppingCartQty,
};
