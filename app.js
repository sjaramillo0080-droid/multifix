const providers = [
  {
    name: "Carlos Mendoza",
    service: "Plomería",
    rating: "4.9",
    jobs: 126,
    price: "$85.000",
    badges: ["Certificado", "Fotos verificadas"],
  },
  {
    name: "Laura Gómez",
    service: "Carpintería",
    rating: "4.8",
    jobs: 88,
    price: "$120.000",
    badges: ["Negocio validado", "Garantía 7 días"],
  },
  {
    name: "Andrés Villa",
    service: "Pintura",
    rating: "4.7",
    jobs: 74,
    price: "$95.000",
    badges: ["Portafolio", "Respuesta rápida"],
  },
  {
    name: "Sofía Pérez",
    service: "Mecánica",
    rating: "4.9",
    jobs: 143,
    price: "$110.000",
    badges: ["Taller verificado", "Domicilio"],
  },
  {
    name: "Miguel Rojas",
    service: "Electricidad",
    rating: "4.8",
    jobs: 101,
    price: "$70.000",
    badges: ["Técnico certificado", "Seguro activo"],
  },
];

const providersList = document.querySelector("#providers-list");
const categories = document.querySelectorAll(".category");
const authModal = document.querySelector("#auth-modal");
const serviceSelect = document.querySelector("#service-select");
const estimatedPrice = document.querySelector("#estimated-price");
const authMessage = document.querySelector("#auth-message");

const money = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

function renderProviders(service = "Plomería") {
  const visibleProviders = providers.filter((provider) => provider.service === service);
  providersList.innerHTML = visibleProviders
    .map((provider) => {
      const initials = provider.name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("");

      return `
        <article class="provider-card">
          <div class="provider-top">
            <span class="avatar">${initials}</span>
            <div>
              <h3>${provider.name}</h3>
              <span>${provider.service} · ${provider.rating} estrellas · ${provider.jobs} trabajos</span>
            </div>
          </div>
          <div class="badges">
            ${provider.badges.map((badge) => `<span class="badge">${badge}</span>`).join("")}
          </div>
          <p>Tarifa estimada desde <strong>${provider.price}</strong> en Medellín. Perfil revisado con evidencias y calificaciones de trabajos anteriores.</p>
          <button class="secondary-btn">Ver perfil</button>
        </article>
      `;
    })
    .join("");
}

function updateFare() {
  const value = Number(serviceSelect.value);
  estimatedPrice.textContent = money.format(value);
}

function setAuthTab(mode) {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.authTab === mode);
  });
  document.querySelector("#login-form").classList.toggle("active", mode === "login");
  document.querySelector("#register-form").classList.toggle("active", mode === "register");
}

function openAuth(mode) {
  setAuthTab(mode);
  authModal.classList.add("open");
  authModal.setAttribute("aria-hidden", "false");
}

function closeAuth() {
  authModal.classList.remove("open");
  authModal.setAttribute("aria-hidden", "true");
}

categories.forEach((category) => {
  category.addEventListener("click", () => {
    categories.forEach((item) => item.classList.remove("active"));
    category.classList.add("active");
    renderProviders(category.dataset.service);
  });
});

document.querySelectorAll("[data-open-auth]").forEach((button) => {
  button.addEventListener("click", () => openAuth(button.dataset.openAuth));
});

document.querySelectorAll("[data-close-auth]").forEach((button) => {
  button.addEventListener("click", closeAuth);
});

document.querySelectorAll("[data-auth-tab]").forEach((tab) => {
  tab.addEventListener("click", () => setAuthTab(tab.dataset.authTab));
});

document.querySelectorAll("[data-scroll-to]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(`#${button.dataset.scrollTo}`).scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll(".auth-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    authMessage.textContent = "Solicitud recibida. Te notificaremos el estado de tu cuenta.";
  });
});

serviceSelect.addEventListener("change", updateFare);

renderProviders();
updateFare();
