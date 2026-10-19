const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".video-card");

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
