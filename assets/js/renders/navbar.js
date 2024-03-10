import render from "./products.js";

// FUNCION PARA LOS PRODUCTOS QUE SE RENDERIZAN SEGUN EL TIPO SELECCIONADO
const changeRenderType = (environmentData, newType) => {
  environmentData.renderedType = newType;
  render.renderProducts(environmentData);
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

export default {
  renderNavbarOptions,
  addNavBarClicks,
};
