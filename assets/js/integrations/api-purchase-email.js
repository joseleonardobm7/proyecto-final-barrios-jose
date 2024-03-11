const proccessPurchase = async (templateParams) => {
  const data = {
    service_id: "my_principal_mail",
    template_id: "purchaseLTDLE",
    user_id: "2-FDQ6TmYR6OyZdta",
    template_params: { ...templateParams },
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
  proccessPurchase,
};
