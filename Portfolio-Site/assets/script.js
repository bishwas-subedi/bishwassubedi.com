(() => {
  // ===== Header shadow on scroll =====
  const header = document.querySelector(".site-header");
  const onHeaderScroll = () => {
    if (!header) return;
    header.classList.toggle("scrolled", (window.scrollY || 0) > 8);
  };
  window.addEventListener("scroll", onHeaderScroll, { passive: true });
  onHeaderScroll();

  // ===== Active nav tab =====
  const navLinks = document.querySelectorAll("[data-nav]");
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  navLinks.forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) a.classList.add("active");
  });

  // ===== Mesh subtle movement (mouse) =====
  const meshImg = document.querySelector(".mesh-img");
  if (meshImg) {
    const onMove = (e) => {
      const r = meshImg.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / r.width;
      const dy = (e.clientY - cy) / r.height;
      meshImg.style.transform = `translate3d(${dx * 10}px, ${dy * 10}px, 0)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
  }

  // ===== Skills fill-on-scroll =====
  (() => {
    const skillsSection = document.getElementById("skills");
    const fills = document.querySelectorAll(".fill[data-fill]");
    if (!skillsSection || !fills.length) return;

    const animateSkills = () => {
      const r = skillsSection.getBoundingClientRect();
      const visible = r.top < window.innerHeight * 0.75;

      if (visible) {
        fills.forEach(el => {
          const target = el.getAttribute("data-fill");
          el.style.width = `${target}%`;
        });
        window.removeEventListener("scroll", animateSkills);
      }
    };

    window.addEventListener("scroll", animateSkills, { passive: true });
    animateSkills();
  })();
})();
// ===== Hologram tilt (optional) =====
(() => {
  const holo = document.querySelector(".mesh-wrap.holo");
  if (!holo) return;

  const onMove = (e) => {
    const r = holo.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) / r.width;
    const y = (e.clientY - (r.top + r.height / 2)) / r.height;

    holo.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${y * -8}deg) translateZ(0)`;
  };

  const onLeave = () => {
    holo.style.transform = `perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0)`;
  };

  window.addEventListener("mousemove", onMove, { passive: true });
  holo.addEventListener("mouseleave", onLeave);
})();
// ===== Terminal boot-sequence brand =====
(() => {
  const el = document.getElementById("brandTerminal");
  if (!el) return;

  const steps = [
    "> booting...",
    "> loading profile...",
    "> BS recognized",
    "> Bishwas Subedi"
  ];

  const finalCompact = ">BS";

  let stepIndex = 0;
  let charIndex = 0;

  const render = (text, showCursor = true, accentBS = false) => {
    let html = text
      .replace(/^>/, '<span class="prompt">&gt;</span>')
      .replace("BS", accentBS ? '<span class="accent">BS</span>' : "BS");

    if (showCursor) {
      html += '<span class="cursor">_</span>';
    }

    el.innerHTML = html;
  };

  const typeStep = () => {
    const current = steps[stepIndex];
    render(current.slice(0, charIndex + 1), true, current.includes("BS"));

    charIndex++;

    if (charIndex < current.length) {
      setTimeout(typeStep, 55);
    } else {
      stepIndex++;
      charIndex = 0;

      if (stepIndex < steps.length) {
        setTimeout(typeStep, 450);
      } else {
        setTimeout(collapseToCompact, 1000);
      }
    }
  };

  const collapseToCompact = () => {
    // quick “clear down” feel
    render("> resetting...", true, false);

    setTimeout(() => {
      let i = 0;

      const typeCompact = () => {
        const text = finalCompact.slice(0, i + 1);
        render(text, true, true);
        i++;

        if (i < finalCompact.length) {
          setTimeout(typeCompact, 80);
        } else {
          render(finalCompact, true, true);
        }
      };

      typeCompact();
    }, 500);
  };

  typeStep();
})();
