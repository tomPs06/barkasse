# DIAlog Bar

Kasse, Lager und Auswertung für die Bar beim Wismarer DIAlog.
Läuft als Web-App auf GitHub Pages, Daten liegen in Firebase (Firestore) und
synchronisieren zwischen Handy und Mac. Funktioniert auch offline: Buchungen
werden auf dem Gerät gespeichert und später übertragen.

## Dateien
- `index.html` – die ganze App
- `config.js` – Firebase-Zugangsdaten (nicht geheim)
- `firestore.rules` – wer lesen und schreiben darf (E-Mail-Liste)
- `sw.js`, `manifest.webmanifest`, `icons/` – App-Symbol und Offline-Modus

## Neue Helfer freischalten
1. Firebase-Konsole → Authentication → Nutzer hinzufügen (E-Mail + Passwort).
2. E-Mail in `firestore.rules` ergänzen und die Regeln in der Konsole unter
   Firestore → Regeln einfügen und veröffentlichen.
