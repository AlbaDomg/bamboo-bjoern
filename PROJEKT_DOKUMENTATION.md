# 🌿 Projektübersicht & Dokumentation: Bamboo Bjørn — Grünes KI-Hosting

Diese Dokumentation bietet eine prägnante und strukturierte Übersicht über das Projekt **Bamboo Bjørn**, die durchgeführten Optimierungen sowie die eingesetzten Technologien und deren Verwendungszweck.

---

## 1. Projektbeschreibung
**Bamboo Bjørn** ist eine moderne, interaktive Webanwendung für ökologisches Hosting und KI-gestützte Infrastrukturdienste (Mistral KI). Über ein intuitives und elegantes Konversations-Interface können Nutzer grüne KI-Server (KVM), Domain-Registrierungen, 100% CO₂-neutrale E-Mail-Postfächer und Echtzeit-Telemetriedaten verwalten.

---

## 2. Übersicht der durchgeführten Arbeiten

### A. Visuelle Identität & Avatar-System
- **Transparente Grafik-Assets**: Erstellung und Konvertierung hochauflösender PNG-Avatare (**Bjørn** in den Rollen Admin, Hacker und Pathfinder) mit transparenter Hintergrundfreistellung.
- **Dynamisches Video-Interface**: Einbindung eines hochauflösenden Loops mit Alpha-Kanal-Transparenz (`assets/PandaVideo_sin_fondo.webm`) für die Begrüßungskarten.
- **Wiederverwendbare React-Komponente `BjornAvatar`**: Entwicklung einer modularen Komponente mit dezenter Schwebefunktion (`panda-avatar`) und interaktivem Zoom-Effekt bei Hover.
- **Branding-Optimierung**: Einbindung des offiziellen Typo-Logos `assets/bambusbjørn-schriftzug.png` im Haupt-Header.
- **Minimalistisches Redesign**: Entfernung redundanter kleiner Icons in Telemetrie- und Produktlisten für ein aufgeräumtes Design.

### B. Layout, UI & Responsive Design
- **Optimierung der Kunden-Begrüßungskarte (`CustomerProductsCard`)**:
  - Erweiterung des Containers auf `max-w-5xl` für eine großzügige Dreispalten-Darstellung (*Active Domain*, *Öko-Postfächer*, *Server KVM-01*) mit mehr als 250px pro Spalte ohne Textumbruchfehler.
- **Intelligente Sequenzierung für Mobilgeräte**:
  - **Smartphone (`< lg`)**: Logischer Aufbau: `Bjørn KI-Assistent Badge` ➔ `Zentriertes Panda-Video` ➔ `Begrüßungstext` ➔ `Produktkarte`.
  - **Desktop (`>= lg`)**: Das Video wird als elegante rechte Seitenspalte platziert, während der Text und die Produkte den Hauptbereich einnehmen.
- **Footer-Feinabstimmung**: Reduzierung des unteren Abstands auf Mobilgeräten (`py-2.5`) für einen sauberen Bildschirmabschluss ohne ungestalteten Leerraum.

### C. UX & Flüssiges Scrolling
- **Beseitigung von Scroll-Bounce-Effekten**: Einsatz von `overscroll-behavior-y: contain` und `-webkit-overflow-scrolling: touch` für ein stabiles und präzises Scrollverhalten auf Smartphones und Desktop-Browsern.
- **Automatische Positionierung an der Kartenoberkante**: Integration von `scrollToBottomHtml` und `scrollIntoView(block: 'start')`, sodass beim Öffnen neuer Karten oder Optionen der Bildschirm sanft an die Oberkante der neuen Karte scrollt.

---

## 3. Eingesetzte Technologien und deren Zweck

| Technologie | Zweck / Einsatzbereich |
| :--- | :--- |
| **HTML5 (Semantisch)** | Basisstruktur der Webanwendung, native Video-Einbindung mit Alpha-Transparenz (`autoplay loop muted playsinline`). |
| **JavaScript (ES6+)** | Logik des Chat-Streams, Echtzeit-Statusverwaltung der Formulare und Interaktionssteuerung. |
| **React (JSX)** | Modulare Komponenten-Architektur (`BambooChat.jsx`, `BjornAvatar.jsx`, `CustomerProductsCard`, `KvmConfigPanel`, `DnsConfigCard`, `TelemetryCard`). |
| **Tailwind CSS** | Utility-First CSS-Framework für modernes Responsive Design, benutzerdefinierte Farbpalette (*Luxury Nature*: `#FAF8F5`, `#789340`, `#34312D`), Flexbox/Grid-Layouts und Animationen. |
| **Python (Pillow / PIL)** | Automatische Bildbearbeitung: Freistellung von Hintergründen, Skalierung und Erstellung von App-Icons/Favicons. |
| **WebM (Alpha-Kanal)** | Leichtes, hochkomprimiertes Videoformat mit transparenter Hintergrunddarstellung für Assistenten-Animationen. |
| **Web App Manifest (`manifest.json`)** | PWA-Konfiguration für die Installation der Anwendung auf Smartphones und Desktop-Geräten. |
| **Git & GitHub** | Versionskontrolle und kontinuierliche Synchronisation mit dem Remote-Repository `origin/main`. |

---

## ✅ Projektstatus
Das Projekt ist vollständig optimiert, getestet und im Remote-Repository (`main`) auf aktuellem Stand bereit zur Übergabe.
