const modal = document.querySelector("#confirmation-modal");
const cancelButton = modal.querySelector(".modal__btn_type_cancel");
const confirmButton = modal.querySelector(".modal__btn_type_confirm");

let confirmAction = null;
// closes the modal without the pending deletion happening (it is discarded).
function closeModal() {
  modal.classList.remove("modal_open");
  confirmAction = null;
}

cancelButton.addEventListener("click", closeModal);

// Save the pending deletion before closing since it will be cleared by the closeModal function.
confirmButton.addEventListener("click", () => {
  const action = confirmAction;
  closeModal();
  // Then run the saved action to delete if the user confirms it with the button.
  // (action is the callback saved when the modal opened, so if the user canceled there isn't an action to run.)
  if (action) {
    action();
  }
});

// store the deletion and show the modal
function openModal(onConfirm) {
  confirmAction = onConfirm;
  modal.classList.add("modal_open");
}

export { openModal };
