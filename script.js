const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");
const reservationForm = document.querySelector(".reservation-form");
const dateInput = document.querySelector('input[type="date"]');

const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuButton.addEventListener("click", () => {
  const open = !navigation.classList.contains("open");
  navigation.classList.toggle("open", open);
  menuButton.classList.toggle("open", open);
  header.classList.toggle("menu-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Zamknij menu" : "Otwórz menu");
  document.body.style.overflow = open ? "hidden" : "";
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.classList.remove("open");
    header.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Otwórz menu");
    document.body.style.overflow = "";
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 3, 2) * 80}ms`;
  revealObserver.observe(element);
});

const today = new Date();
const isoToday = today.toISOString().split("T")[0];
dateInput.min = isoToday;

reservationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = reservationForm.querySelector(".form-message");

  if (!reservationForm.checkValidity()) {
    message.textContent = "Uzupełnij wszystkie pola, aby wysłać rezerwację.";
    reservationForm.reportValidity();
    return;
  }

  const name = new FormData(reservationForm).get("name").trim().split(" ")[0];
  message.textContent = `Dziękujemy, ${name}. Prośba o rezerwację została zapisana.`;
  reservationForm.reset();
});
