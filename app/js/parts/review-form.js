let sendReviewButton = document.querySelector(".send-review-button");

if(sendReviewButton) {
  let contactsReviewForm = document.querySelector(".contacts-review-form");
  let contactsReviewFormCloseButton = contactsReviewForm.querySelector(".close-review-form-button");

  sendReviewButton.addEventListener("click", openReviewForm);
  contactsReviewFormCloseButton.addEventListener("click", closeReviewForm);

  function openReviewForm() {
    contactsReviewForm.classList.remove("hidden");
    contactsReviewForm.classList.add("block");
    setTimeout(() => {
      contactsReviewForm.classList.add("opacity-100");
    }, 10);
  }

  function closeReviewForm() {
    contactsReviewForm.classList.remove("opacity-100");

    setTimeout(() => {
      contactsReviewForm.classList.add("hidden");
      contactsReviewForm.classList.remove("block");
    },550)
  }
}
