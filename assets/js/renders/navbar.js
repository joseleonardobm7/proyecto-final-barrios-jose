import render from "./main.js";
import alerts from "../alerts/main.js";

// FUNCION PARA LOS PRODUCTOS QUE SE RENDERIZAN SEGUN EL TIPO SELECCIONADO
const changeRenderType = (environmentData, newType) => {
  environmentData.renderedType = newType;
  render.products.renderProducts(environmentData);
};

// RENDERIZAR BARRA DE NAVEGACIÓN
const renderNavbarOptions = () => {
  const navbarContainer = document.getElementById("nav-bar-options-container");
  const innerHTML = `
  <li class="nav-item">
    <a
      class="nav-link navbar-options-selector"
      aria-current="page"
      href="#"
      id="navbar-options-allProducts"
      data-value="allProducts"
    >
      Todos los Productos
    </a>
  </li>
  <li class="nav-item dropdown">
    <a
      class="nav-link dropdown-toggle"
      href="#"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Categorias
    </a>
    <ul id="categories-container" class="dropdown-menu"></ul>
  </li>
  <li class="nav-item">
    <a
      class="nav-link navbar-options-selector"
      href="#"
      id="navbar-options-bestSellers"
      data-value="bestSellers"
      
    >
      Más Vendidos
    </a>
  </li>
  <li class="nav-item">
    <a
      class="nav-link navbar-options-selector"
      href="#"
      id="navbar-options-mostValued"
      data-value="mostValued"
    >
      Mejores Valorados
    </a>
  </li>
  `;
  navbarContainer.innerHTML = innerHTML;
};

// AGREGAR CLICKS A LA BARRA DE NAVEGACIÓN
const addNavBarClicks = (environmentData) => {
  // CLICK EN CATEGORIAS DE PRODUCTOS
  const navbarOptions = document.querySelectorAll(".navbar-options-selector");
  navbarOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const typeRender = this.getAttribute("data-value");
      changeRenderType(environmentData, typeRender);
    });
  });
};

// RENDERIZAR OPCIONES DE USUARIO
const renderUserOptions = (environmentData) => {
  const { currentUser, users } = environmentData;
  // MOSTRAR U OCULTAR MENU DE OPCIONES SI EL USUARIO ESTA LOGUEADO
  const userOptionsContainer = document.getElementById(
    "user-options-container"
  );
  if (currentUser?._id) userOptionsContainer.style.display = "block";
  else userOptionsContainer.style.display = "none";

  // CAMBIAR EL SALUDO AL USUARIO
  const greetingUser = document.getElementById("greeting-user");
  console.log(greetingUser, currentUser);
  greetingUser.innerHTML = !!currentUser?.name
    ? `Hola ${currentUser.name}`
    : "Hola Usuarioaaaaa";

  // RENDERIZAR LAS OPCIONES SEGÚN EL USUARIO ESTA VALIDADO O NO
  const userOptionsList = document.getElementById("user-options-list");
  const innerHTML = `
  <li>
    <button class="dropdown-item" type="button">
      Modificar Datos
    </button>
  </li>
  ${
    currentUser?.validated != true
      ? `<li>
            <button class="dropdown-item" type="button" id="email-validate">
              Validar Email
          </button>
        </li>
        `
      : ""
  }
  <li>
    <button class="dropdown-item" type="button" id="button-logout">
      Cerrar Sesión
    </button>
  </li>
  `;
  userOptionsList.innerHTML = innerHTML;

  // AGREGARLE EL CLICK AL BOTON DE INICIO DE SESIÓN Y SI NO HAY USUARIO ACTIVO RENDERIZARLO
  const account = document.getElementById("account");
  const buttonAccount = account.querySelector("i");
  buttonAccount.addEventListener("click", function () {
    render.login.showLoginModal(environmentData);
  });
  if (currentUser?._id) account.style.display = "none";
  else account.style.display = "block";
  // AGREGARLE EL CLICK AL BOTON DE NUEVO USUARIO Y SI NO HAY USUARIO ACTIVO RENDERIZARLO
  const accountAdd = document.getElementById("account-add");
  const buttonAccountAdd = accountAdd.querySelector("i");
  buttonAccountAdd.addEventListener("click", function () {
    render.login.showLoginAddModal(environmentData);
  });
  if (currentUser?._id) accountAdd.style.display = "none";
  else accountAdd.style.display = "block";
  // AGREGARLE EL CLICK AL BOTON DE VALIDAR EMAIL
  const emailValidate = document.getElementById("email-validate");
  if (emailValidate) {
    emailValidate.addEventListener("click", async () => {
      const { value: code } = await alerts.user.emailValidate();
      const userVerified = users.confirmVerificationCode(
        currentUser?._id,
        code
      );
      if (userVerified) {
        console.log(userVerified);
        currentUser.setCurrenUser(userVerified);
        await alerts.user.correctCode();
        window.location.reload();
      } else await alerts.user.incorrectCode();
    });
  }
  // AGREGARLE EL CLICK AL BOTON DE CERRAR SESIÓN
  const buttonLogout = document.getElementById("button-logout");
  buttonLogout.addEventListener("click", async () => {
    await currentUser.cleanCurrentUser();
    await alerts.login.logout();
    window.location.reload();
  });
  // AGREGARLE KEYUP AL FILTRO
  const filter = document.getElementById("search-input");
  filter.addEventListener("input", () => {
    render.products.renderProducts(environmentData);
  });
};

export default {
  renderNavbarOptions,
  addNavBarClicks,
  renderUserOptions,
};
