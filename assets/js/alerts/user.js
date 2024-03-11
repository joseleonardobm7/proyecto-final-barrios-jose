import Swal from "sweetalert2";

const updatedPassword = async () => {
  const response = await Swal.fire({
    title: "Contraseña Cambiada",
    text: "La contraseña ha sido cambiada con exito.",
    icon: "success",
  });
  return response;
};
const updatedData = async () => {
  const response = await Swal.fire({
    title: "Datos Actualizados",
    text: "Se han actualizado los datos correctamente",
    icon: "success",
  });
  return response;
};
const createdUser = async () => {
  const response = await Swal.fire({
    title: "<strong><u> Usuario Creado </u></strong>",
    icon: "success",
    html: `El usuario se ha creado con éxito, válida tu registro con un código que ha sido enviado a tu email`,
  });
  return response;
};
const emailValidate = async () => {
  const response = await Swal.fire({
    title: "Ingresa el código de validación enviado a tu correo",
    input: "text",
    inputLabel: "Código de Validación",
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) return "Debes ingresar un codigo";
      if (value.length != 6) return "El código ingresado debe ser de 6 dígitos";
    },
  });
  return response;
};
const incorrectCode = async () => {
  const response = await Swal.fire({
    title: "Código Incorrecto",
    text: "El código de validación ingresado es incorrercto, verificalo e intentalo nuevamente.",
    icon: "error",
  });
  return response;
};
const correctCode = async () => {
  const response = await Swal.fire({
    title: "Validación Satisfactoria",
    text: "Hemos validado tu cuenta correctamente, ahora puedes proceder a comprar.",
    icon: "success",
  });
  return response;
};

export default {
  updatedPassword,
  updatedData,
  createdUser,
  emailValidate,
  incorrectCode,
  correctCode,
};
