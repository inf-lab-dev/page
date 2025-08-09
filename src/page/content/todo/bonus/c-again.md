# Schon wieder C

::: warning
Diese Aufgabe ist relativ anspruchsvoll und sollte nur bearbeitet werden, wenn du auch mit dem Material zu C sicher genug bist, da man zur Bearbeitung dieser Aufgabe den gesamten Vorlesungsstoff zu C beherrschen muss.
:::

Nachdem wir unsere Aufgabenliste nun in Python implementiert haben, könnten wir diese auch in C implementieren. Bearbeite deshalb die gesamte Aufgabe erneut in der Datei `todo.c`. Halte dich hierbei nur grob an die Aufgabenstellung, da es z.B. in C keine Klassen gibt. Auch [Teilaufgabe 4](../task#teilaufgabe-4) kann hierbei weggelassen werden.

## Hinweise zum Lösen der Aufgabe

-   statt bei Fehlerhaften `index` Werten einen `ValueError` auszulösen, kann hier einfach eine Fehlermeldung, welche mit `INVALID:` beginnt, auf der Konsole ausgegeben werden
-   natürlich gibt es in C keine Klassen, überlege dir deshalb eine sinnvolle andere Lösung.
-   Wie können wir, ähnlich wie in Python, _unbegrenzt viele Elemente_ an einer Stelle speichern?

## Testen

### Korrektheit

Führe in deinem Terminal den folgenden Befehl aus, um die Korrektheit deiner Arbeit zu überprüfen:

```bash
check50 -l inf-lab-dev/check/todo/bonus/c-again
```

### Style

Führe den folgenden Befehl aus, um den Stil deines Codes mit `style50` zu analysieren:

```bash
style50 todo.c
```
