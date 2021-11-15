//Modal
let modal = document.getElementById("modal");
let fields = document.querySelectorAll(".modal-field");

document.getElementById("openModal")
  .addEventListener("click", openModal);
document.getElementById("closeModal")
  .addEventListener("click", closeModal);
function openModal() {
  modal.classList.add("is-active");
}
function closeModal() {
  modal.classList.remove("is-active");
  fields.forEach((field) => (field.value = ""));
}
