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

// MOSTRAR/OCULTAR MODAL DE INICIO DE SESION
const loginModal = new bootstrap.Modal(document.getElementById("loginModal"), {
  backdrop: "static",
  keyboard: false,
});
const showLoginModal = () => loginModal.show();
const closeLoginModal = () => loginModal.hide();

// MOSTRAR/OCULTAR MODAL DE CREAR USUARIO
const loginAddModal = new bootstrap.Modal(
  document.getElementById("loginAddModal"),
  {
    backdrop: "static",
    keyboard: false,
  }
);
const showLoginAddModal = () => loginAddModal.show();
const closeLoginAddModal = () => loginAddModal.hide();

export default {
  renderUserOptions,
  renderLoginOptions,
  showLoginModal,
  closeLoginModal,
  showLoginAddModal,
  closeLoginAddModal,
};
