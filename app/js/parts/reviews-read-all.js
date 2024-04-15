let reviewsSection = document.querySelector(".reviews");

if(reviewsSection) {
  let reviewsModal = document.querySelector(".reviews-modal");
  let reviewsModalContainer = reviewsModal.querySelector(".modal-container");
  let reviewsModalBody = reviewsModal.querySelector(".modal-body");
  let reviewsModalCloseButton = reviewsModal.querySelector(".close-button");
  let reviewsModalContent = reviewsModal.querySelector(".modal-content");
  let reviewsTextContainer = document.querySelectorAll(".reviews-text-container");
  let reviewsReadAllButtons = document.querySelectorAll(".reviews-read-all-button");
  let reviewsArray = [];


  function createReviewsArray() {
    if(reviewsReadAllButtons[0].offsetWidth > 0 && reviewsReadAllButtons[0].offsetHeight > 0) {
      reviewsTextContainer.forEach(review => {
        let reviewText = Array.from(review.querySelectorAll("p"));
        let reviewClassess = reviewText[0].className;
        let reviewArr = [];
        for(let i = 0; i < reviewText.length; i++) {
          let clonedReview = reviewText[i].cloneNode(true);
          clonedReview.className = reviewClassess;
          reviewArr.push(clonedReview);
        }
        reviewsArray.push(reviewArr);
      })
    }
  }

  createReviewsArray();

  window.addEventListener('resize', debounce(() => {
    createReviewsArray();
  }, 300));


  reviewsReadAllButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      openReviewsModal(index);
    })
  });

  function openReviewsModal(index) {
    reviewsModal.style.display = "flex";
    setTimeout(() => {
      reviewsModal.classList.add("opacity-100", "reviews-modal--active");
      reviewsModalContainer.classList.add("opacity-100","translate-y-0");
    }, 10)
    let currentReview = reviewsArray[index];
    reviewsModalContent.innerHTML = "";
    currentReview.forEach(paragraph => {
      reviewsModalContent.appendChild(paragraph.cloneNode(true));
    });

    reviewsModal.addEventListener("click", (e) => {

      if(!e.target === reviewsModalBody && reviewsModal.classList.contains("reviews-modal--active") || e.target === reviewsModal || e.target === reviewsModalCloseButton) {
          closeReviewsModal();
      }
    })
  }

  function closeReviewsModal() {
    reviewsModal.classList.remove("opacity-100", "reviews-modal--active");
    reviewsModalContainer.classList.remove("opacity-100","translate-y-0");
    setTimeout(() => {
      reviewsModal.removeAttribute("style");
      reviewsModalContent.innerHTML = "";
    }, 400);

    reviewsModal.removeEventListener("click", closeReviewsModal);
  }
}
