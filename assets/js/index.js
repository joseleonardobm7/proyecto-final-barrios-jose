import integrations from "./integrations/main.js";
import renders from "./renders/main.js";
import classes from "./classes/main.js";

// INICIALIZADOS DATOS DE AMBIENTE
const environmentData = {
  // VARIABLE PARA RENDERIZADO
  renderedType: "allProducts",
  // OBTENER PRODUCTOS Y CATEGORIAS
  allCategories: await integrations.categories.getCategories(),
  allProducts: await integrations.products.getProducts(),
  // INICIALIZANDO CLASES
  users: new classes.users(),
  wishList: new classes.wishList(),
  shoppingCart: new classes.shoppingCart(),
  currentUser: new classes.currentUser(),
};
// RENDERIZAR NAVBAR
renders.navbar.renderNavbarOptions(environmentData);
// RENDERIZAR CATEGORIAS NAVBAR
renders.categories.renderCategories(environmentData);
// AGREGAR CLICKS DE NAVEGACION
renders.navbar.addNavBarClicks(environmentData);
// RENDERIZAR PRODUCTOS
renders.products.renderProducts(environmentData);

/* 
// ABRIR MODAL DE INICIO DE SESIÓN
renders.login.showLoginModal();

// FUNCION PARA PROCESAR COMPRA
const processPurchase = (quantity) => {
  alert(
    "Estamos procesando tu compra, agradecemos tu paciencia y preferencia."
  );
  let message =
    "Estimado " +
    buyData.name +
    " con DNI " +
    buyData.dni +
    ", hemos procesado su compra de los siguientes articulos: \n";
  let subTotal = shoppingCart.getTotalCart();
  message += shoppingCart.listCart();
  message += "\n SubTotal: $" + subTotal;
  message += "\n IVA: $" + subTotal * 0.19;
  message += "\n Total: $" + (subTotal * 0.19 + subTotal);

  message += "\n Muchas gracias por tu compra, esperamos verte nuevamente.";
  sayBye(message);
};
 */
