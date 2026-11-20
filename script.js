/* ---------- Edit these to fill in the site ---------- */
var CONTACT = {
  email: "advistahub2024@gmail.com",
  phone: "+234 907 040 2305",
  location: "AdVista Hub Online Services & Remote Operations, Kano State, Nigeria",
  cac: "",
  social: ""
};

/* Team: copy each photo into images/team/ and set photo to its path, for example photo: "images/team/ada.jpg". Add or remove lines to change the number of slides. */
var TEAM = [
  { name: "Abdurrahman Lawan Imam", role: "Software Engineer", photo: "images/team/abdurrahman-lawan-imam.jpg" },
  { name: "Abdurrashed Umar", role: "Software / Cyber Security", photo: "images/team/abdurrashed-umar.jpg" },
  { name: "", role: "", photo: "" },
  { name: "", role: "", photo: "" },
  { name: "", role: "", photo: "" },
  { name: "", role: "", photo: "" }
];

/* What people said: only real, permitted quotes. photo is optional (for example "images/people/ada.jpg"). Add or remove lines to change the number of cards. Empty slots show a placeholder. */
var SAID = [
  { quote: "If you need an ICT partner who understands both high-level system security and practical business needs, AdVista Hub delivers every time.", name: "Josef Oluwode", role: "ICT Consultant", photo: "images/people/josef-oluwode.jpg" },
  { quote: "AdVista Hub replaced our scattered paper files with a single, structured digital hub—managing staff profiles, qualifications, and identification records is now effortless and completely secure.", name: "Auwal Muhammad Isah", role: "CEO RISEs", photo: "" },
  { quote: "AdVista Hub transformed our exam processing. Generating accurate result sheets and automated remarks used to take weeks; now it happens securely in minutes.", name: "Muhammad Bashir", role: "School Administrators", photo: "" }
];

/* Recognition: copy each logo or certificate picture into images/recognition/ and set image to its path (for example "images/recognition/award.png"). Without an image, an icon is shown. Fill title and text for every slot you use. */
var RECOGNITION = [
  { title: "CAC registered", text: "AdVista Hub is registered as a business name with the Corporate Affairs Commission.", icon: "shield", image: "" },
  { title: "Partnership with SkillsPark Tech Hub", text: "A partnership certificate to foster community development through digital and technical skills training and innovation. Click the picture to enlarge it.", icon: "award", image: "images/recognition/partnership-certificate.jpg" },
  { title: "", text: "", icon: "award", image: "" },
  { title: "", text: "", icon: "award", image: "" }
];
/* Projects: shown inside each division on the Services page. division is one of "visttech", "eduvista", "datavista", "advista".
   status is "Completed" or "In progress". Copy a logo into images/projects/ (or images/) and set logo to its path.
   Add another line for each new project. A division with no project shows an empty slot. */
var PROJECTS = [
  { division: "eduvista", name: "Advista Result Management System", status: "Completed", logo: "images/advista-result-logo.png",
    text: "A digital school result management system: teacher submission, automatic score calculation, grade and remark generation, and result printing.",
    url: "https://advistaresult.com" }
];
/* ---------------------------------------------------- */

(function () {
  var NS = "http://www.w3.org/2000/svg";
  function icon(name) {
    var s = document.createElementNS(NS, "svg"); s.setAttribute("class", "i");
    var u = document.createElementNS(NS, "use"); u.setAttribute("href", "#i-" + name);
    s.appendChild(u); return s;
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e;
  }

  /* routing */
  var pages = ["home", "about", "services", "contact"];
  var els = {};
  pages.forEach(function (p) { els[p] = document.querySelector('[data-page="' + p + '"]'); });
  var nav = document.getElementById("nav"), burger = document.getElementById("burger");
  function closeMenu() {
    nav.classList.remove("open"); burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open menu");
    burger.firstChild.firstChild.setAttribute("href", "#i-menu");
  }
  var prevPage = "";
  function route() {
    var h = (location.hash || "").replace("#", "");
    if (pages.indexOf(h) === -1) h = "home";
    pages.forEach(function (p) { els[p].hidden = p !== h; });
    document.querySelectorAll("[data-nav]").forEach(function (a) {
      if (a.getAttribute("data-nav") === h) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    closeMenu();
    window.scrollTo(0, 0);
    if (h === "about") { updateProg(); }
    if (h === "home") { updateRecProg(); if (typeof typeHeadline === "function" && prevPage !== "home") typeHeadline(); }
    prevPage = h;
  }
  window.addEventListener("hashchange", route);

  burger.addEventListener("click", function () {
    var open = !nav.classList.contains("open");
    nav.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    burger.firstChild.firstChild.setAttribute("href", open ? "#i-close" : "#i-menu");
  });
  var hdr = document.getElementById("hdr");
  window.addEventListener("scroll", function () { hdr.classList.toggle("scrolled", window.scrollY > 8); }, { passive: true });
  document.getElementById("yr").textContent = new Date().getFullYear();

  /* team slider */
  var track = document.getElementById("team-track"), prog = document.getElementById("team-prog");
  TEAM.forEach(function (m, i) {
    var card = el("article", "member");
    var photo = el("div", "photo");
    if (m.photo) {
      var img = document.createElement("img"); img.src = m.photo; img.alt = m.name ? "Photo of " + m.name : "Team member photo"; img.loading = "lazy";
      photo.appendChild(img);
    } else {
      var ph = el("div", "ph"); ph.appendChild(icon("user")); ph.appendChild(el("span", "", "Team photo goes here"));
      photo.appendChild(ph); photo.appendChild(el("span", "slot", "Photo " + (i + 1)));
    }
    var info = el("div", "info");
    info.appendChild(el("h3", "", m.name || "Team member name"));
    info.appendChild(el("p", "", m.role || "Position or title"));
    card.appendChild(photo); card.appendChild(info); track.appendChild(card);
  });
  function stepW() { var c = track.firstElementChild; return c ? c.getBoundingClientRect().width + 20 : 300; }
  document.getElementById("team-prev").addEventListener("click", function () { track.scrollBy({ left: -stepW(), behavior: "smooth" }); });
  document.getElementById("team-next").addEventListener("click", function () { track.scrollBy({ left: stepW(), behavior: "smooth" }); });
  function updateProg() {
    var w = track.scrollWidth || 1, vis = track.clientWidth || 1;
    prog.style.width = Math.min(100, vis / w * 100) + "%";
    prog.style.left = (track.scrollLeft / w * 100) + "%";
  }
  track.addEventListener("scroll", updateProg, { passive: true });
  window.addEventListener("resize", updateProg);

  /* what people said (flexbox cards) */
  var saidBox = document.getElementById("said-flex");
  SAID.forEach(function (s) {
    var card = el("figure", "said-card");
    var qi = el("span", "qi"); qi.appendChild(icon("quote")); card.appendChild(qi);
    card.appendChild(el("blockquote", "", s.quote || (s.name ? "Add " + s.name + "'s own words here." : "Your client's words will appear here. Add a real testimonial with the person's name, role and organisation.")));
    var cap = el("figcaption");
    var av = el("span", "avatar");
    if (s.photo) {
      var im = document.createElement("img"); im.src = s.photo; im.alt = s.name ? "Photo of " + s.name : ""; im.loading = "lazy"; av.appendChild(im);
    } else { av.appendChild(icon("user")); }
    var who = el("span");
    who.appendChild(el("b", "", s.name || "Client name"));
    who.appendChild(el("small", "", s.role || "Role, organisation"));
    cap.appendChild(av); cap.appendChild(who);
    card.appendChild(cap); saidBox.appendChild(card);
  });

  /* recognition */
  var lb = document.getElementById("lightbox"), lbImg = document.getElementById("lightbox-img");
  function openLb(src, alt) {
    lbImg.src = src; lbImg.alt = alt; lb.hidden = false; document.body.style.overflow = "hidden";
    document.getElementById("lightbox-close").focus();
  }
  function closeLb() { lb.hidden = true; lbImg.removeAttribute("src"); document.body.style.overflow = ""; }
  lb.addEventListener("click", function (e) { if (e.target === lb || e.target.closest("#lightbox-close")) closeLb(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lb.hidden) closeLb(); });

  var recs = document.getElementById("recs"), recProg = document.getElementById("rec-prog");
  RECOGNITION.forEach(function (r) {
    var empty = !r.title;
    var c = el("div", "rec" + (empty ? " empty" : ""));
    if (r.image) {
      var box = document.createElement("button"); box.type = "button"; box.className = "logo-box zoom";
      box.setAttribute("aria-label", "View full size: " + (r.title || "recognition"));
      var im = document.createElement("img"); im.src = r.image; im.alt = r.title || "Recognition"; im.loading = "lazy";
      box.appendChild(im);
      box.addEventListener("click", function () { openLb(r.image, r.title || "Recognition"); });
      c.appendChild(box);
    } else {
      var nb = el("div", "logo-box noimg"); nb.appendChild(icon(empty ? "plus" : (r.icon || "award"))); c.appendChild(nb);
    }
    c.appendChild(el("h3", "", empty ? "Award, certificate or partner" : r.title));
    c.appendChild(el("p", "", empty ? "This slot is ready for a real recognition. Add its name and a short line." : r.text));
    recs.appendChild(c);
  });
  function recStep() { var c = recs.firstElementChild; return c ? c.getBoundingClientRect().width + 20 : 300; }
  document.getElementById("rec-prev").addEventListener("click", function () { recs.scrollBy({ left: -recStep(), behavior: "smooth" }); });
  document.getElementById("rec-next").addEventListener("click", function () { recs.scrollBy({ left: recStep(), behavior: "smooth" }); });
  function updateRecProg() {
    var w = recs.scrollWidth || 1, vis = recs.clientWidth || 1;
    recProg.style.width = Math.min(100, vis / w * 100) + "%";
    recProg.style.left = (recs.scrollLeft / w * 100) + "%";
  }
  recs.addEventListener("scroll", updateRecProg, { passive: true });
  window.addEventListener("resize", updateRecProg);

  /* projects inside divisions */
  document.querySelectorAll("[data-projects]").forEach(function (box) {
    var key = box.getAttribute("data-projects");
    var list = PROJECTS.filter(function (p) { return p.division === key; });
    if (!list.length) list = [{ empty: true }];
    list.forEach(function (p) {
      var isLink = !p.empty && p.url;
      var card = el(isLink ? "a" : "div", "project" + (p.empty ? " empty" : ""));
      if (isLink) { card.href = p.url; card.target = "_blank"; card.rel = "noopener"; }
      var lg = el("span", "plogo");
      if (p.logo) {
        var im = document.createElement("img"); im.src = p.logo; im.alt = p.name + " logo"; im.loading = "lazy"; lg.appendChild(im);
      } else { lg.appendChild(icon("plus")); }
      var body = el("span", "pbody");
      if (p.empty) {
        body.appendChild(el("b", "", "Project logo goes here"));
        body.appendChild(el("small", "", "Add a recent or ongoing project in PROJECTS in script.js."));
      } else {
        body.appendChild(el("span", "pstatus", (p.status || "Project") + " project"));
        body.appendChild(el("b", "", p.name));
        if (p.text) body.appendChild(el("small", "", p.text));
        if (isLink) {
          var l = el("span", "plink", p.url.replace(/^https?:\/\//, "")); l.appendChild(icon("arrow")); body.appendChild(l);
        }
      }
      card.appendChild(lg); card.appendChild(body); box.appendChild(card);
    });
  });

  /* contact details */
  var rows = [["Email", CONTACT.email], ["Phone", CONTACT.phone], ["Location", CONTACT.location], ["CAC registration number", CONTACT.cac], ["Social media", CONTACT.social]];
  var info = document.getElementById("info");
  rows.forEach(function (r) {
    if (!r[1] && (r[0] === "CAC registration number" || r[0] === "Social media")) return;
    var w = document.createElement("div");
    w.appendChild(el("dt", "", r[0]));
    var dd = el("dd", r[1] ? "" : "pending", r[1] || "To be added");
    if (r[1] && r[0] === "Email") {
      var a = el("a", "", r[1]); a.href = "mailto:" + r[1]; dd.textContent = ""; dd.appendChild(a);
    } else if (r[1] && r[0] === "Phone") {
      var t = el("a", "", r[1]); t.href = "tel:" + r[1].replace(/\s+/g, ""); dd.textContent = ""; dd.appendChild(t);
    }
    w.appendChild(dd); info.appendChild(w);
  });

  /* contact form: validate, then show a copyable message */
  var form = document.getElementById("contact-form");
  function setErr(id, msg) { document.getElementById(id).textContent = msg || ""; }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.name.value.trim(), email = form.email.value.trim(), msg = form.message.value.trim(), ok = true;
    setErr("e-name", name ? "" : "Enter your name so we know who to reply to."); if (!name) ok = false;
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setErr("e-email", emailOk ? "" : "Enter an email address like name@example.com."); if (!emailOk) ok = false;
    setErr("e-msg", msg ? "" : "Write a short note about what you need."); if (!msg) ok = false;
    if (!ok) return;
    var text = "Name: " + name + "\nEmail: " + email + (form.phone.value.trim() ? "\nPhone: " + form.phone.value.trim() : "") + "\nDivision: " + form.division.value + "\n\n" + msg;
    document.getElementById("result-text").textContent = text;
    document.getElementById("mail-btn").href = "mailto:" + CONTACT.email + "?subject=" + encodeURIComponent("Enquiry for AdVista Hub: " + form.division.value) + "&body=" + encodeURIComponent(text);
    document.getElementById("result").hidden = false;
    document.getElementById("copy-note").textContent = "";
  });
  document.getElementById("copy-btn").addEventListener("click", function () {
    var text = document.getElementById("result-text").textContent, note = document.getElementById("copy-note");
    function fallback() {
      var range = document.createRange(); range.selectNodeContents(document.getElementById("result-text"));
      var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
      note.textContent = "Message selected. Press Ctrl+C (or Copy) to copy it.";
    }
    try { navigator.clipboard.writeText(text).then(function () { note.textContent = "Copied."; }, fallback); } catch (err) { fallback(); }
  });


  /* hero headline: writes itself, holds, erases and starts again, continuously */
  var title = document.getElementById("hero-title");
  var typedBox = title.querySelector(".typed");
  var SEGMENTS = [{ text: "Innovating Across Industries, ", cls: "" }, { text: "Empowering Every Opportunity.", cls: "hl" }];
  var FULL = SEGMENTS.map(function (s) { return s.text; }).join("");
  var typeTimer = null, typeGen = 0;
  var spans = SEGMENTS.map(function (s) { return el("span", s.cls); });
  var caret = el("span", "caret");
  spans.forEach(function (sp) { typedBox.appendChild(sp); });
  typedBox.appendChild(caret);
  function renderTyped(n) {
    var left = n;
    SEGMENTS.forEach(function (s, i) {
      var part = s.text.slice(0, Math.max(0, Math.min(left, s.text.length)));
      spans[i].textContent = part; left -= s.text.length;
    });
    var last = 0;
    for (var i = 0; i < SEGMENTS.length; i++) { if (spans[i].textContent.length) last = i; }
    spans[last].appendChild(caret);
  }
  function typeHeadline() {
    clearTimeout(typeTimer);
    var gen = ++typeGen;
    title.classList.add("js-type");
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) { renderTyped(FULL.length); return; }
    var n = 0, mode = "type";
    renderTyped(0);
    function step() {
      if (gen !== typeGen) return;
      if (els.home && els.home.hidden) { typeTimer = setTimeout(step, 400); return; }
      var delay;
      if (mode === "type") {
        n++; renderTyped(n);
        var ch = FULL.charAt(n - 1);
        if (n >= FULL.length) { mode = "hold"; delay = 2800; }
        else delay = ch === "," ? 380 : ch === " " ? 60 : 55;
      } else if (mode === "hold") {
        mode = "erase"; delay = 30;
      } else {
        n -= 2; if (n <= 0) { n = 0; mode = "type"; delay = 700; } else delay = 22;
        renderTyped(n);
      }
      typeTimer = setTimeout(step, delay);
    }
    typeTimer = setTimeout(step, 500);
  }

  /* hero logo box: gentle tilt that follows the pointer */
  var heroCard = document.getElementById("hero-card");
  var canHover = window.matchMedia && window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches;
  if (canHover) {
    heroCard.parentNode.addEventListener("mousemove", function (e) {
      var r = heroCard.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      heroCard.style.transform = "rotateY(" + (x * 10).toFixed(2) + "deg) rotateX(" + (-y * 10).toFixed(2) + "deg)";
    });
    heroCard.parentNode.addEventListener("mouseleave", function () { heroCard.style.transform = ""; });
  }

  typeHeadline();
  route();
  updateProg();
  updateRecProg();
})();
