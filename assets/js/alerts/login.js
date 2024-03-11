import Swal from "sweetalert2";

const userNotFound = async () => {
  const response = await Swal.fire({
    title: "Usuario no existe",
    text: "No se encontró un usuario asociado al correo ingresado, por favor verifiquelo o cree uno.",
    icon: "warning",
  });
  return response;
};
const wrongPassword = async () => {
  const response = await Swal.fire({
    title: "Contraseña Incorrecta",
    text: "La contraseña ingresada no es correcta, intentelo nuevamente o también puede reestablecer su contraseña si la olvidó.",
    icon: "error",
  });
  return response;
};
const failPasswordLength = async () => {
  const response = await Swal.fire({
    title: "Contraseña muy corta",
    text: "La contraseña ingresada es muy corta según los límites de creación establecidos",
    icon: "error",
  });
  return response;
};
const invalidEmail = async () => {
  const response = await Swal.fire({
    title: "Email Inválido",
    text: "El email ingresado no tiene un formato válido. (Ej: email@dominio.com)",
    icon: "error",
  });
  return response;
};
const emailRequired = async () => {
  const response = await Swal.fire({
    title: "Email Vacío",
    text: "Debe ingresar un email para el inicio de sesión",
    icon: "error",
  });
  return response;
};
const passwordRequired = async () => {
  const response = await Swal.fire({
    title: "Contraseña Vacía",
    text: "Debe ingresar una contraseña para el inicio de sesión",
    icon: "error",
  });
  return response;
};
const successfulLogin = async () => {
  const response = await Swal.fire({
    title: "Ha iniciado sesión",
    text: "Bienvenido nuevamente, disfruta tu visita",
    icon: "success",
  });
  return response;
};
const logout = async () => {
  const response = await Swal.fire({
    title: "Cierre de Sesión Exitoso",
    text: "Has cerrado sesión esperamos verte pronto",
    icon: "info",
  });
  return response;
};

export default {
  userNotFound,
  wrongPassword,
  passwordRequired,
  failPasswordLength,
  emailRequired,
  invalidEmail,
  successfulLogin,
  logout,
};
