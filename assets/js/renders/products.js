import integrations from "../integrations/main.js";
import renders from "../renders/main.js";
import alerts from "../alerts/main.js";

const modifyQuantity = (environmentData, productId, quantity) => {
  const { allProducts, shoppingCart } = environmentData;
  shoppingCart.addProduct(allProducts, productId, quantity);
  // Renderizar los productos actualizados
  renderProducts(environmentData);
};

const manageProductsWishList = (environmentData, productId) => {
  const { wishList, currentUser } = environmentData;
  // DETENER COMPORTAMIENTO DE HREF
  // event.preventDefault();
  // MARCAR/DESMARCAR PRODUCTO COMO FAVORITO
  wishList.manageProduct(productId);
  // RENDERIZAR PRODUCTOS ACTUALIZADOS
  renderProducts(environmentData);
};

const generateStarsRatings = (rate, low, up) => {
  const rating = rate || 0;
  const icon =
    rating <= low
      ? " bi-star"
      : rating > low && rating < up
      ? " bi-star-half"
      : " bi-star-fill";
  return icon;
};

const renderProducts = (environmentData) => {
  const {
    renderedType,
    allCategories,
    allProducts,
    shoppingCart,
    wishList,
    currentUser,
  } = environmentData;
  let title = document.getElementById("title-products");
  let container = document.getElementById("products-container");
  let productList = "";
  const filter = document.getElementById("search-input");
  const filterValue = filter.value;
  const types = {};
  const dictionary = {
    electronics: "Electrónicos",
    jewelery: "Joyería",
    "men's clothing": "Ropa de Hombre",
    "women's clothing": "Ropa de Mujer",
  };
  allCategories.forEach((c) => {
    types[c] = {
      title: dictionary[c],
      setProducts: (allProducts) => {
        const products = allProducts.filter(
          (product) => product.category === c
        );
        return products;
      },
    };
  });
  types["allProducts"] = {
    title: "Todos Los Productos",
    setProducts: (allProducts) => {
      return allProducts;
    },
  };
  types["shoppingCart"] = {
    title: "Mi Carrito de Compras",
    setProducts: (allProducts) => {
      const products = allProducts.filter((product) =>
        shoppingCart.idProducts().includes(product.id)
      );
      return products;
    },
    aditional: `<button type="button" id="purchaseButton" class="btn btn-success ms-2 ${
      !shoppingCart.getTotalCart() > 0 || currentUser?.validated !== true
        ? "disabled"
        : ""
    }"> Procesar Compra </button>`,
  };
  types["wishList"] = {
    title: "Mi Lista de Deseo",
    setProducts: (allProducts) => {
      const products = allProducts.filter((product) =>
        wishList.products.includes(product.id)
      );
      return products;
    },
  };
  types["bestSellers"] = {
    title: "Top 6 Más Vendidos",
    setProducts: (allProducts) => {
      const products = allProducts.sort(
        (a, b) => b.rating.count - a.rating.count
      );
      return products.slice(
        0,
        (products?.length || 0) > 6 ? 6 : products?.length || 0
      );
    },
  };
  types["mostValued"] = {
    title: "Top 6 Mejores Valorados",
    setProducts: (allProducts) => {
      const products = allProducts.sort(
        (a, b) => b.rating.rate - a.rating.rate
      );
      return products.slice(
        0,
        (products?.length || 0) > 6 ? 6 : products?.length || 0
      );
    },
  };
  const selectedData = types[renderedType];
  const selectedProducts = filterValue
    ? selectedData
        .setProducts(allProducts)
        .filter((p) =>
          (p?.title || "")
            .toLowerCase()
            .includes((filterValue || "").toLowerCase())
        )
    : selectedData.setProducts(allProducts);
  const selectedTitle = selectedData.title;
  const totalProducts = selectedProducts?.length || 0;
  selectedProducts.forEach((product) => {
    productList += `<div class="d-flex justify-content-center container-product">
    <div class="card border-0 rounded-0 shadow m-1" style="max-width: 18rem;">
    <img src="${
      product?.image
    }" style="width: 300px; height: 300px;" class="card-img-top rounded-0 img-fluid" alt="${
      product?.title || "image"
    } - ${product?.description || "description"}">

      <div class="card-body mt-3 bgColorTerciary">
        <div class="row">
          <div class="col-10">
            <h4 class="card-title"> ${product.title}</h4>
            <p class="card-text">
              ${product?.rating?.rate || 0}
              <i class="bi${generateStarsRatings(
                product?.rating?.rate,
                0,
                1
              )} text-warning"></i>
              <i class="bi${generateStarsRatings(
                product?.rating?.rate,
                1,
                2
              )} text-warning"></i>
              <i class="bi${generateStarsRatings(
                product?.rating?.rate,
                2,
                3
              )} text-warning"></i>
              <i class="bi${generateStarsRatings(
                product?.rating?.rate,
                3,
                4
              )} text-warning"></i>
              <i class="bi${generateStarsRatings(
                product?.rating?.rate,
                4,
                5
              )} text-warning"></i>
              (${product?.rating?.count || 0})
            </p>
          </div>
          <div class="col-2">
            <div
              class="btn wish-list-toggle border-0 p-0 ${
                !currentUser?._id ? "disabled" : ""
              }"
              data-value="${product.id}"
            >
              <i class="bi
                bi-bookmark-${
                  !wishList.products.includes(product.id) ? "plus" : "dash"
                } 
                fs-2 
                text-${
                  !wishList.products.includes(product.id) ? "success" : "danger"
                }
                me-4"
              >
              </i>
            </div>
          </div>
        </div>
      </div>
      <div class="row align-items-center text-center g-0 bgColorTerciary">
        <div class="col-4 d-flex justify-content-start align-items-center px-1 ">
          <i class="bi bi-coin text-success fs-3"></i>
          <div class="d-flex flex-column align-items-center justify-content-center">
            <div class="text-center"> <b> Precio </b> </div>
            <div class="p-2"> $${product.price.toLocaleString("de-DE")} </div>
          </div>
        </div>
        <div class="col-8 d-flex justify-content-start align-items-center bg-dark px-2">
          <i class="bi bi-cart-fill text-success fs-3"></i>
          <div class="d-flex flex-column align-items-start">
            <div class="p-2 text-white"> <b> Cantidad: </b>
              ${shoppingCart.getProductQuantity(product.id)}
            </div>
            <div class="p-2 text-white"> <b> Subtotal: </b>
              $${(
                (product.price || 0) *
                shoppingCart.getProductQuantity(product.id)
              ).toLocaleString("de-DE")}
            </div>
          </div>
        </div>
      </div>
      <div class="row align-items-center text-center g-0">
        <div class="col-12 d-flex justify-content-center">
          <div
            class="btn-product-subtract-qty btn btn-danger text-warning w-50 p-3 rounded-0 ${
              !shoppingCart.idProducts().includes(product.id) ||
              currentUser?.validated !== true
                ? "disabled"
                : ""
            }"
            data-value="${product.id}"
          >
            Restar Unidad
          </div>
          <div
            class="btn-product-add-qty btn btn-success text-warning w-50 p-3 rounded-0 ${
              currentUser?.validated !== true ? "disabled" : ""
            }""
            data-value="${product.id}"
          >
            Sumar Unidad
          </div>
        </div>
      </div>
    </div>
  </div>\n`;
  });
  if (productList === "")
    productList = `<div> No existen productos agregados ${
      renderedType === "wishList" ? "como favoritos." : "al carrito"
    } </div>`;
  container.innerHTML = productList;
  title.innerHTML = `<h5 class="h2"> ${selectedTitle} (${totalProducts.toLocaleString(
    "de-DE"
  )}) ${selectedData.aditional || ""} </h5>`;
  renders.shoppingCart.renderShoppingCartQty(shoppingCart);
  renders.wishList.renderWishListQty(wishList);
  // AGREGAR CLICKS PARA RESTAR
  const addButtons = document.querySelectorAll(".btn-product-subtract-qty");
  addButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = parseInt(this.getAttribute("data-value"));
      modifyQuantity(environmentData, productId, -1);
    });
  });
  // AGREGAR CLICKS PARA RESTAR
  const subtractButtons = document.querySelectorAll(".btn-product-add-qty");
  subtractButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = parseInt(this.getAttribute("data-value"));
      modifyQuantity(environmentData, productId, 1);
    });
  });
  // AGREGAR CLICK PARA FAVORITOS
  const wishListButtons = document.querySelectorAll(".wish-list-toggle");
  wishListButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = parseInt(this.getAttribute("data-value"));
      manageProductsWishList(environmentData, productId);
    });
  });
  // AGREGAR CLICK DE COMPRAR (SI EXISTE)
  const purchaseButton = document.getElementById("purchaseButton");
  if (purchaseButton) {
    purchaseButton.addEventListener("click", async () => {
      const subtotal = shoppingCart.getTotalCart();
      const iva = Math.round(subtotal * 0.19);
      const total = subtotal + iva;
      const userName = currentUser?.name || "Usuario";
      const userDNI = currentUser?.dni || '"No ingresado"';
      const userEmail = currentUser?.email || "joselbarrios317@gmail.com";
      const message = `
        <div style="text-align: left;">
          <p>Estimado ${userName} con DNI ${userDNI}, ¿Desea comprar los siguientes artículos?:</p>
          <ul class="py-3">
            ${shoppingCart.listCart()}
          </ul>
          <div style="text-align: right;" class="py-5">
            <p> SubTotal: $${subtotal.toLocaleString("de-DE")} </p>
            <p> IVA: $${iva.toLocaleString("de-DE")} </p>
            <p> Total: $${total.toLocaleString("de-DE")} </p>
          </div>
          <p> El comprobante de la compra se enviará via correo.</p>
        </div>
      `;
      const purchaseAlert = await alerts.purchase.confirmPurchase(message);
      if (purchaseAlert.isConfirmed) {
        const templateParams = {
          userName,
          userDNI,
          products: shoppingCart.listCart(),
          subtotal,
          iva,
          total,
          toEmail: userEmail,
        };
        integrations.purchaseEmail.proccessPurchase(templateParams);
        shoppingCart.emptyCart();
        renderProducts(environmentData);
      }
    });
  }
};
export default {
  renderProducts,
};
