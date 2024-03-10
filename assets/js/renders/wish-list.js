const renderWishListQty = (wishList) => {
  const wishListQty = document.getElementById("wishlist-qty");
  wishListQty.innerHTML = wishList.getTotalProducts();
};

export default {
  renderWishListQty,
};
