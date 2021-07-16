![Header](twanimal-header.png "Twanimal Header")

# Twanimal frontend Server

![Vercel](https://vercelbadge.vercel.app/api/Vogeslu/webaufbau-twanimal)
![5 Kommilitonen](https://img.shields.io/badge/Kommilitonen-5-yellow)
[![Webseite](https://img.shields.io/badge/demo--website-online-blue)](https://twanimal-live.vogeslu.de)

Ein Web-Aufbau Projekt von Anna-Lisa Merkel, Salma Alkhaiyal, Sarah Schelle, Luca Voges, Molham Al-Khodari<br><br>
Link zum [Frontend Server - Repository](https://github.com/fh-erfurt/webaufbau-twanimal)<br><br>
Link zum [Backend Server - Repository](https://github.com/fh-erfurt/webaufbau-twanimal-backend)<br><br>
Link zur [Präsentation (twanimal-abschlusspraesentation.pdf)](twanimal-abschlusspraesentation.pdf)<br><br>
Zugangsdaten für Testaccount auf dem [Live-Server](https://twanimal-live.vogeslu.de): <br><br>
E-Mail Adresse: ``info@fh-erfurt.de``<br>
Passwort: ``hannelore123.``<br><br><br>

## Soziales Netzwerk für Haustiere auf Basis von Twitter

### Grundidee

Wir möchten einen Client erstellen, welches sich an das Netzwerk Twitter orientiert, wo Haustiere die Nutzer sind.

Was wir damit meinen ist, dass Haustierbesitzer im Namen ihrer Haustiere Accounts erstellen können und Beiträge teilen können. Man hat die Möglichkeit Bilder, Texte und Videos hochzuladen und andere können diese Beiträge kommentieren, liken, teilen und im schlimmsten Falle melden. Accounts können auf der Plattform anderen Accounts folgen und mit ihnen interagieren.

Eine Besonderheit an der Plattform ist, dass die am häufigsten bewerteten Haustiere auf einer Unterseite präsentiert werden, kategorisiert nach der Art des Hautieres und eventuell Rasse. Zusätzlich können Haustierbesitzer unter ihrem Profil angeben, dass die Haustiere einen Spielpartner oder Gassipartner benötigen. Somit haben andere Accounts die Möglichkeit eine Anfrage zum gemeinsamen Spielen oder Gassigehen zu erstellen.

### Aktueller Stand

Wir haben ein kleines soziales Netzwerk für Haustiere erstellt, auf dem sich Haustierbesitzer registrieren und anmelden können. Grundlegende Funktionen, wie das Teilen, Erstellen, Bewerten und Kommentieren von Beiträgen ist komplett integriert und funktioniert. Dazu kann man sein eigenes Profil frei gestalten und anpassen. Man kann anderen Profilen folgen, deren Beiträge lesen und Teilen. Auf jeder Profilseite gibt es rechts Vorschläge für andere Profile, denen man noch nicht folgt.

Die Funktion des Gassigehens und am häufigsten bewertete Haustiere wurde nicht in die finale Fassung übernommen, da diese Funktionen den Rahmen gesprengt hätten.

## Projektteam

* **Anna-Lisa Merkel** - [Profil](https://github.com/anna-lisa1404)
* **Salma Alkhaiyal** - [Profil](https://github.com/salma-alkhaiyal)
* **Sarah Schelle** - [Profil](https://github.com/sarahschelle)
* **Luca Voges** - [Profil](https://github.com/Vogeslu)
* **Molham Al-Khodari** - [Profil](https://github.com/Molham321)

## Workflow

Wie wird gearbeitet?

1. Wöchentliche Meetings
2. Vorstellung der erledigten Aufgaben
3. Verteilung von neuen Aufgaben
4. Besprechung von Ideen und Vorschlägen
5. “Team Programming”
6. Weitere Meetings in kleineren Gruppen
7. Pair Programming
8. Branch erstellen
9.  Branch pushen & Pull Request
10. Branch mergen & löschen

## Workload

| Name | Aufgabe |
| --- | --- |
| Alle | Idee und Mockup ausdenken und erstellen<br>Clean-Up, Formattierung und gleichmäßige Struktur<br>Backend mit Frontend verknüpfen (Abfragen) |
| Luca Voges | Initialisierung des Frontend-Servers<br>Router, Backend & Sessions<br>Responsive |
| Molham Al-Khodari | Funktionalität Login & Registrierung<br>Such-Seite |
| Sarah Schelle | Beiträge<br>Über Uns - Seite |
| Salma Alkhaiyal | Profilseite<br>Clean-Up<br>Post-Content vorbereitet |
| Anna-Lisa Merkel | Startseite<br>Error-Page<br>Footer |
| Molham Al-Khodari<br>Anna-Lisa Merkel | Login und Registrierung |
| Salma Alkhaiyal<br>Sarah Schelle | Impressum & Datenschutz |
| Sarah Schelle<br>Anna-Lisa Merkel | Beitrags-Seite |
| Luca Voges<br>Salma Alkhaiyal | Profilseite anpassen |

Ein Zeitaufwand kann nicht angegeben werden, da zur Bearbeitung kein Timer gestellt wurde. Durch wöchentliche Meetings mit mindestens 2h Gesprächszeit, kleineren Gruppen und Einzelaufgaben kommen wir sicherlich auf über 60h Aufwand pro Person.
	
## Tools

* Git
* GitHub
* Discord
* Visual Studio Code 
* Figma
* Postman
* fontawesome

## Bildquellen

Alle Bilder entstammen aus [unsplash.com](https://unsplash.com) und eigenen Aufnahmen

## Installation

### 1. Repository klonen

#### 1.1 Ordner auswählen und cmd öffnen
HTTPS-Variante: 

```
git clone https://github.com/fh-erfurt/webaufbau-twanimal
```

SSH-Variante: 

```
git clone git@github.com:fh-erfurt/webaufbau-twanimal.git
```

### Alternative: 1. Git initialisieren und Remote-Branch hinzufügen

#### 1.1 Projektordner erstellen und cmd öffnen

```
git init
git remote add origin https://github.com/fh-erfurt/webaufbau-twanimal
git pull origin main
```

### 2. Pakete installieren

NPM-Variante: ```npm install```

YARN-Variante: ```yarn install```

### 3. Backend verknüpfen

Öffnen Sie die ``config.js`` - Datei, um den Backend-Server einzustellen mit Hostname und Port.

Sollten Sie ein eigenes Backend benutzen abseits ```https://twanimal.vogeslu.de```, so lesen Sie sich bitte die [Dokumentation](https://github.com/fh-erfurt/webaufbau-twanimal-backend) vom Backend-Server durch.

### 4. Starten des Servers

Um den Server zu starten, geben Sie bitte folgenden Befehl ein

NPM-Variante: ```npm start```

YARN-Variante: ```yarn start```

Der Server wird erreichbar sein über den in der ```.env``` - Datei eingestellten Port.

### 5. Verpacken des Servers

Um den Server zu verpacken, geben Sie bitte folgenden Befehl ein

NPM-Variante: ```npm build```

Das fertige Projekt wird dann unter dem neu erstellten Ordner ```build/``` zu sehen sein mit einer aufrufbaren ```index.html```

## Hinweis

Komplexere Stellen im Quellcode wurden dokumentiert. Andere Stellen wurden ausgelassen, da in der Regel der Quellcode bereits genug selbst dokumentiert.