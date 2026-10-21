const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".video-card");
const playableCards = document.querySelectorAll(".video-card.is-playable");
const progressToggle = document.querySelector("#progress-toggle");
const progressSection = document.querySelector("#progress");
const checklistLink = document.querySelector('nav a[href="#progress"]');
const modal = document.querySelector("#video-modal");
const modalLabel = document.querySelector("#modal-label");
const modalTitle = document.querySelector("#modal-title");
const modalProgress = document.querySelector("#modal-progress");
const modalVideo = document.querySelector("#modal-video");
const modalNote = document.querySelector(".modal-note");
const modalClose = document.querySelector(".modal-close");
const modalBackdrop = document.querySelector(".modal-backdrop");
let opener = null;

function setProgressVisible(visible, shouldScroll = false) {
  progressSection.hidden = !visible;
  progressToggle.setAttribute("aria-expanded", String(visible));
  progressToggle.textContent = visible ? "Hide series progress" : "View series progress";

  if (visible && shouldScroll) {
    requestAnimationFrame(() => progressSection.scrollIntoView({ behavior: "smooth", block: "start" }));
  }
}

progressToggle.addEventListener("click", () => {
  setProgressVisible(progressSection.hidden, progressSection.hidden);
});

checklistLink.addEventListener("click", (event) => {
  event.preventDefault();
  setProgressVisible(true, true);
});

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const selected = filter.dataset.filter;

    filters.forEach((item) => item.classList.remove("is-selected"));
    filter.classList.add("is-selected");

    cards.forEach((card) => {
      const shouldShow = selected === "all" || card.dataset.category === selected;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

function openVideo(card) {
  opener = card;
  modalLabel.textContent = card.dataset.modalLabel || "CURRENT PROGRESS · REVIEW ONLY";
  modalTitle.textContent = card.dataset.title;
  modalProgress.textContent = card.dataset.progress;
  modalNote.textContent =
    card.dataset.note || "This is a work-in-progress review assembly, not the finished video.";
  modalVideo.src = card.dataset.video;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  modalClose.focus();
}

function closeVideo() {
  modalVideo.pause();
  modalVideo.removeAttribute("src");
  modalVideo.load();
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  opener?.focus();
}

playableCards.forEach((card) => {
  card.addEventListener("click", () => openVideo(card));
  card.addEventListener("keydown", (event) => {
    if (event.target === card && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      openVideo(card);
    }
  });
});

modalClose.addEventListener("click", closeVideo);
modalBackdrop.addEventListener("click", closeVideo);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) closeVideo();
});
