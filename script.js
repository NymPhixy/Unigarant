document.addEventListener("DOMContentLoaded", function () {
  // Progressive Web App install prompt helper
  let deferredPrompt = null;
  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    deferredPrompt = e; // save the event for later trigger
    const dl = document.getElementById("downloadBtn");
    if (dl) dl.style.display = "";
  });

  // Basic SPA navigation
  const screens = Array.from(document.querySelectorAll(".screen-page"));
  let current = "home";

  function showScreen(id) {
    // re-query screens each time so dynamically-created screens (profile) are included
    const screensNow = Array.from(document.querySelectorAll(".screen-page"));
    screensNow.forEach(
      (s) => (s.style.display = s.dataset.screen === id ? "" : "none")
    );
    current = id;
    const title = document.getElementById("appTitle");
    // Use the app name consistently in the header
    title.textContent = "Unigarant App";
    // record visits on the home screen for visit-based badges
    if (id === "home") recordVisitDay();
  }

  document.getElementById("backBtn").addEventListener("click", () => {
    if (current === "home") {
      // if we're already on home and mobile-mode is active, exit mobile-mode
      if (document.body.classList.contains("mobile-mode")) {
        document.body.classList.remove("mobile-mode");
        const ml = document.getElementById("mobileLauncher");
        if (ml) ml.setAttribute("aria-hidden", "false");
      }
      return;
    }
    showScreen("home");
  });

  const downloadBtnEl = document.getElementById("downloadBtn");
  downloadBtnEl.addEventListener("click", () => {
    // If we captured a beforeinstallprompt event, use it to show the install dialog
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          showModal(
            "Dankjewel — app kan nu worden geïnstalleerd (of staat in je startscherm)."
          );
        } else {
          showModal(
            "Installatie niet uitgevoerd. Je kunt de app nog steeds via de link openen."
          );
        }
        deferredPrompt = null;
      });
    } else {
      showModal("Dankjewel — hier zou de App Store / downloadlink openen.");
    }
  });

  function showModal(message) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    const box = document.createElement("div");
    box.className = "modal-box";
    box.style.textAlign = "center";
    const p = document.createElement("p");
    p.textContent = message;
    const close = document.createElement("button");
    close.textContent = "Sluit";
    close.style.marginTop = "12px";
    close.style.padding = "8px 12px";
    close.style.border = "none";
    close.style.background = "#333";
    close.style.color = "#fff";
    close.style.borderRadius = "8px";
    close.style.cursor = "pointer";
    close.addEventListener("click", () => closeModal(overlay));
    // allow ESC to close
    function onEsc(e) {
      if (e.key === "Escape") closeModal(overlay);
    }
    document.addEventListener("keydown", onEsc);
    // focus management: trap focus inside modal
    const focusableSelector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    function trapFocus(e) {
      const focusable = box.querySelectorAll(focusableSelector);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", trapFocus);
    box.appendChild(p);
    box.appendChild(close);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    // focus the close button when opened
    close.focus();

    function closeModal(ov) {
      if (!ov || !ov.parentNode) return;
      document.removeEventListener("keydown", onEsc);
      document.removeEventListener("keydown", trapFocus);
      ov.parentNode.removeChild(ov);
    }
  }

  // Chapters & questions (concept data based on earlier content)
  const chapters = [
    {
      title: "Basisbegrippen",
      questions: [
        {
          id: "1-1",
          q: "Wat is het doel van een verzekering?",
          choices: [
            "Winst maken bij schade",
            "Financiële risico's beperken",
            "Een manier om te sparen",
            "Verplichting van de overheid",
          ],
          correct: 1,
          hint: "Een verzekering beschermt tegen onverwachte kosten.",
        },
        {
          id: "1-2",
          q: "Wat betekent 'premie'?",
          choices: [
            "Bedrag dat je ontvangt na schade",
            "Het bedrag dat je betaalt voor dekking",
            "De maximale vergoeding",
            "Korting bij schadevrij rijden",
          ],
          correct: 1,
          hint: "Het is een periodieke betaling voor je dekking.",
        },
        {
          id: "1-3",
          q: "Wat is 'eigen risico'?",
          choices: [
            "Het maximale dat je kunt claimen",
            "Het deel van de schade dat je zelf betaalt",
            "Speciale korting",
            "Alleen bij reisverzekeringen",
          ],
          correct: 1,
          hint: "Je betaalt dit bedrag zelf bij een claim.",
        },
        {
          id: "1-4",
          q: "Wat dekt WA (Wettelijke Aansprakelijkheid)?",
          choices: [
            "Schade aan je eigen spullen",
            "Schade die jij bij anderen veroorzaakt",
            "Alleen voor bedrijven",
            "Dekking voor alles",
          ],
          correct: 1,
          hint: "WA is verplicht voor voertuigen en dekt schade aan anderen.",
        },
        {
          id: "1-5",
          q: "Wat zijn polisvoorwaarden?",
          choices: [
            "Reclamefolders",
            "De afspraken tussen jou en de verzekeraar",
            "Alleen voor bedrijven",
            "Het aantal schadevrije jaren",
          ],
          correct: 1,
          hint: "De polisvoorwaarden beschrijven wat wel en niet verzekerd is.",
        },
        {
          id: "1-6",
          q: "Wat gebeurt er als je premie niet betaalt?",
          choices: [
            "De dekking kan stoppen",
            "De premie daalt",
            "Je ontvangt een uitkering",
            "Niets",
          ],
          correct: 0,
          hint: "Bij niet-betaling kan de verzekering (tijdelijk) stoppen.",
        },
        {
          id: "1-7",
          q: "Wat betekent 'schadeclaim'?",
          choices: [
            "Verzoek om premieverlaging",
            "Melding voor vergoeding bij schade",
            "Boete",
            "Document voor belastingdienst",
          ],
          correct: 1,
          hint: "Je meldt een gebeurtenis om vergoeding te krijgen.",
        },
        {
          id: "1-8",
          q: "Wanneer is een verzekering verplicht in NL?",
          choices: [
            "Voor voertuigen (WA) en zorgverzekering",
            "Voor alle bezittingen",
            "Alleen voor bedrijven",
            "Nooit",
          ],
          correct: 0,
          hint: "Voor voertuigen is WA verplicht en zorgverzekering is wettelijk geregeld.",
        },
      ],
    },
    {
      title: "Je voertuig verzekeren",
      questions: [
        {
          id: "2-1",
          q: "Wat dekt een WA-verzekering?",
          choices: [
            "Schade aan je eigen voertuig",
            "Schade die jij aan anderen veroorzaakt",
            "Ruitschade",
            "Diefstal",
          ],
          correct: 1,
          hint: "WA vergoedt schade aan anderen.",
        },
        {
          id: "2-2",
          q: "Wat is beperkt casco?",
          choices: [
            "Alleen WA",
            "Schade door brand, diefstal, storm, ruitbreuk",
            "Alles inclusief eigen schade",
            "Alleen bij nieuwe auto",
          ],
          correct: 1,
          hint: "Beperkt casco dekt specifieke gebeurtenissen zoals brand of diefstal.",
        },
        {
          id: "2-3",
          q: "Wat dekt allrisk / all-risk?",
          choices: [
            "Alleen ruitschade",
            "Schade aan eigen voertuig, ook bij eigen schuld",
            "Alleen bij overmacht",
            "Alleen bij parkeren",
          ],
          correct: 1,
          hint: "Allrisk vergoedt vaak ook eigen schuld-situaties.",
        },
        {
          id: "2-4",
          q: "Wat gebeurt er bij rijden onder invloed?",
          choices: [
            "Schade wordt vergoed",
            "Gedeeltelijk vergoed",
            "Geen dekking",
            "Alleen eigen schade",
          ],
          correct: 2,
          hint: "Alcohol/drugs zijn vaak uitgesloten van dekking.",
        },
        {
          id: "2-5",
          q: "Wat zijn schadevrije jaren?",
          choices: [
            "Jaren zonder ingediende claims",
            "Hoe lang je verzekerd bent",
            "De premie die je betaalt",
            "Alleen bij reisverzekeringen",
          ],
          correct: 0,
          hint: "Schadevrije jaren bepalen no-claimkorting.",
        },
        {
          id: "2-6",
          q: "Hoe lang mag je auto aaneengesloten in het buitenland verzekerd zijn?",
          choices: ["Onbeperkt", "3 maanden", "6 maanden", "1 jaar"],
          correct: 2,
          hint: "Vaak maximaal 6 maanden; check je polis voor zekerheid.",
        },
        {
          id: "2-7",
          q: "Ruitschade bij aangesloten reparateur: wat vaak geldt?",
          choices: [
            "Altijd eigen risico",
            "Geen eigen risico bij aangesloten partners",
            "Geen vergoeding",
            "Hogere premie",
          ],
          correct: 1,
          hint: "Sommige verzekeraars laten geen eigen risico gelden bij partners.",
        },
        {
          id: "2-8",
          q: "Wie is verzekerd als iemand met toestemming jouw auto rijdt?",
          choices: [
            "Alleen jij",
            "Alleen de bestuurder",
            "Jij als verzekeringnemer blijft aansprakelijk",
            "Niemand",
          ],
          correct: 2,
          hint: "Verzekeringsvoorwaarden regelen onder welke voorwaarden een bestuurder is gedekt.",
        },
      ],
    },
    {
      title: "Reizen & spullen",
      questions: [
        {
          id: "3-1",
          q: "Maximale duur van één reis bij doorlopende reisverzekering?",
          choices: ["30 dagen", "60 dagen", "90 dagen", "Onbeperkt"],
          correct: 1,
          hint: "Veel polissen limiteren reizen tot 60 dagen per keer.",
        },
        {
          id: "3-2",
          q: "Wat moet je doen bij diefstal van bagage?",
          choices: [
            "Direct declareren",
            "Politieaangifte doen + bewijs",
            "Pas bij thuiskomst melden",
            "Niets",
          ],
          correct: 1,
          hint: "Aangifte is meestal vereist voor vergoeding.",
        },
        {
          id: "3-3",
          q: "Is schade aan vakantieverblijf verzekerd?",
          choices: [
            "Nee",
            "Ja, vaak tot een limiet",
            "Alleen bij brand",
            "Alleen met extra dekking",
          ],
          correct: 1,
          hint: "Meestal is dit meeverzekerd binnen limieten.",
        },
        {
          id: "3-4",
          q: "Wat betekent 'hulpverlening' bij een reisverzekering?",
          choices: [
            "Psychische hulp",
            "24/7 noodhulp bij ziekte/pech",
            "Geldlening",
            "Juridisch advies",
          ],
          correct: 1,
          hint: "De alarmcentrale regelt medische en reisondersteuning.",
        },
        {
          id: "3-5",
          q: "Wat dekt een AVP (aansprakelijkheidsverzekering)?",
          choices: [
            "Schade aan eigen spullen",
            "Schade die jij onbedoeld bij anderen veroorzaakt",
            "Alleen autoschade",
            "Alleen binnen NL",
          ],
          correct: 1,
          hint: "AVP dekt schade die jij aan anderen toebrengt.",
        },
        {
          id: "3-6",
          q: "Wanneer is een gestolen telefoon vaak verzekerd uit de auto?",
          choices: [
            "Altijd",
            "Alleen bij bewijs van braak/aangifte",
            "Alleen bij waterschade",
            "Nooit",
          ],
          correct: 1,
          hint: "Onbeheerd achtergelaten spullen zijn vaak uitgesloten.",
        },
        {
          id: "3-7",
          q: "Huur van scooter op vakantie: schade verzekerd?",
          choices: [
            "Altijd",
            "Alleen met extra huurdekking",
            "Alleen als verhuurder zegt",
            "Nooit",
          ],
          correct: 1,
          hint: "Controleer of je reis- of verhuurderdekking voldoende is.",
        },
        {
          id: "3-8",
          q: "Wat is werelddekking?",
          choices: [
            "Alleen Europa",
            "Wereldwijd",
            "Alleen EU",
            "Alleen partnerlanden",
          ],
          correct: 1,
          hint: "Werelddekking omvat meestal landen buiten Europa zoals VS/ZA/AS.",
        },
      ],
    },
    {
      title: "Voorwaarden & uitzonderingen",
      questions: [
        {
          id: "4-1",
          q: "Wanneer vervalt recht op vergoeding?",
          choices: [
            "Bij fraude/opzet/alcohol",
            "Alleen bij te late melding",
            "Alleen bij verkeerde dekking",
            "Nooit",
          ],
          correct: 0,
          hint: "Opzet, fraude en intoxicatie zijn vaak uitgesloten.",
        },
        {
          id: "4-2",
          q: "Wat gebeurt als je verhuist en dit niet doorgeeft?",
          choices: [
            "Verzekering stopt",
            "Dekking/premie kan onjuist zijn",
            "Geen effect",
            "Alleen bij dure auto",
          ],
          correct: 1,
          hint: "Verzekeraars berekenen premie op basis van woonplaats.",
        },
        {
          id: "4-3",
          q: "Wat is dagwaarde?",
          choices: [
            "Waarde op dag van aankoop",
            "Actuele waarde bij schade",
            "Waarde incl. btw",
            "Nieuwprijs",
          ],
          correct: 1,
          hint: "Dagwaarde is de waarde op het moment van schade.",
        },
        {
          id: "4-4",
          q: "Wat is nieuwwaarde?",
          choices: [
            "Prijs van nieuw vergelijkbaar object",
            "Oude waarde",
            "Tweedehandswaarde",
            "Maximale vergoeding",
          ],
          correct: 0,
          hint: "Nieuwwaarde is vaak van toepassing in eerste jaren na aankoop.",
        },
        {
          id: "4-5",
          q: "Voordeel van hoger eigen risico?",
          choices: [
            "Lagere premie",
            "Hogere dekking",
            "Snellere afhandeling",
            "Geen voordeel",
          ],
          correct: 0,
          hint: "Meer zelf betalen betekent meestal lagere premie.",
        },
        {
          id: "4-6",
          q: "Wat is no-claimkorting?",
          choices: [
            "Korting bij geen claim",
            "Boete bij schade",
            "Bonus na 10 jaar",
            "Alleen bij reisverzekering",
          ],
          correct: 0,
          hint: "Je krijgt korting door schadevrij te rijden.",
        },
        {
          id: "4-7",
          q: "Wanneer kun je overstappen van verzekeraar?",
          choices: [
            "Alleen na schade",
            "Na eerste looptijd of bij premiewijziging",
            "Nooit",
            "Alleen bij verhuizing",
          ],
          correct: 1,
          hint: "Meestal bij het einde van de contractperiode of bij wijziging.",
        },
        {
          id: "4-8",
          q: "Wat moet je altijd doen na schade?",
          choices: [
            "Zelf repareren",
            "Contact opnemen met verzekeraar",
            "Niets",
            "Alleen bij gewonden",
          ],
          correct: 1,
          hint: "Meld schade altijd zo snel mogelijk aan je verzekeraar.",
        },
      ],
    },
    {
      title: "Samenvatting & praktijksituaties",
      questions: [
        {
          id: "5-1",
          q: "Je rijdt onder invloed tegen een geparkeerde auto. Dekking?",
          choices: [
            "Verzekerd",
            "Geen dekking",
            "Alleen deels",
            "Alleen bij allrisk",
          ],
          correct: 1,
          hint: "Rijden onder invloed is meestal uitgesloten.",
        },
        {
          id: "5-2",
          q: "Je vergeet adreswijziging en claimt. Gevolg?",
          choices: [
            "Nooit een probleem",
            "Claim kan worden afgewezen",
            "Je premie daalt",
            "Je krijgt korting",
          ],
          correct: 1,
          hint: "Onjuiste gegevens kunnen tot afwijzing leiden.",
        },
        {
          id: "5-3",
          q: "Hotelkamer beschadigd op vakantie: wat doe je?",
          choices: [
            "Niets",
            "Melden bij beheer + aangifte",
            "Altijd zelf betalen",
            "Alleen bij diefstal",
          ],
          correct: 1,
          hint: "Meld en maak bewijs; kan onder verblijf-dekking vallen.",
        },
        {
          id: "5-4",
          q: "Camera gestolen uit onbeheerde auto: verzekerd?",
          choices: [
            "Ja",
            "Meestal niet",
            "Alleen bij alarm",
            "Alleen bij nieuwe auto",
          ],
          correct: 1,
          hint: "Onbeheerd achtergelaten spullen zijn vaak uitgesloten.",
        },
        {
          id: "5-5",
          q: "Allrisk, tegen paaltje rijden: vergoeding?",
          choices: [
            "Nee",
            "Ja, meestal wel",
            "Alleen ruit",
            "Alleen bij nieuwe auto",
          ],
          correct: 1,
          hint: "Allrisk dekt veel eigen schade situaties.",
        },
        {
          id: "5-6",
          q: "Kind laat telefoon van vriend vallen. Vergoed via?",
          choices: [
            "Eigen verzekering",
            "AVP (aansprakelijkheid)",
            "Reparatie zelf",
            "Niet verzekerd",
          ],
          correct: 1,
          hint: "AVP dekt onbedoelde schade aan anderen.",
        },
        {
          id: "5-7",
          q: "Scooter gestolen en niet op slot: verzekerd?",
          choices: [
            "Ja",
            "Niet verzekerd (nalatigheid)",
            "Alleen deels",
            "Alleen bij allrisk",
          ],
          correct: 1,
          hint: "Nalaten veiligheidsmaatregelen kan leiden tot afwijzing.",
        },
        {
          id: "5-8",
          q: "Schadevrij een jaar rijden: wat gebeurt er?",
          choices: [
            "Niets",
            "Schadevrije jaren stijgen → korting",
            "Je betaalt meer",
            "Je verliest polis",
          ],
          correct: 1,
          hint: "Schadevrije jaren geven no-claimkorting.",
        },
      ],
    },
  ];

  // UI refs
  const startBtn = document.getElementById("startQuizBtn");
  const profileBtn = document.getElementById("profileBtn");
  const qQuestion = document.getElementById("quizQuestion");
  const qChoices = document.getElementById("quizChoices");
  const qProgress = document.getElementById("qProgress");
  const chapterIndexEl = document.getElementById("chapterIndex");
  const hintEl = document.getElementById("hint");
  const nextBtn = document.getElementById("nextQ");
  const skipBtn = document.getElementById("skipQ");

  let currentChapter = 0;
  let phase = "initial"; // 'initial' or 'retry'
  let originalQuestionsCount = 0;
  let questionList = [];
  let qIndex = 0;
  let wrongList = []; // list of question objects to retry
  let selectedChoice = null;
  // per-chapter timing and state for badges
  const chapterStartTimes = {};
  let chapterHadWrong = false;

  if (startBtn) {
    startBtn.addEventListener("click", () => {
      // show chapters overview first
      renderChapters();
      showScreen("chapters");
    });
  }

  // Mobile launcher wiring: show mobile launcher on small devices
  const mobileLauncher = document.getElementById("mobileLauncher");
  const mobileStartBtn = document.getElementById("mobileStartBtn");
  function isSmallDevice() {
    try {
      return (
        window.matchMedia && window.matchMedia("(max-width: 640px)").matches
      );
    } catch (e) {
      return /Mobi|Android|iPhone|iPad/.test(navigator.userAgent || "");
    }
  }
  if (mobileLauncher) {
    // show the launcher only on small devices
    if (isSmallDevice()) {
      mobileLauncher.setAttribute("aria-hidden", "false");
      mobileLauncher.style.display = "flex";
    } else {
      mobileLauncher.setAttribute("aria-hidden", "true");
      mobileLauncher.style.display = "none";
    }
  }
  if (mobileStartBtn) {
    mobileStartBtn.addEventListener("click", () => {
      // enter mobile-mode (makes the device full-screen) and open chapters in the mockup
      document.body.classList.add("mobile-mode");
      if (mobileLauncher) mobileLauncher.setAttribute("aria-hidden", "true");
      renderChapters();
      showScreen("chapters");
      // small delay to allow layout, then scroll top
      setTimeout(() => window.scrollTo(0, 0), 120);
    });
  }

  // Profile / sign-up helpers (simple localStorage-backed profile)
  function getProfile() {
    try {
      return JSON.parse(localStorage.getItem("ug_profile") || "null");
    } catch (e) {
      return null;
    }
  }
  function setProfile(obj) {
    localStorage.setItem("ug_profile", JSON.stringify(obj));
  }
  function clearProfile() {
    localStorage.removeItem("ug_profile");
  }

  // update a single profile field (merge with existing)
  function updateProfileField(key, value) {
    const p = getProfile() || {};
    p[key] = value;
    setProfile(p);
  }

  // Completed question tracking (store as CSV of question ids)
  function getCompletedQuestions() {
    const raw = localStorage.getItem("completedQuestions") || "";
    if (!raw) return new Set();
    return new Set(raw.split(",").filter(Boolean));
  }
  function setCompletedQuestions(set) {
    localStorage.setItem("completedQuestions", Array.from(set).join(","));
  }
  function addCompletedQuestion(qid) {
    const s = getCompletedQuestions();
    if (!s.has(qid)) {
      s.add(qid);
      setCompletedQuestions(s);
    }
    return s;
  }

  // animate the matching tile for a question once it's marked complete
  function animateTileForQuestion(qid) {
    try {
      // find the tile by qid (tiles are created with data-qid)
      const tile = document.querySelector(
        `.chapter-card[data-chapter="${currentChapter}"] .tile-grid .tile[data-qid="${qid}"]`
      );
      if (tile) {
        tile.classList.add("complete");
        tile.classList.add("pop");
        // remove pop class after animation so it can re-trigger later
        setTimeout(() => tile.classList.remove("pop"), 520);
      }
    } catch (e) {
      // fail silently if DOM not available
    }
  }

  // Badges persistence and visit tracking
  function getBadgesStore() {
    try {
      return JSON.parse(localStorage.getItem("ug_badges") || "{}") || {};
    } catch (e) {
      return {};
    }
  }
  function setBadgesStore(obj) {
    localStorage.setItem("ug_badges", JSON.stringify(obj));
  }
  function addBadge(name) {
    const store = getBadgesStore();
    if (store[name]) return false;
    store[name] = { earnedAt: new Date().toISOString() };
    setBadgesStore(store);
    return true;
  }
  function hasBadge(name) {
    const store = getBadgesStore();
    return !!store[name];
  }
  function badgeList() {
    return Object.keys(getBadgesStore());
  }

  function recordVisitDay() {
    const key = "ug_visits";
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    try {
      const raw = JSON.parse(localStorage.getItem(key) || "[]");
      const set = new Set(raw || []);
      set.add(today);
      const arr = Array.from(set).slice(-30); // keep last 30 days
      localStorage.setItem(key, JSON.stringify(arr));
      if (arr.length >= 3) addBadge("Dagelijkse Bezoeker");
    } catch (e) {
      localStorage.setItem(key, JSON.stringify([today]));
    }
  }

  // Render profile screen (uses showScreen so it stays inside mockup)
  function renderProfile() {
    // create a simple profile screen if not present
    const screen = document.querySelector('[data-screen="profile"]');
    if (!screen) {
      const sec = document.createElement("section");
      sec.className = "app-body screen-page";
      sec.dataset.screen = "profile";
      sec.style.display = "none";
      sec.innerHTML = `
        <div class="profile-card">
          <h2 id="profileName">Profiel</h2>
          <div id="profileBadges" class="badges-strip"></div>
          <div id="profileStats" class="profile-stat-row"></div>
          <div id="profileActions" class="profile-actions"></div>
        </div>`;
      document.querySelector(".screen").appendChild(sec);
    }
    // populate
    const profile = getProfile();
    const nameEl = document.getElementById("profileName");
    const badgesEl = document.getElementById("profileBadges");
    const statsEl = document.getElementById("profileStats");
    const actionsEl = document.getElementById("profileActions");
    badgesEl.innerHTML = "";
    statsEl.innerHTML = "";
    actionsEl.innerHTML = "";
    if (!profile) {
      nameEl.textContent = "Bezoekersprofiel";
      // show sign up form
      const formWrap = document.createElement("div");
      formWrap.style.display = "flex";
      formWrap.style.gap = "8px";
      const input = document.createElement("input");
      input.placeholder = "Je naam";
      input.style.padding = "8px";
      input.style.borderRadius = "8px";
      const btn = document.createElement("button");
      btn.className = "primary";
      btn.textContent = "Aanmelden";
      btn.addEventListener("click", () => {
        const v = input.value.trim();
        if (!v) return showModal("Vul een naam in om je aan te melden.");
        const obj = { name: v, createdAt: Date.now() };
        setProfile(obj);
        showModal(`Welkom, ${v}! Je profiel is aangemaakt.`);
        renderProfile();
      });
      formWrap.appendChild(input);
      formWrap.appendChild(btn);
      actionsEl.appendChild(formWrap);
    } else {
      nameEl.textContent = profile.name || "Gebruiker";
      // avatar display in profile
      badgesEl.innerHTML = badgesEl.innerHTML; // ensure container present
      if (profile.avatar) {
        // remove any existing avatar element to avoid duplicates
        const existing = nameEl.parentNode.querySelector(".avatar");
        if (existing) existing.remove();
        const av = document.createElement("img");
        av.className = "avatar";
        av.src = profile.avatar;
        av.alt = profile.name + " avatar";
        // place it before badges / name
        nameEl.parentNode.insertBefore(av, nameEl);
      }
      // show stats
      const completed = getCompletedChapters();
      const cq = getCompletedQuestions();
      const s1 = document.createElement("div");
      s1.innerHTML = `<strong>${completed.length}</strong><div class='small'>Hoofdstuk(en)</div>`;
      const s2 = document.createElement("div");
      s2.innerHTML = `<strong>${cq.size}</strong><div class='small'>Vragen beantwoord</div>`;
      statsEl.appendChild(s1);
      statsEl.appendChild(s2);
      // badges (computed)
      const earned = computeBadges();
      earned.forEach((b) => {
        const chip = document.createElement("div");
        chip.className = "badge-chip";
        // show earned date if present
        const store = getBadgesStore();
        const info =
          store[b] && store[b].earnedAt
            ? ` — ${new Date(store[b].earnedAt).toLocaleDateString()}`
            : "";
        chip.textContent = b + info;
        badgesEl.appendChild(chip);
      });
      // avatar upload controls
      const uploadBtn = document.createElement("button");
      uploadBtn.className = "tertiary";
      uploadBtn.textContent = profile.avatar
        ? "Wijzig avatar"
        : "Upload avatar";
      const removeBtn = document.createElement("button");
      removeBtn.className = "tertiary";
      removeBtn.textContent = "Verwijder avatar";
      removeBtn.style.display = profile.avatar ? "inline-flex" : "none";

      // hidden file input
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.className = "visually-hidden-input";
      fileInput.addEventListener("change", (ev) => {
        const f = ev.target.files && ev.target.files[0];
        if (!f) return;
        // Resize client-side to avoid huge data-URLs and localStorage quota errors
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = new Image();
          img.onload = function () {
            const MAX = 512; // max width/height
            let w = img.width;
            let h = img.height;
            if (w > MAX || h > MAX) {
              const ratio = Math.min(MAX / w, MAX / h);
              w = Math.round(w * ratio);
              h = Math.round(h * ratio);
            }
            const canvas = document.createElement("canvas");
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, w, h);
            try {
              const data = canvas.toDataURL("image/jpeg", 0.8);
              try {
                updateProfileField("avatar", data);
                showModal("Avatar opgeslagen.");
                renderProfile();
                // update header avatar immediately
                updateHeaderAvatar();
              } catch (err) {
                console.warn("Saving avatar failed:", err);
                showModal(
                  "Kan avatar niet opslaan (opslaglimiet). Probeer een kleinere afbeelding."
                );
              }
            } catch (err) {
              console.warn("Encoding avatar failed:", err);
              showModal(
                "Kon afbeelding niet verwerken. Probeer een andere afbeelding."
              );
            }
          };
          img.onerror = function () {
            showModal(
              "Kon afbeelding niet lezen. Probeer een geldig afbeeldingsbestand."
            );
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(f);
      });

      uploadBtn.addEventListener("click", () => fileInput.click());
      removeBtn.addEventListener("click", () => {
        updateProfileField("avatar", null);
        showModal("Avatar verwijderd.");
        renderProfile();
        updateHeaderAvatar();
      });

      actionsEl.appendChild(uploadBtn);
      actionsEl.appendChild(removeBtn);
      actionsEl.appendChild(fileInput);

      const out = document.createElement("button");
      out.className = "tertiary";
      out.textContent = "Afmelden";
      out.addEventListener("click", () => {
        clearProfile();
        showModal("Je bent afgemeld.");
        renderProfile();
        updateHeaderAvatar();
      });
      actionsEl.appendChild(out);
    }
  }

  // Update header profile button to show avatar when available
  function updateHeaderAvatar() {
    const btn = document.getElementById("profileBtn");
    if (!btn) return;
    const p = getProfile();
    if (p && p.avatar) {
      btn.innerHTML = "";
      const img = document.createElement("img");
      img.className = "header-avatar";
      img.src = p.avatar;
      img.alt = p.name || "Profiel";
      btn.appendChild(img);
      // small bump animation to draw attention to the updated avatar
      setTimeout(() => {
        img.classList.add("bump");
        setTimeout(() => img.classList.remove("bump"), 520);
      }, 40);
    } else {
      btn.innerHTML = "👤";
    }
  }

  function computeBadges() {
    // Ensure milestone badges are persisted and return the full earned list.
    const completed = getCompletedChapters();
    if (completed.length >= 1) addBadge("Nieuwkomer");
    if (completed.length >= 3) addBadge("Doorzetter");
    if (completed.length >= chapters.length) addBadge("Expert");
    // extra: number of questions answered
    const cq = getCompletedQuestions();
    if (cq.size >= 20) addBadge("Kennisverzamelaar");
    // return persistent list
    return badgeList();
  }

  // wire profile button
  if (profileBtn)
    profileBtn.addEventListener("click", () => {
      renderProfile();
      showScreen("profile");
      // small enter animation and focus the first control for accessibility
      const card = document.querySelector(
        '[data-screen="profile"] .profile-card'
      );
      if (card) {
        card.classList.add("animate");
        setTimeout(() => card.classList.remove("animate"), 360);
      }
      // focus first focusable in actions
      setTimeout(() => {
        const first = document.querySelector(
          "#profileActions button, #profileActions input"
        );
        if (first) first.focus();
      }, 120);
    });

  // persistence for unlocked chapters (1 = first chapter unlocked)
  function getUnlockedChapters() {
    const v = parseInt(localStorage.getItem("unlockedChapters") || "1", 10);
    return isNaN(v) ? 1 : Math.max(1, v);
  }
  function setUnlockedChapters(n) {
    localStorage.setItem("unlockedChapters", String(n));
  }

  // completed chapters persistence (store zero-based indexes as CSV)
  function getCompletedChapters() {
    const raw = localStorage.getItem("completedChapters") || "";
    if (!raw) return [];
    return raw
      .split(",")
      .map((v) => parseInt(v, 10))
      .filter((n) => !isNaN(n));
  }
  function setCompletedChapters(arr) {
    const csv = Array.from(new Set(arr)).join(",");
    localStorage.setItem("completedChapters", csv);
  }
  function markChapterCompleted(idx) {
    const done = getCompletedChapters();
    if (!done.includes(idx)) {
      done.push(idx);
      setCompletedChapters(done);
    }
  }

  // accessibility announce helper (writes to aria-live region)
  function announce(msg) {
    const region = document.getElementById("a11yLive");
    if (!region) return;
    // clear then set to ensure screen readers pick it up
    region.textContent = "";
    setTimeout(() => {
      region.textContent = msg;
    }, 50);
  }

  // Scan chapters for long questions (threshold chars)
  const LONG_THRESHOLD = 80;
  function scanLongQuestions() {
    const map = new Map();
    chapters.forEach((c, i) => {
      let count = 0;
      c.questions.forEach((q) => {
        if (q.q && q.q.length > LONG_THRESHOLD) count++;
      });
      map.set(i, count);
    });
    return map;
  }
  const longQuestionCounts = scanLongQuestions();

  function renderChapters() {
    const list = document.getElementById("chaptersList");
    if (!list) return;
    list.innerHTML = "";
    const unlocked = getUnlockedChapters();
    const completed = getCompletedChapters();
    const completedQuestions = getCompletedQuestions();
    chapters.forEach((c, i) => {
      const num = i + 1;
      const card = document.createElement("div");
      let cls = "chapter-card" + (num > unlocked ? " locked" : "");
      if (completed.includes(i)) cls += " completed";
      card.className = cls;
      // tag with chapter index so tiles can be targeted for animations
      card.dataset.chapter = i;
      const left = document.createElement("div");
      left.innerHTML = `<div class='title'>Hoofdstuk ${num} — ${c.title}</div>`;
      const right = document.createElement("div");
      right.className = "meta";
      if (completed.includes(i)) right.textContent = "Voltooid";
      else if (num < unlocked) right.textContent = "Voltooid";
      else if (num === unlocked) right.textContent = "Ontgrendeld";
      else right.textContent = "Vergrendeld";
      // long questions badge
      const longCount = longQuestionCounts.get(i) || 0;
      if (longCount > 0) {
        const badge = document.createElement("span");
        badge.className = "badge-long";
        badge.textContent = `${longCount} lange vraag(en)`;
        right.appendChild(badge);
      }
      card.appendChild(left);
      // add tile grid showing per-question progress for this chapter
      const tiles = document.createElement("div");
      tiles.className = "tile-grid";
      tiles.style.marginTop = "8px";
      c.questions.forEach((q) => {
        const t = document.createElement("div");
        t.className = "tile";
        // add qid so we can animate specific tiles when answered
        t.dataset.qid = q.id;
        if (completed.includes(i) || completedQuestions.has(q.id))
          t.classList.add("complete");
        tiles.appendChild(t);
      });
      left.appendChild(tiles);
      card.appendChild(right);
      card.addEventListener("click", () => {
        if (num > unlocked) {
          showModal(
            "Dit hoofdstuk is vergrendeld. Voltooi eerder hoofdstukken om verder te gaan."
          );
        } else {
          startChapter(i);
        }
      });
      list.appendChild(card);
    });
    // small home badges summary update
    const homeBadges = document.getElementById("homeBadges");
    if (homeBadges) {
      homeBadges.innerHTML = "";
      const completedCount = completed.length;
      const total = chapters.length;
      const chip = document.createElement("div");
      chip.className = "badge-chip";
      chip.innerHTML = `Hoofdstukken ${completedCount}/${total}`;
      homeBadges.appendChild(chip);
      const cq = document.createElement("div");
      cq.className = "badge-chip";
      cq.innerHTML = `Vragen ${getCompletedQuestions().size}`;
      homeBadges.appendChild(cq);
    }
  }

  function startChapter(idx) {
    currentChapter = idx;
    phase = "initial";
    const chap = chapters[currentChapter];
    // copy questions
    questionList = chap.questions.map((q) => Object.assign({}, q));
    originalQuestionsCount = questionList.length;
    qIndex = 0;
    wrongList = [];
    selectedChoice = null;
    hintEl.classList.remove("show");
    // record start time for potential "Snelle Starter" badge and reset wrong flag
    chapterStartTimes[currentChapter] = Date.now();
    chapterHadWrong = false;
    renderQuestion();
    showScreen("quiz");
    updateChapterHeader();
  }

  function updateChapterHeader() {
    chapterIndexEl.textContent = currentChapter + 1;
  }

  function renderQuestion() {
    const item = questionList[qIndex];
    qQuestion.textContent = item.q;
    qChoices.innerHTML = "";
    hintEl.classList.remove("show");
    selectedChoice = null;
    item.choices.forEach((c, idx) => {
      const btn = document.createElement("button");
      btn.className = "choice";
      btn.textContent = c;
      btn.dataset.idx = idx;
      btn.setAttribute("role", "button");
      btn.setAttribute("aria-pressed", "false");
      btn.tabIndex = 0;
      btn.addEventListener("click", () => onSelectChoice(idx, btn));
      // keyboard support: Enter/Space to select, arrows to navigate
      btn.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          onSelectChoice(idx, btn);
        } else if (ev.key === "ArrowDown" || ev.key === "ArrowRight") {
          ev.preventDefault();
          const next = btn.nextElementSibling;
          if (next) next.focus();
        } else if (ev.key === "ArrowUp" || ev.key === "ArrowLeft") {
          ev.preventDefault();
          const prev = btn.previousElementSibling;
          if (prev) prev.focus();
        }
      });
      qChoices.appendChild(btn);
    });
    updateProgress();
    // announce question for screen reader users
    announce(`Vraag ${qIndex + 1} van ${originalQuestionsCount}: ${item.q}`);
  }

  function updateProgress() {
    // Show progress relative to original chapter length when in initial phase,
    // otherwise show remaining retry count
    const total =
      phase === "initial" ? originalQuestionsCount : questionList.length;
    qProgress.textContent = `Vraag ${qIndex + 1} van ${total}`;
    // brief progress announce
    announce(qProgress.textContent);
    // Update visual progress bar if present
    try {
      const bar = document.getElementById("qProgressBar");
      if (bar) {
        const percent = Math.round(((qIndex + 1) / Math.max(1, total)) * 100);
        bar.style.width = percent + "%";
        // add a short glow to emphasize change
        bar.classList.add("grow");
        setTimeout(() => bar.classList.remove("grow"), 520);
      }
    } catch (e) {
      // ignore if DOM not available
    }
  }

  function onSelectChoice(idx, btn) {
    // visually select
    Array.from(qChoices.children).forEach((c) =>
      c.classList.remove("selected")
    );
    btn.classList.add("selected");
    // Accessible pressed state
    Array.from(qChoices.children).forEach((c) =>
      c.setAttribute("aria-pressed", "false")
    );
    btn.setAttribute("aria-pressed", "true");
    selectedChoice = parseInt(idx, 10);
    // announce selected choice text
    announce(`Antwoord geselecteerd: ${btn.textContent}`);
  }

  nextBtn.addEventListener("click", () => {
    if (selectedChoice === null) {
      showModal("Kies eerst een antwoord om verder te gaan.");
      return;
    }
    evaluateAnswer();
  });

  skipBtn.addEventListener("click", () => {
    // Treat skip as wrong
    selectedChoice = -1;
    evaluateAnswer(true);
  });

  function evaluateAnswer(isSkip = false) {
    const item = questionList[qIndex];
    const buttons = Array.from(qChoices.children);
    // mark correct/incorrect visually
    buttons.forEach((b) => b.classList.remove("correct", "incorrect"));
    const correctIdx = item.correct;
    if (!isSkip && selectedChoice === correctIdx) {
      buttons[selectedChoice].classList.add("correct");
      // mark question completed
      addCompletedQuestion(item.id);
      // animate the matching tile for immediate visual feedback
      animateTileForQuestion(item.id);
      // if completing this question completed the chapter, mark chapter completed and unlock next
      try {
        const cq = getCompletedQuestions();
        const allDone = chapters[currentChapter].questions.every((qq) =>
          cq.has(qq.id)
        );
        const completed = getCompletedChapters();
        if (allDone && !completed.includes(currentChapter)) {
          const perfect = !chapterHadWrong && phase === "initial";
          onChapterCompleted(currentChapter, perfect);
        }
      } catch (e) {}
      // if in retry phase, remove from wrongList
      if (phase === "retry") {
        wrongList = wrongList.filter((w) => w.id !== item.id);
      }
    } else {
      // wrong
      chapterHadWrong = true;
      if (selectedChoice >= 0 && buttons[selectedChoice])
        buttons[selectedChoice].classList.add("incorrect");
      // add to wrongList if not already present
      if (!wrongList.find((w) => w.id === item.id)) {
        wrongList.push(Object.assign({}, item));
      }
      // show hint
      hintEl.textContent = item.hint || "Let op de polisvoorwaarden.";
      hintEl.classList.add("show");
    }

    // short delay then advance
    // give users more time to read the hint when the answer was wrong or skipped
    let delayMs = 700; // default for correct
    if (
      isSkip ||
      selectedChoice === -1 ||
      (selectedChoice !== correctIdx && !isSkip)
    ) {
      // wrong or skipped answers — allow more time to read the hint
      delayMs = 2200;
      // focus the hint area so users (and screen readers) notice it
      try {
        hintEl.setAttribute("tabindex", "-1");
        hintEl.focus();
      } catch (e) {}
    }
    setTimeout(() => {
      advanceQuestion();
    }, delayMs);
  }

  function advanceQuestion() {
    // move to next question in current list
    qIndex++;
    const totalNow = questionList.length;
    if (qIndex >= totalNow) {
      // finished current pass
      if (phase === "initial") {
        if (wrongList.length > 0) {
          // begin retry phase: show summary then retry wrongList
          phase = "retry";
          questionList = wrongList.map((q) => Object.assign({}, q));
          qIndex = 0;
          hintEl.classList.remove("show");
          showModal(
            `Je hebt ${questionList.length} foutieve vraag(en). Herhaal deze nu.`
          );
          renderQuestion();
        } else {
          // chapter complete
          showChapterSummary();
        }
      } else if (phase === "retry") {
        if (wrongList.length > 0) {
          // still some wrongs (user kept answering wrong)
          questionList = wrongList.map((q) => Object.assign({}, q));
          qIndex = 0;
          hintEl.classList.remove("show");
          renderQuestion();
        } else {
          // all corrected
          showChapterSummary();
        }
      }
    } else {
      // continue with next question
      selectedChoice = null;
      hintEl.classList.remove("show");
      renderQuestion();
    }
  }

  // Called whenever a chapter is completed (from different flows)
  function onChapterCompleted(idx, perfect) {
    // persist chapter
    markChapterCompleted(idx);
    // award perfect badge
    if (perfect) addBadge("Perfecte Ronde");
    // check duration
    try {
      const started = chapterStartTimes[idx];
      if (started) {
        const dur = Date.now() - started;
        // if completed under 2 minutes
        if (dur <= 2 * 60 * 1000) addBadge("Snelle Starter");
      }
    } catch (e) {}
    // unlock next chapter if needed
    const unlocked = getUnlockedChapters();
    const shouldUnlock = idx + 2; // next chapter number
    if (shouldUnlock > unlocked) setUnlockedChapters(shouldUnlock);
    renderChapters();
    showModal("Hoofdstuk voltooid — voortgang opgeslagen.");
  }

  function showChapterSummary() {
    // small summary overlay with continue button
    const correct = originalQuestionsCount - wrongList.length;
    const total = originalQuestionsCount;
    // Create an overlay inside the device screen so the message stays within the phone mockup
    const overlay = document.createElement("div");
    overlay.className = "in-device-overlay";
    const box = document.createElement("div");
    box.className = "modal-box summary-card";
    box.innerHTML = `<h3>Hoofdstuk voltooid</h3>
      <p class='muted'>Je hebt ${
        total - wrongList.length
      } van ${total} in eerste instantie goed. ${
      wrongList.length
    } moet(en) herhaald worden tijdens de hoofdstukronde.</p>`;
    const next = document.createElement("button");
    next.className = "primary";
    next.textContent =
      currentChapter < chapters.length - 1
        ? `Ga naar hoofdstuk ${currentChapter + 2}`
        : "Voltooien";
    next.style.marginTop = "12px";
    next.addEventListener("click", () => {
      // remove the overlay from whichever parent it has
      if (overlay && overlay.parentNode)
        overlay.parentNode.removeChild(overlay);
      // central completion handling (awards badges, unlocks, renders)
      const perfect = !chapterHadWrong && phase === "initial";
      onChapterCompleted(currentChapter, perfect);
      announce(`Hoofdstuk ${currentChapter + 1} voltooid`);
      // proceed to next chapter if available
      if (currentChapter < chapters.length - 1) {
        startChapter(currentChapter + 1);
      } else showFinalResult();
    });
    box.appendChild(next);
    overlay.appendChild(box);
    // append inside the active device screen so it stays within the mockup bounds
    const screenEl = document.querySelector(".screen");
    if (screenEl) {
      screenEl.appendChild(overlay);
    } else {
      // fallback to body if .screen not found
      document.body.appendChild(overlay);
    }
  }

  function showFinalResult() {
    // Simple final screen
    const title = document.getElementById("resultTitle");
    const desc = document.getElementById("resultDesc");
    title.textContent = "Gefeliciteerd!";
    desc.textContent =
      "Je hebt alle hoofdstukken doorlopen. Herhaal een hoofdstuk om je score te verbeteren.";
    showScreen("result");
  }

  // share and view insurance buttons
  document.getElementById("shareBtn").addEventListener("click", function () {
    const text =
      document.getElementById("resultTitle").textContent +
      " — via Unigarant App";
    if (navigator.clipboard)
      navigator.clipboard.writeText(text).then(
        function () {
          showModal("Resultaat gekopieerd naar je klembord — deel het!");
        },
        function () {
          showModal("Kopieer dit: " + text);
        }
      );
  });

  document
    .getElementById("viewInsurance")
    .addEventListener("click", function () {
      showModal(
        "Hier zou je een voorstel naar een passende Unigarant-verzekering zien."
      );
    });

  // Start on home
  showScreen("home");
  // ensure header avatar shows saved avatar (if any)
  updateHeaderAvatar();

  // --- Carousel behavior (controls, indicators, swipe, keyboard) ---
  (function setupCarousel() {
    const track = document.getElementById("carouselTrack");
    const prev = document.getElementById("carouselPrev");
    const next = document.getElementById("carouselNext");
    const indicators = document.getElementById("carouselIndicators");
    if (!track || !prev || !next || !indicators) return;

    const slides = Array.from(track.querySelectorAll(".carousel-slide"));
    let currentSlide = 0;

    function updateCarousel() {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      // update indicators
      Array.from(indicators.children).forEach((btn, i) => {
        const selected = i === currentSlide;
        btn.setAttribute("aria-selected", selected ? "true" : "false");
        btn.classList.toggle("active", selected);
      });
    }

    // create indicators
    slides.forEach((s, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", i === 0 ? "true" : "false");
      b.addEventListener("click", () => {
        currentSlide = i;
        updateCarousel();
      });
      indicators.appendChild(b);
    });

    prev.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateCarousel();
    });
    next.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateCarousel();
    });

    // keyboard support when focus is inside carousel region
    document.addEventListener("keydown", (e) => {
      // ignore when typing in inputs
      const active = document.activeElement;
      if (
        active &&
        (active.tagName === "INPUT" || active.tagName === "TEXTAREA")
      )
        return;
      if (e.key === "ArrowLeft") prev.click();
      if (e.key === "ArrowRight") next.click();
    });

    // pointer-based swipe
    let startX = 0;
    let deltaX = 0;
    let isDown = false;
    track.addEventListener("pointerdown", (e) => {
      isDown = true;
      startX = e.clientX;
      track.setPointerCapture(e.pointerId);
    });
    track.addEventListener("pointermove", (e) => {
      if (!isDown) return;
      deltaX = e.clientX - startX;
    });
    track.addEventListener("pointerup", (e) => {
      isDown = false;
      if (Math.abs(deltaX) > 40) {
        if (deltaX < 0) next.click();
        else prev.click();
      }
      deltaX = 0;
      try {
        track.releasePointerCapture(e.pointerId);
      } catch (er) {}
    });
    track.addEventListener("pointercancel", () => {
      isDown = false;
      deltaX = 0;
    });

    // wire slide CTAs
    const startSlideBtn = document.getElementById("startQuizBtnSlide");
    if (startSlideBtn)
      startSlideBtn.addEventListener("click", () => {
        renderChapters();
        showScreen("chapters");
      });
    const buyBtn = document.getElementById("buyInsuranceBtn");
    if (buyBtn)
      buyBtn.addEventListener("click", () => {
        showModal("Je wordt doorgestuurd naar onze afsluitpagina.");
        window.open("https://duo-stand-05987502.figma.site", "_blank");
      });

    // primary CTAs added below the carousel on the landing screen
    const startPrimary = document.getElementById("startQuizBtnPrimary");
    if (startPrimary)
      startPrimary.addEventListener("click", () => {
        renderChapters();
        showScreen("chapters");
      });
    const visitPrimary = document.getElementById("visitSitePrimary");
    if (visitPrimary)
      visitPrimary.addEventListener("click", () => {
        // open the public website (demo) in a new tab
        window.open("https://duo-stand-05987502.figma.site", "_blank");
      });

    // initial paint
    updateCarousel();
  })();

  // Delegated click handler to ensure any "Doe de quiz" CTA (hero, primary, slide)
  // always opens the chapters/quiz view even if the DOM structure changes.
  document.addEventListener("click", function (e) {
    const btn = e.target.closest && e.target.closest("button, a");
    if (!btn) return;
    const id = btn.id || "";
    const txt = (btn.textContent || "").trim().toLowerCase();
    const inHero = !!btn.closest && !!btn.closest(".hero-ctas");
    if (
      id === "startQuizBtn" ||
      id === "startQuizBtnPrimary" ||
      id === "startQuizBtnSlide" ||
      inHero ||
      txt === "doe de quiz"
    ) {
      e.preventDefault();
      renderChapters();
      showScreen("chapters");
    }
  });

  // register a minimal service worker to allow PWA install (optional caching left out intentionally)
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function (reg) {
        console.log("Service worker registered.", reg);
      })
      .catch(function (err) {
        console.warn("Service worker registration failed:", err);
      });
  }
});
