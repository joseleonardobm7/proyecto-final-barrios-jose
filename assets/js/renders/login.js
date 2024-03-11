import validator from "validator";
import alerts from "../alerts/main.js";
import renders from "../renders/main.js";
import shoppingCart from "./shopping-cart.js";

const renderUserOptions = (userName) => {
  // RENDERIZAR BOTON DE OPCIONES DE USUARIO
  const userOptions = document.getElementById("user-options");
  const optionsButton = userOptions.querySelector(".dropdown-toggle");
  optionsButton.textContent = userName || "123";
  userOptions.classList.remove("d-none");
  // OCULTAR BOTONES DE INICIO DE SESIÓN Y CREAR USUARIO
  const accountAdd = document.getElementById("account-add");
  accountAdd.classList.add("d-none");
  const account = document.getElementById("account");
  account.classList.add("d-none");
};

const renderLoginOptions = () => {
  // OCULTAR BOTON DE OPCIONES DE USUARIO
  const userOptions = document.getElementById("user-options");
  userOptions.classList.add("d-none");
  // MOSTRAR BOTONES DE INICIO DE SESIÓN Y CREAR USUARIO
  const accountAdd = document.getElementById("account-add");
  accountAdd.classList.remove("d-none");
  const account = document.getElementById("account");
  account.classList.remove("d-none");
};

// FUNCION PARA VALIDAR FORMULARIO DE CREACIÓN DE USUARIO
const createUserValidForm = (users) => {
  let validForm = true;
  // VALIDAR NOMBRE
  const nameNewUser = document.getElementById("name-new-user").value.trim();
  const nameNewUserText = document.getElementById("text-name-new-user");
  if (!nameNewUser) {
    nameNewUserText.textContent = "Debe Ingresar un Nombre";
    nameNewUserText.classList.add("text-danger");
    nameNewUserText.classList.remove("text-black", "text-muted");
    validForm = false;
  } else if (nameNewUser.length < 5) {
    nameNewUserText.textContent = "El nombre ingresado es muy corto";
    nameNewUserText.classList.add("text-danger");
    nameNewUserText.classList.remove("text-black", "text-muted");
    validForm = false;
  } else {
    nameNewUserText.textContent = "Con este nombre emitiremos tus compras";
    nameNewUserText.classList.add("text-black", "text-muted");
    nameNewUserText.classList.remove("text-danger");
  }
  // VALIDAR EMAIL
  const emailNewUser = document.getElementById("email-new-user").value.trim();
  const emailNewUserText = document.getElementById("text-email-new-user");
  if (!emailNewUser) {
    emailNewUserText.textContent = "Debe Ingresar un Email";
    emailNewUserText.classList.add("text-danger");
    emailNewUserText.classList.remove("text-black", "text-muted");
    validForm = false;
  } else if (!validator.isEmail(emailNewUser)) {
    emailNewUserText.textContent = "Debe Ingresar un Email Válido";
    emailNewUserText.classList.add("text-danger");
    emailNewUserText.classList.remove("text-black", "text-muted");
    validForm = false;
  } else if (!!users.userVerify(emailNewUser)?._id) {
    emailNewUserText.textContent =
      "Ya existe un usuario registrado con este email";
    emailNewUserText.classList.add("text-danger");
    emailNewUserText.classList.remove("text-black", "text-muted");
    validForm = false;
  } else {
    emailNewUserText.textContent = "Con este correo deberás iniciar sesión";
    emailNewUserText.classList.add("text-black", "text-muted");
    emailNewUserText.classList.remove("text-danger");
  }
  // VALIDAR PASSWORD
  const passwordNewUser = document.getElementById("password-new-user").value;
  const passwordNewUserText = document.getElementById("text-password-new-user");
  if (!passwordNewUser) {
    passwordNewUserText.textContent = "Debe Ingresar una Contraseña";
    passwordNewUserText.classList.add("text-danger");
    passwordNewUserText.classList.remove("text-black", "text-muted");
    validForm = false;
  } else if (passwordNewUser.length < 8) {
    passwordNewUserText.textContent =
      "La contraseña debe tener mínimo 8 carácteres";
    passwordNewUserText.classList.add("text-danger");
    passwordNewUserText.classList.remove("text-black", "text-muted");
    validForm = false;
  } else {
    passwordNewUserText.textContent = "Debe contener al menos 8 carácteres";
    passwordNewUserText.classList.add("text-black", "text-muted");
    passwordNewUserText.classList.remove("text-danger");
  }
  // VALIDAR PASSWORD 2
  const password2NewUser = document.getElementById("password2-new-user").value;
  const password2NewUserText = document.getElementById(
    "text-password2-new-user"
  );
  if (!password2NewUser) {
    password2NewUserText.textContent = "Debe confirmar la Contraseña";
    password2NewUserText.classList.add("text-danger");
    password2NewUserText.classList.remove("text-black", "text-muted");
    validForm = false;
  } else if (passwordNewUser != password2NewUser) {
    password2NewUserText.textContent =
      "La confirmación de la contraseña debe coincidir con la ingresada antes";
    password2NewUserText.classList.add("text-danger");
    password2NewUserText.classList.remove("text-black", "text-muted");
    validForm = false;
  } else {
    password2NewUserText.textContent =
      "Repita la contraseña ingresada anteriormente";
    password2NewUserText.classList.add("text-black", "text-muted");
    password2NewUserText.classList.remove("text-danger");
  }
  // HABILIAR/DESHABILITAR BOTON
  const buttonCreateUser = document.getElementById("button-create-user");
  if (validForm) buttonCreateUser.classList.remove("disabled");
  else buttonCreateUser.classList.add("disabled");
};

// MOSTRAR/OCULTAR MODAL DE CREAR USUARIO
const loginAddModal = new bootstrap.Modal(
  document.getElementById("loginAddModal"),
  {
    backdrop: "static",
    keyboard: false,
  }
);
const closeLoginAddModal = () => loginAddModal.hide();
const showLoginAddModal = (environmentData) => {
  const { users } = environmentData;
  // MOSTRAR EL MODAL DE CREAR USUARIO
  loginAddModal.show();
  // VALIDAR FORMULARO
  const createUserForm = document.getElementById("create-user-form");
  createUserForm.addEventListener("input", () => {
    createUserValidForm(users);
  });
  // AGREGAR CLICK AL BOTON DE CREAR
  const buttonCreateUser = document.getElementById("button-create-user");
  buttonCreateUser.addEventListener("click", async () => {
    const nameNewUser = document.getElementById("name-new-user").value.trim();
    const emailNewUser = document.getElementById("email-new-user").value.trim();
    const passwordNewUser = document.getElementById("password-new-user").value;
    users.createUser(nameNewUser, emailNewUser, passwordNewUser);
    closeLoginAddModal();
    await alerts.user.createdUser();
    showLoginModal(environmentData);
  });
};

// MOSTRAR/OCULTAR MODAL DE INICIO DE SESION
const loginModal = new bootstrap.Modal(document.getElementById("loginModal"), {
  backdrop: "static",
  keyboard: false,
});
const closeLoginModal = () => {
  loginModal.hide();
};
const showLoginModal = async (environmentData) => {
  const { users, currentUser, wishList, shoppingCart } = environmentData;
  if (!currentUser?._id) await loginModal.show();
  // CLICK PARA INCIAR SESION
  const buttonLogin = document.getElementById("buttonLogin");
  buttonLogin.addEventListener("click", async () => {
    const emailUser = document.getElementById("email-user").value.trim();
    const passwordUser = document.getElementById("password-user").value;
    // VALIDAR EMAIL
    if (!emailUser) return alerts.login.emailRequired();
    if (!validator.isEmail(emailUser)) return alerts.login.invalidEmail();
    // VALIDAR LONGITUD DE CONTRASEÑA
    if (!passwordUser) return alerts.login.passwordRequired();
    if (passwordUser.length < 8) return alerts.login.failPasswordLength();
    // VERIFICAR QUE EL USUARIO EXISTA
    const user = users.userVerify(emailUser);
    if (!user?._id) return alerts.login.userNotFound();
    // VERIFICAR QUE LA CONTRASEÑA INGRESADA COINCIDA CON LA DEL USUARIO
    const passwordVerify = await users.passwordVerify(user?._id, passwordUser);
    if (!passwordVerify) return alerts.login.wrongPassword();
    currentUser.setCurrenUser(user);
    closeLoginModal();
    await alerts.login.successfulLogin();
    // ESTABLECER WISHLIST Y CARRITO
    wishList.setWishList();
    shoppingCart.setShoppingCart();
    // RENDERIZAR NUEVAMENTE LO NECESARO
    renders.navbar.renderNavbarOptions(environmentData);
    renders.categories.renderCategories(environmentData);
    renders.navbar.addNavBarClicks(environmentData);
    renders.navbar.renderUserOptions(environmentData);
    renders.products.renderProducts(environmentData);
  });
  // CLICK PARA CREAR USUARIO
  const buttonShowCreateUser = document.getElementById(
    "button-show-create-user"
  );
  buttonShowCreateUser.addEventListener("click", () => {
    closeLoginModal();
    showLoginAddModal(environmentData);
  });
};

export default {
  renderUserOptions,
  renderLoginOptions,
  showLoginModal,
  closeLoginModal,
  showLoginAddModal,
  closeLoginAddModal,
};
