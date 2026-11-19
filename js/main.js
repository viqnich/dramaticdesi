(function () {
  const data = window.DRAMATIC_DESI;
  if (!data) return;

  const { group, next, past } = data;

  const textMap = {
    about: group.about,
    groupTaglineMotto: group.taglineMotto,
    groupTaglineSupport: group.taglineSupport,
    instagramHandle: group.instagramHandle,
    nextCue: next && next.cue,
    nextTitle: next && next.title,
    nextBlurb: next && next.blurb,
    pastPresenter: past && past.presenter,
    pastTitle: past && past.title,
    pastTagline: past && past.tagline,
    pastDate: past && past.dateLabel,
    pastVenue: past && past.venue,
    pastCredit: past && past.credit,
    videoTitle: past && past.videoTitle,
    year: String((past && past.year) || new Date().getFullYear()),
  };

  document.querySelectorAll("[data-bind]").forEach((el) => {
    const key = el.getAttribute("data-bind");
    if (key && textMap[key] != null) {
      el.textContent = textMap[key];
    }
  });

  const synopsisEl = document.querySelector('[data-bind-html="synopsis"]');
  if (synopsisEl && past && Array.isArray(past.synopsis)) {
    synopsisEl.innerHTML = past.synopsis
      .map((p) => `<p>${escapeHtml(p)}</p>`)
      .join("");
  }

  const creditsEl = document.querySelector('[data-bind-html="credits"]');
  if (creditsEl && past) {
    const blocks = [];
    if (Array.isArray(past.creative)) {
      blocks.push(
        `<ul class="credits__list">${past.creative
          .map(
            (row) =>
              `<li><span class="credits__role">${escapeHtml(
                row.role
              )}</span> <span class="credits__names">${escapeHtml(
                row.names
              )}</span></li>`
          )
          .join("")}</ul>`
      );
    }
    if (past.cast) {
      blocks.push("<h3>Cast</h3>");
      if (past.cast.starring) {
        blocks.push(
          `<p><span class="credits__role">Starring</span> <span class="credits__names">${escapeHtml(
            past.cast.starring
          )}</span></p>`
        );
      }
      if (past.cast.special) {
        blocks.push(
          `<p><span class="credits__role">Special appearances</span> <span class="credits__names">${escapeHtml(
            past.cast.special
          )}</span></p>`
        );
      }
    }
    if (Array.isArray(past.crew) && past.crew.length) {
      blocks.push("<h3>Crew</h3>");
      blocks.push(
        `<ul class="credits__list">${past.crew
          .map(
            (row) =>
              `<li><span class="credits__role">${escapeHtml(
                row.role
              )}</span> <span class="credits__names">${escapeHtml(
                row.names
              )}</span></li>`
          )
          .join("")}</ul>`
      );
    }
    if (past.note) {
      blocks.push(
        `<p class="credits__note">${escapeHtml(past.note)}</p>`
      );
    }
    creditsEl.innerHTML = blocks.join("");
  }

  const mailLinks = document.querySelectorAll("[data-bind-mailto]");
  mailLinks.forEach((mail) => {
    if (!group.email) return;
    mail.setAttribute("href", `mailto:${group.email}`);
    if (mail.hasAttribute("data-bind-email")) {
      mail.textContent = group.email;
    }
  });

  document.querySelectorAll("[data-bind-facebook]").forEach((el) => {
    if (group.facebook) el.setAttribute("href", group.facebook);
  });
  document.querySelectorAll("[data-bind-instagram]").forEach((el) => {
    if (group.instagram) el.setAttribute("href", group.instagram);
  });

  document.querySelectorAll("[data-bind-archive]").forEach((el) => {
    if (past && past.archiveUrl) el.setAttribute("href", past.archiveUrl);
  });

  document.querySelectorAll("[data-bind-video]").forEach((el) => {
    if (past && past.videoUrl) {
      el.setAttribute("href", past.videoUrl);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    }
  });

  const videoFrame = document.querySelector("[data-bind-video-embed]");
  if (videoFrame && past && past.videoEmbed) {
    videoFrame.setAttribute("src", past.videoEmbed);
    if (past.videoTitle) {
      videoFrame.setAttribute("title", past.videoTitle);
    }
  }

  document.querySelectorAll("[data-bind-program]").forEach((el) => {
    if (past && past.programPdf) {
      const inShow = /\/shows\//.test(location.pathname);
      el.setAttribute(
        "href",
        inShow ? `../${past.programPdf}` : past.programPdf
      );
    }
  });

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && group.tagline) {
    metaDesc.setAttribute("content", group.tagline);
  }

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc && group.tagline) {
    ogDesc.setAttribute("content", group.tagline);
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute("content", group.name);
  }

  document.title = `${group.name} — Theatre & Short Film`;

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
