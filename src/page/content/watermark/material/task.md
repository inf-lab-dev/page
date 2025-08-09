---
pdf:
    title: 'Inf-Einf-B Übung: Wasserzeichen'
---

# Wasserzeichen

> ℹ️ Diese Aufgabe basiert waage auf dem [Bottomup Practice Problem von CS50](https://cs50.harvard.edu/x/2024/practice/bottomup/).
>
> **Disclaimer:** Diese Aufgabe wurde nicht vom Lehrstuhl herausgegeben und kann Fehler enthalten. Sie dient, wie das gesamte Material von [inf-lab.dev](https://inf-lab.dev), lediglich zu Übungszwecken!

KI-generierte Bilder sind mittlerweile weit verbreitet und werden in vielen Bereichen genutzt. Allerdings ist es wichtig, die Herkunft dieser Bilder klar anzugeben, um Transparenz und Ehrlichkeit zu wahren. Gerade bei der Verwendung von KI-Tools kann es leicht zu Verwirrung über die Authentizität und Quelle eines Bildes kommen.
Um diesem Problem entgegenzuwirken, entwickeln wir ein Tool, das automatisch Wasserzeichen in KI-generierte Bilder einfügt. Auf diese Weise wird die Herkunft der Bilder immer deutlich gemacht, was die Transparenz fördert und Missverständnisse vermeidet.

<small>Sogar diese Einleitung wurde mit ChatGPT, mit dem Prompt _Einleitung für Programmieraufgabe zu Wasserzeichen auf KI-Bilder_, erstellt.</small>

## Teilaufgabe 1

Bevor wir mit Änderungen an einem bestehenden Code beginnen können, sollten wir diesen verstehen.
Betrachte deshalb den gesamten vorgegebenen Code und beantworte insbesondere die folgenden Fragen.

1. Was wird in der `bmp_image` `struct` gespeichert? Was werden wir davon in [Teilaufgabe 3](#teilaufgabe-3) benötigen?
2. Was ist der Rückgabewert der `open_image` Funktion?
3. Wofür gibt es die `close_image` Funktion?
4. Was gibt die `save_image` Funktion wann zurück?

## Teilaufgabe 2

> ℹ️ Verwende bei dieser und allen folgenden Teilaufgaben die CS50 Bibliothek **nicht mehr**. Nutze stattdessen die C Bibliotheken wie `stdbool.h` oder `stdlib.h` direkt!

In dieser Teilaufgabe wird der bereits vorhandene Code in `watermark.c` vervollständigt. An einigen Stellen hat der Programmierer Lücken gelassen. Zum Glück hat er aber _TODO_ Kommentare im Code hinterlassen, die uns sagen, was wir tun sollen.

Beginnen wir also und vervollständigen das Codegerüst! Vergiss nicht, abgeschlossene _TODO-Kommentare_ auch aus dem Code zu entfernen.

## Teilaufgabe 3

In der dritten und letzten Teilaufgabe soll schließlich das Wasserzeichen aus der Datei `overlay.bmp` **unten links** in das Eingabebild eingefügt werden.
Nutze hierzu die nun fertiggestellte Funktion `open_image` um die Datei `overlay.bmp` zu öffnen und kopiere die Pixel an die passende Stelle im Originalbild `INPUT`. Speichere das veränderte Bild dann unter dem übergebenen `OUTPUT` ab.

Das Programm soll schließlich wie im folgenden Beispiel gezeigt, verwendet werden können. Sowohl `INPUT` als auch `OUTPUT` sind BMP-Dateien (muss nicht überprüft werden!).
Es muss sichergestellt sein, dass das Wasserzeichen-Bild kleiner ist als das Eingabebild, damit es korrekt eingefügt werden kann. Das heißt, dass das Wasserzeichen-Bild weniger Pixel in der Breite und Höhe haben muss als das Eingabebild.
Achte zusätzlich darauf, dass das Programm keinen Speicherlecks (also keine Memory-Leaks) hat.

```
./watermark INPUT OUTPUT
```

```
./watermark uni.bmp uni_overlay.bmp
```

## Testen

Um das Programm auch mit Bildern aus dem Internet testen zu können, kann das mitgelieferte Skript `image.py` verwendet werden.
Verwende dazu `python3 image.py`. Du wirst nun dazu aufgefordert den Link zu einem Bild einzugeben. Nach dem drücken von <kbd>Enter</kbd> wird das Bild heruntergeladen und als _BMP_ Datei gespeichert.
Um das Skript zu verlassen, drücke einfach <kbd>Enter</kbd> ohne einen Link einzugeben.

Alternativ kannst du auch einfach die mitgelieferte `uni.bmp` Datei verwenden.

> ℹ️ Wirf gerne einen Blick in das Python Skript nachdem wir in der Vorlesung Python erreicht haben!

### Korrektheit

Verwende dazu je nach Teilaufgabe die folgenden Befehle, um dein Programm mit `check50` zu überprüfen.

-   **Teilaufgabe 1:** _kein `check50` verfügbar_
-   **Teilaufgabe 2:** `check50 -l inf-lab-dev/check/watermark/a2`
-   **Teilaufgabe 3:** `check50 -l inf-lab-dev/check/watermark/a3`

<div style="page-break-after: always"></div>

### Style

Führe den folgenden Befehl aus, um den Stil deines Codes mit `style50` zu analysieren:

```bash
style50 watermark.c
```
