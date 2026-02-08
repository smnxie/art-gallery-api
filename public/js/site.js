const ARTWORKS = [
  {
    id: "a1",
    title: "Energy",
    category: "painting",
    desc: "Acrylic, 30×30 cm. Contrast and dynamic shapes.",
    image: "./assets/artworks/asmik.jpg",
    date: "2026-01-14",
    artist: "Milena Ryabova",
  },
  {
    id: "a2",
    title: "Night Tram",
    category: "digital",
    desc: "Digital art, 120×90 cm. City lights and silence.",
    image: "./assets/artworks/tram.jpg",
    date: "2026-02-01",
    artist: "Anna Kim",
  },
  {
    id: "a3",
    title: "Untitled",
    category: "painting",
    desc: "Charcoal on paper. Minimalism and emotion.",
    image: "./assets/artworks/marusya.jpg",
    date: "2025-12-20",
    artist: "Tigran Sardaryan",
  },
  {
    id: "a4",
    title: "Help",
    category: "sculpture",
    desc: "Object/frame. Texture and color play.",
    image: "./assets/artworks/sculpture.jpg",
    date: "2026-01-28",
    artist: "Polya Strizh",
  },
  {
    id: "a5",
    title: "frustration",
    category: "painting",
    desc: "Oil, 50×70 cm. Bright line and rhythm.",
    image: "./assets/artworks/uyutno.jpg",
    date: "2025-11-11",
    artist: "Milena Ryabova",
  },
  {
    id: "a6",
    title: "Blue Mask",
    category: "digital",
    desc: "Digital portrait. Neon and cold tones.",
    image: "./assets/artworks/digital.jpg",
    date: "2026-02-03",
    artist: "Anna Kim",
  },
];

const ARTISTS = [
  {
    id: "u1",
    name: "Milena Ryabova",
    avatar: "./assets/artists/milena.jpg",
    bio: "Works in dark minimal style. Loves contrast, shape rhythm, and neon accents.",
    contacts: { email: "milena.artist@mail.com", instagram: "@milena.art", phone: "+7 700 000 00 00" },
  },
  {
    id: "u2",
    name: "Anna Kim",
    avatar: "./assets/artists/anna.jpg",
    bio: "Digital artist. Urban scenes, light, and atmospheric realism.",
    contacts: { email: "anna.kim@mail.com", instagram: "@annakim.art", phone: "+7 701 111 11 11" },
  },
  {
    id: "u3",
    name: "Tigran Sardaryan",
    avatar: "./assets/artists/tigran.jpg",
    bio: "Graphics and sketches. Minimalism, emotion, and paper texture.",
    contacts: { email: "tigran.s@mail.com", instagram: "@tigran.sketch", phone: "+7 702 222 22 22" },
  },
];

function el(id) {
  return document.getElementById(id);
}

function escapeHtml(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString();
}

function categoryLabel(cat) {
  if (cat === "painting") return "Painting";
  if (cat === "digital") return "Digital";
  if (cat === "sculpture") return "Sculpture";
  return "Other";
}

function artworkCard(a) {
  const date = formatDate(a.date);
  const catLabel = categoryLabel(a.category);

  return `
    <article class="card">
      <div class="thumb">
        <img src="${a.image}" alt="${escapeHtml(a.title)}" loading="lazy">
      </div>
      <div class="card-body">
        <h3 class="card-title">${escapeHtml(a.title)}</h3>
        <p class="card-desc">${escapeHtml(a.desc)}</p>
        <div class="card-meta">
          <span>${escapeHtml(catLabel)} • ${escapeHtml(a.artist)}</span>
          <span>${escapeHtml(date)}</span>
        </div>
      </div>
    </article>
  `;
}

function artistRow(a) {
  const phoneHref = String(a.contacts.phone || "").replaceAll(" ", "");
  return `
    <div class="artist">
      <div class="avatar">
  <img src="${a.avatar || "./assets/avatars/default.jpg"}" alt="${escapeHtml(a.name)}" loading="lazy">
</div>

      <div>
        <h3>${escapeHtml(a.name)}</h3>
        <p>${escapeHtml(a.bio)}</p>
        <div class="artist-contacts">
          <span class="pill">${escapeHtml(a.contacts.instagram)}</span>
          <a class="link" href="mailto:${a.contacts.email}">${escapeHtml(a.contacts.email)}</a>
          <a class="link" href="tel:${phoneHref}">${escapeHtml(a.contacts.phone)}</a>
        </div>
      </div>
    </div>
  `;
}


const showToast = (id, text, ok = false) => {
  const t = el(id);
  if (!t) return;

  t.classList.remove("hidden");
  t.textContent = text;

  t.style.borderColor = ok ? "rgba(110,231,255,.25)" : "rgba(255,92,122,.25)";
  t.style.background = ok ? "rgba(110,231,255,.08)" : "rgba(255,92,122,.10)";
};

const bindLogin = () => {
  const form = el("loginForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        showToast("loginToast", data.message || "Login failed.");
        return;
      }

      if (data.token) localStorage.setItem("token", data.token);
      showToast("loginToast", "Login successful ", true);

      setTimeout(() => {
        window.location.href = "./catalog.html";
      }, 600);
    } catch {
      showToast("loginToast", "Network error.");
    }
  });
};

const bindRegister = () => {
  const form = el("registerForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        showToast("registerToast", data.message || "Registration failed.");
        return;
      }

      showToast("registerToast", "Account created Now sign in on the left.", true);
      form.reset();
    } catch {
      showToast("registerToast", "Network error.");
    }
  });
};


(function home() {
  const featured = el("featuredGrid");
  const statA = el("statArtworks");
  const statU = el("statArtists");
  if (!featured) return;

  if (statA) statA.textContent = String(ARTWORKS.length);
  if (statU) statU.textContent = String(ARTISTS.length);

  const top = ARTWORKS.slice(0, 4);
  featured.innerHTML = top.map(artworkCard).join("");
})();


(function catalog() {
  const grid = el("catalogGrid");
  if (!grid) return;

  const empty = el("catalogEmpty");
  const search = el("searchArt");
  const filter = el("filterCategory");
  const sort = el("sortBy");

  function apply() {
    const q = (search?.value || "").toLowerCase().trim();
    const cat = (filter?.value || "").toLowerCase().trim();
    const mode = sort?.value || "date_desc";

    let list = ARTWORKS.slice();

    if (q) {
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.desc.toLowerCase().includes(q) ||
          a.artist.toLowerCase().includes(q)
      );
    }

    if (cat) {
      list = list.filter((a) => a.category === cat);
    }

    list.sort((a, b) => {
      if (mode === "date_desc") return (b.date || "").localeCompare(a.date || "");
      if (mode === "date_asc") return (a.date || "").localeCompare(b.date || "");
      if (mode === "title_asc") return a.title.localeCompare(b.title);
      if (mode === "title_desc") return b.title.localeCompare(a.title);
      return 0;
    });

    grid.innerHTML = list.map(artworkCard).join("");
    empty?.classList.toggle("hidden", list.length !== 0);
  }

  search?.addEventListener("input", apply);
  filter?.addEventListener("change", apply);
  sort?.addEventListener("change", apply);
  apply();
})();


(function artists() {
  const listEl = el("artistsList");
  if (!listEl) return;

  const empty = el("artistsEmpty");
  const search = el("searchArtists");

  function apply() {
    const q = (search?.value || "").toLowerCase().trim();
    let list = ARTISTS.slice();
    if (q) list = list.filter((a) => a.name.toLowerCase().includes(q));

    listEl.innerHTML = list.map(artistRow).join("");
    empty?.classList.toggle("hidden", list.length !== 0);
  }

  search?.addEventListener("input", apply);
  apply();
})();


(function contacts() {
  const form = el("contactForm");
  const toast = el("contactToast");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    toast.classList.remove("hidden");
    toast.textContent = "Message sent. Thank you!";
    form.reset();
    setTimeout(() => toast.classList.add("hidden"), 2500);
  });
})();


bindLogin();
bindRegister();

