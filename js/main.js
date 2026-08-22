(function () {
  const data = window.DRAMATIC_DESI;
  if (!data) return;

  const { group, show } = data;
  const datetime = `${show.dateLabel} at ${show.timeLabel}`;

  const textMap = {
    presenter: show.presenter,
    title: show.title,
    tagline: show.tagline,
    runtime: show.runtime,
    datetime,
    venue: show.venue,
    credit: show.credit,
    about: group.about,
    year: String(show.year),
  };

  document.querySelectorAll("[data-bind]").forEach((el) => {
    const key = el.getAttribute("data-bind");
    if (key && textMap[key] != null) {
      el.textContent = textMap[key];
    }
  });

  const synopsisEl = document.querySelector('[data-bind-html="synopsis"]');
  if (synopsisEl && Array.isArray(show.synopsis)) {
    synopsisEl.innerHTML = show.synopsis
      .map((p) => `<p>${escapeHtml(p)}</p>`)
      .join("");
  }

  const mail = document.querySelector("[data-bind-mailto]");
  if (mail && group.email) {
    mail.setAttribute("href", `mailto:${group.email}`);
  }

  const ticketBtn = document.querySelector("[data-ticket-btn]");
  const ticketNote = document.querySelector("[data-ticket-note]");
  if (ticketBtn) {
    if (show.ticketUrl) {
      ticketBtn.setAttribute("href", show.ticketUrl);
      ticketBtn.setAttribute("target", "_blank");
      ticketBtn.setAttribute("rel", "noopener noreferrer");
      if (ticketNote) {
        ticketNote.textContent =
          "Tickets are available now. Grab yours before the house fills up.";
      }
    } else {
      ticketBtn.setAttribute("href", "#tickets");
    }
  }

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && show.short) {
    metaDesc.setAttribute(
      "content",
      `${show.short} ${datetime} | ${show.venue}`
    );
  }

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc && show.short) {
    ogDesc.setAttribute("content", show.short);
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute("content", `${group.name} presents ${show.title}`);
  }

  document.title = `${group.name} — ${show.title}`;

  /* Header scroll state */
  const header = document.querySelector("[data-header]");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Reveal on scroll */
  const reveals = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
