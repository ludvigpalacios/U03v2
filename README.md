# Quiz App - U03
Wireframe: https://ethics-muse-27596105.figma.site

## Team
- Ludvig Palacios: Inloggning, Quiz
- Abiha Khan: Leaderboard
- Haniah: Friends
- Soha Oraibi: Quiz

## Om appen
Appen är en quizapplikation där användaren kan skapa ett konto, logga in och spela quiz. Användaren väljer mellan att spela, se en leaderboard eller gå till friends-sidan.

När användaren skapar ett konto sparas informationen lokalt i webbläsaren med localStorage. Appen kollar bland annat så att användarnamn och e-post inte redan finns, samt att lösenordet uppfyller kraven. Vid inloggning jämförs uppgifterna med de sparade kontona och användaren får feedback om inloggningen lyckas eller inte.

Quizet hämtar frågor och svarsalternativ från en JSON-fil. Användaren väljer ett svar och får direkt feedback om svaret var rätt eller fel. Det finns även en timer som räknar ner under quizet. När tiden är slut eller användaren har svarat låses knapparna så att man inte kan svara igen.

Leaderboard och friends-sidan visas som separata sidor med hjälp av iframes. Header-menyn gör att rätt sida visas och att de andra sidorna göms. Leaderboarden uppdateras och sparar resultat, medan friends-sidan låter användaren se och hantera vänner.

## Skisser
Här kan ni lägga in bilder på skisserna eller länka till dem.

## Publicerad app
[https://ethics-muse-27596105.figma.site](https://ludvigpalacios.github.io/U03v2/)

## Reflektion

### Styrkor
- Appen har flera funktioner som fungerar ihop: inloggning, skapande av konto, quiz, timer, leaderboard och friends-sida.
- Vi har använt localStorage för att spara konton och resultat, vilket gör att informationen finns kvar även efter att sidan laddas om.
- Quizet ger tydlig feedback till användaren, både vid rätt och fel svar.
- Projektet är uppdelat i flera JavaScript-filer, vilket gör koden lättare att förstå och underhålla.
- Vi har löst flera buggar under projektets gång, till exempel problem med timers, knappar, inloggning och sidnavigering.

### Brister
- Vi hann inte använda moderna standarder som ES2024+ fullt ut.
- Vi hann inte implementera `export` och `import`, vilket senare visade sig vara nödvändigt för att kunna använda vissa funktioner utanför iframe-sidorna.
- Vissa delar av koden kunde ha varit mer strukturerade och återanvända på ett bättre sätt.
- Vi fick lösa en del merge-konflikter när flera personer arbetade i olika branches, vilket tog extra tid.
- Om vi hade haft mer tid hade vi kunnat förbättra mobilanpassningen och göra fler funktioner färdiga, till exempel poängsparning för inloggade användare.

