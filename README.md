# Unigarant Quiz Prototype — Mobile testing

Korte instructies om deze HTML/CSS/JS-mockup als mobiele prototype te testen of te installeren.

1. Lokale server met Node (aanbevolen — geen Python nodig)

Open PowerShell in de projectmap en run:

```powershell
cd "C:\Users\ruben\OneDrive - Hanze\Hanze\Jaar 2\P1\TMS\Prototype"
npm install
npm run dev
```

De site wordt dan geserveerd op poort 8000. Zoek je PC's LAN-IP met `ipconfig` en open op je telefoon:
`http://<JE_PC_IP>:8000`

2. Public hosting (aanbevolen voor demo)

- GitHub Pages: push deze map naar een repo en activeer Pages op de `main` branch (of gebruik `/docs`).
- Netlify / Vercel: drag & drop of koppel je Git-repo. Beide geven direct een publieke URL.

3. Installeren als app (PWA)

- De prototype heeft een `manifest.json` en een minimale service worker.
- Bij moderne browsers verschijnt de install prompt (of klik op 'Download de app' knop als de prompt is opgeslagen).

4. Test checklist

- Controleer op echte telefoon: layout, touch targets, performance.
- Test in Chrome DevTools (Device toolbar) voor snelle iteraties.
- Maak screenshots van problemen en noteer fixes.

5. Opmerkingen

- Voor een volledige offline PWA kun je caching toevoegen in `service-worker.js`.
- Voeg echte icon-bestanden toe in `icons/` (192/512) voor nette installatie-icoontjes.

# Verzekerd op reis — Prototype web showcase

Deze statische demo toont een iPhone-mockup waarin je een korte prototype-ervaring kunt doorlopen: de campagne "De Rustige Reis" met een korte quiz en resultaatpagina.

Wat is nieuw

- Meerdere schermen in de app-mockup: Home, Quiz (3 vragen) en Resultaat.
- Eenvoudige SPA-navigatie (knoppen) en quizlogica met resultaatprofielen.
- ANWB-geel accentkleur en knoppen om interacties te testen.

Bestanden

- `index.html` — pagina met iPhone mockup en alle schermen
- `styles.css` — stijlen voor iPhone, schermen en quiz UI
- `script.js` — navigatie en quizlogica (rendering, scoring, result)

Hoe te gebruiken

1. Open de map in Verkenner en dubbelklik `index.html` (snelle preview), of start lokaal met npm:

```powershell
npm install
npm run dev
# open op de PC: http://localhost:8000
```

2. In de mockup: klik op "Start de quiz" om te beginnen. Beantwoord de vragen per hoofdstuk en bekijk je profielresultaat.

Wat kun je verder doen

- Koppelen van het resultaat naar een Unigarant-aanbieding of TestFlight-link.
- Uitbreiden met meer vragen, animaties, of swipe-navigatie.
- Hosten op GitHub Pages voor gemakkelijk delen.

Wil je dat ik de quiz uitbreid met 6–8 vragen, toevoeging van animaties of exporteerbare deelkaarten (afbeelding/og-image)? Laat het weten.

Toegankelijkheids- en interactie-updates

- Keyboard & screen reader support: keuzes zijn nu tabbable en reageren op Enter/Space; pijltjestoetsen verplaatsen focus tussen keuzes.
- ARIA live region: voortgang en vraagteksten worden aangekondigd voor screen reader-gebruikers.
- Modalen: traps focus en kunnen gesloten worden met de Escape-toets.
- Visual feedback: focus outlines en pressed/active states toegevoegd; reduced-motion wordt gerespecteerd.
- Chapters: voltooide hoofdstukken worden visueel gemarkeerd; de status (Vergrendeld/Ontgrendeld/Voltooid) wordt bewaard in localStorage.
- Lange vragen detectie: hoofdstukken met vragen langer dan 80 tekens krijgen een badge in het hoofdstukkenoverzicht zodat je ze kunt inkorten voor mobiel.

Testen

1. Start de lokale server en open de site op een telefoon.
2. Test navigatie met toetsenbord: tab → kies antwoord met Enter of Space. Gebruik pijltjestoetsen om tussen antwoorden te springen.
3. Luister of de vraagtekst en voortgang aankondigingen verschijnen (screen reader of browser met ontwikkelaarstools voor a11y).

Vragen of wil je dat ik automatisch lange vragen inkort (met een 'meer' link) in plaats van alleen te markeren? Reageer met ja/nee.
