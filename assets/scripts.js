document.documentElement.style.setProperty("--mx", "50%");
document.documentElement.style.setProperty("--my", "20%");
window.addEventListener("pointermove", (e) => {
  document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
  document.documentElement.style.setProperty("--my", `${e.clientY}px`);
});
document
  .querySelectorAll("[data-year]")
  .forEach((el) => (el.textContent = new Date().getFullYear()));
const nav = document.querySelector(".nav"),
  toggle = document.querySelector(".mobile-toggle");
if (toggle)
  toggle.addEventListener("click", () => nav.classList.toggle("open"));
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
document
  .querySelectorAll(".faq-q")
  .forEach((q) =>
    q.addEventListener("click", () =>
      q.closest(".faq-item").classList.toggle("open"),
    ),
  );
document.querySelectorAll("form[data-redirect]").forEach((form) =>
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href = form.dataset.redirect;
  }),
);
const docs = document.querySelectorAll(".single-doc");
const prevDoc = document.querySelector(".doc-prev");
const nextDoc = document.querySelector(".doc-next");

if (docs.length && prevDoc && nextDoc) {
  let currentDoc = 0;

  function showDoc(index) {
    docs.forEach((doc) => doc.classList.remove("active"));
    docs[index].classList.add("active");
  }

  nextDoc.addEventListener("click", () => {
    currentDoc = (currentDoc + 1) % docs.length;
    showDoc(currentDoc);
  });

  prevDoc.addEventListener("click", () => {
    currentDoc = (currentDoc - 1 + docs.length) % docs.length;
    showDoc(currentDoc);
  });

  showDoc(0);
}