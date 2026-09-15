import Swal from 'sweetalert2';

export const showCompletePurchasePopup = () => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'bg-[#66b987] p-3 text-white rounded-sm',
      cancelButton: 'bg-[#f8bb86] p-3 text-black rounded-sm',
    },
    buttonsStyling: false,
  });

  return swalWithBootstrapButtons.fire({
    title: '¿Confirmar compra?',
    text: '¿Querés finalizar tu compra?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, confirmar',
    cancelButtonText: 'No, cancelar',
    reverseButtons: true,
  });
};
