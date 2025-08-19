# MINI PROJECTS – HTML/CSS/JS

Ein Sammel-Repository für tägliche Mini‑Projekte mit Fokus auf Web‑Basics (HTML, CSS, JS/TS) und modernem Tooling (Vite, Tailwind). Ziel: Jeden Tag ein kleines, in sich abgeschlossenes Projekt bauen, um kontinuierlich Praxis zu sammeln.

## Überblick
- __Ziel__: Tägliche, kleine Lern‑ und Übungsprojekte – schnell aufsetzen, bauen, veröffentlichen.
- __Technologie__: Vite + TypeScript, Tailwind CSS v4, modulare Struktur pro Projekt.
- __Struktur__:
  - `projects/` – einzelne Mini‑Projekte (z. B. `weather_app/`).
  - `boilerplate/` – Starter‑Template (Vite + TS + Tailwind) für neue Projekte.
  - `assets/` – gemeinsame Assets (Icons, Bilder etc.), falls benötigt.
  - (Optional) __Boards__ – Kanban/Projektboards (z. B. GitHub Projects/Trello) zur Planung und Priorisierung.

## Daily Mini‑Project Ansatz
- __Ein Projekt pro Tag__: Klein halten, klaren Scope definieren, am Ende etwas Nutzbares haben.
- __Wiederverwendbarkeit__: Für neue Ideen die `boilerplate/` kopieren und direkt loslegen.
- __Lernen dokumentieren__: Kurz im Projektordner festhalten, was gelernt/gelöst wurde.

---

# Mini‑Projekt: Weather App (`projects/weather_app/`)

Eine einfache Wetter‑App, die aktuelle Wetterdaten über die OpenWeatherMap API lädt.

## Features
- __Suche__ nach Stadt/Ort
- __Aktuelles Wetter__: Temperatur, Zustand, Icon
- __Schneller Start__ dank Vite + TS

## Tech‑Stack
- Vite (Dev Server & Build)
- TypeScript
- Tailwind CSS v4

## Setup & Start
Voraussetzungen: Node.js (aktuelle LTS).

```bash
# Abhängigkeiten installieren
cd projects/weather_app
npm install

# .env anhand .env_example anlegen und API Key eintragen
# (siehe Abschnitt Environment Variablen)

# Development Server starten
npm run dev
```

Öffne den angezeigten Localhost‑Link (Vite) im Browser.

## Environment Variablen
- In `projects/weather_app/.env_example` ist die Variable vorbereitet:
  - `VITE_OPENWEATHERMAP_API_KEY=`
- Lege eine `.env` im selben Ordner an und trage deinen API‑Key ein:

```env
VITE_OPENWEATHERMAP_API_KEY=DEIN_KEY_HIER
```

- Kurzanleitung (vereinheitlichte Handhabung):
  1. Kopiere `.env_example` → `.env`.
  2. Trage echte Werte in `.env` ein (niemals committen).
  3. Behalte `.env_example` im Repo als Vorlage.
  4. `.gitignore` ignoriert alle `.env*`, aber erlaubt `.env_example`.

Wichtig: `.env` niemals committen. Stelle sicher, dass `.env` in `.gitignore` berücksichtigt ist. Für öffentliche Repos empfiehlt sich ein Demo‑Key oder das Auslassen sensibler Daten.

---

## Boilerplate – wofür?
Die `boilerplate/` dient als schnelles Start‑Template für neue Mini‑Projekte:
- Vite + TypeScript vorkonfiguriert
- Tailwind CSS v4 bereits eingebunden
- Standard‑Skripte in `package.json`: `dev`, `build`, `preview`
- Enthält ebenfalls eine `.env_example` als Vorlage für neue Projekte.

Vorgehen: Ordner kopieren, Projekt umbenennen, loslegen.

## Boards – wofür?
Boards (z. B. GitHub Projects, Trello, Jira) helfen beim __Planen__, __Priorisieren__ und __Tracken__:
- Ideensammlung & Backlog
- Tägliche Auswahl (What’s next?)
- Kurze Retros (Was lief gut? Was verbessern?)

---

## Lizenz
Persönliches Lernprojekt. Nutzung auf eigene Verantwortung. API‑Keys sicher verwalten.
