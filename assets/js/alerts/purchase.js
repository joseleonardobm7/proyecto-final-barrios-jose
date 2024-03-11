import Swal from "sweetalert2";

const confirmPurchase = async (messageAlert) => {
  const response = await Swal.fire({
    title: "<strong> Finalizar compra </strong>",
    icon: "info",
    html: messageAlert,
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: `
      <i class="bi bi-cart4"></i> Comprar!
    `,
    confirmButtonAriaLabel: "Comprar",
    cancelButtonText: `
      <i class="bi bi-x-octagon"></i> Volver!
    `,
    cancelButtonAriaLabel: "Volver",
    customClass: {
      popup: "purchase-popup",
    },
  });
  return response;
};

export default {
  confirmPurchase,
};
