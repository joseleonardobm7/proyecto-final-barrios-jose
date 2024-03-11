const restartPassword = async (userName, password, toEmail) => {
  const paragraphOne = `
    Recibimos tu solicitud de reestablecer contraseña, y te hemos generado una de forma aleatoria para que puedas ingresar, 
    por favor ingresa nuevamente usando tu email y la siguiente contraseña:
  `;
  const paragraphTwo =
    "Al ingresar recuerda cambiar tu contraseña por una que puedas recordar.";
  const data = {
    service_id: "my_principal_mail",
    template_id: "userActionLTDLE",
    user_id: "2-FDQ6TmYR6OyZdta",
    template_params: {
      userName,
      code: password,
      paragraphOne,
      paragraphTwo,
      toEmail,
    },
  };
  try {
    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return "OK";
  } catch (e) {
    console.error("Ocurrio un error con la API", e.message);
    return "ERROR";
  }
};

const emailVerify = async (userName, verificationCode, toEmail) => {
  const paragraphOne = `
    Es un placer para nosotros poder atenderte y satisfacer tus necesidades, pero para 
    poder continuar comprar deberás verificar tu email, para ello ingresaa a nuestra web con tu email y password creados, 
    posteriormente en el menú "Usuario" accede al botón "Verificar Email", donde deberas ingresar el siguiente código:
  `;
  const paragraphTwo =
    "Luego de verificar tu email podrás procesar tu compras.";
  const data = {
    service_id: "my_principal_mail",
    template_id: "userActionLTDLE",
    user_id: "2-FDQ6TmYR6OyZdta",
    template_params: {
      userName,
      code: verificationCode,
      paragraphOne,
      paragraphTwo,
      toEmail,
    },
  };
  try {
    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return "OK";
  } catch (e) {
    console.error("Ocurrio un error con la API", e.message);
    return "ERROR";
  }
};

// EXPORTAR
export default {
  restartPassword,
  emailVerify,
};
