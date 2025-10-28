document.addEventListener("DOMContentLoaded", function () {
  // Basic SPA navigation
  const screens = Array.from(document.querySelectorAll(".screen-page"));
  let current = "home";

  function showScreen(id) {
    screens.forEach(
      (s) => (s.style.display = s.dataset.screen === id ? "" : "none")
    );
    current = id;
    const title = document.getElementById("appTitle");
    // Use the app name consistently in the header
    title.textContent = "Unigarant App";
  }

  document.getElementById("backBtn").addEventListener("click", () => {
    if (current === "home") return;
    showScreen("home");
  });

  document.getElementById("downloadBtn").addEventListener("click", () => {
    showModal("Dankjewel — hier zou de App Store / downloadlink openen.");
  });

  function showModal(message) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.style.position = "fixed";
    overlay.style.left = 0;
    overlay.style.top = 0;
    overlay.style.right = 0;
    overlay.style.bottom = 0;
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.background = "rgba(0,0,0,0.5)";
    overlay.style.zIndex = 9999;
    const box = document.createElement("div");
    box.style.background = "#fff";
    box.style.color = "#111";
    box.style.padding = "20px 24px";
    box.style.borderRadius = "12px";
    box.style.maxWidth = "340px";
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
    close.addEventListener("click", () => document.body.removeChild(overlay));
    box.appendChild(p);
    box.appendChild(close);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
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

  startBtn.addEventListener("click", () => startChapter(0));

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
      btn.addEventListener("click", () => onSelectChoice(idx, btn));
      qChoices.appendChild(btn);
    });
    updateProgress();
  }

  function updateProgress() {
    // Show progress relative to original chapter length when in initial phase,
    // otherwise show remaining retry count
    const total =
      phase === "initial" ? originalQuestionsCount : questionList.length;
    qProgress.textContent = `Vraag ${qIndex + 1} van ${total}`;
  }

  function onSelectChoice(idx, btn) {
    // visually select
    Array.from(qChoices.children).forEach((c) =>
      c.classList.remove("selected")
    );
    btn.classList.add("selected");
    selectedChoice = parseInt(idx, 10);
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
      // if in retry phase, remove from wrongList
      if (phase === "retry") {
        wrongList = wrongList.filter((w) => w.id !== item.id);
      }
    } else {
      // wrong
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
    setTimeout(() => {
      advanceQuestion();
    }, 700);
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

  function showChapterSummary() {
    // small summary overlay with continue button
    const correct = originalQuestionsCount - wrongList.length;
    const total = originalQuestionsCount;
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.style.position = "fixed";
    overlay.style.left = 0;
    overlay.style.top = 0;
    overlay.style.right = 0;
    overlay.style.bottom = 0;
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.background = "rgba(0,0,0,0.5)";
    overlay.style.zIndex = 9999;
    const box = document.createElement("div");
    box.className = "summary-card";
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
      document.body.removeChild(overlay);
      // move to next chapter or finish
      if (currentChapter < chapters.length - 1)
        startChapter(currentChapter + 1);
      else showFinalResult();
    });
    box.appendChild(next);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
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
});
