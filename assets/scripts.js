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
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/27072868/42516bt/";

    const redirectUrl = form.dataset.redirect;

    const inputs = form.querySelectorAll("input");
    const selects = form.querySelectorAll("select");
    const textarea = form.querySelector("textarea");

    let trackingParams = {};

    try {
      const trackingParamsRaw = localStorage.getItem("tracking_params");
      trackingParams = trackingParamsRaw ? JSON.parse(trackingParamsRaw) : {};
    } catch (error) {
      console.error("Error reading tracking params:", error);
    }

    const payload = {
      name: inputs[0]?.value || "",
      email: inputs[1]?.value || "",
      phone: inputs[2]?.value || "",

      team_size: selects[0]?.value || "",
      main_challenge: selects[1]?.value || "",
      move_forward_time: selects[2]?.value || "",
      support_type: selects[3]?.value || "",

      message: textarea?.value || "",

      tracking_params: trackingParams,
      page_url: window.location.href,
      page_path: window.location.pathname,
      submitted_at: new Date().toISOString(),
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Error al enviar al webhook");
      }

      window.location.href = redirectUrl;
    } catch (error) {
      console.error("Error sending form:", error);
      alert("There was an error submitting the form. Please try again.");
    }
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