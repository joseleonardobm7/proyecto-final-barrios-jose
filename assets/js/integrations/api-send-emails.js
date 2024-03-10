const sendEmail = async (userName, message, toEmail) => {
  const data = {
    service_id: "my_principal_mail",
    template_id: "latienditadelaesquina",
    user_id: "2-FDQ6TmYR6OyZdta",
    template_params: {
      userName,
      message,
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
  sendEmail,
};
