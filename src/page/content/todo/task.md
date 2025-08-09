# Aufgabenliste

::: info
Diese Aufgabe basiert auf _keinem CS50 Practice Problem_.

**Disclaimer:** Diese Aufgabe wurde nicht vom Lehrstuhl herausgegeben und kann Fehler enthalten. Sie dient, wie das gesamte Material von [inf-lab.dev](https://inf-lab.dev), lediglich zu Übungszwecken!
:::

Wir alle haben verschiedene Aufgaben, jedoch ist es nicht immer einfach sich alle seine Aufgaben zu merken. Daher wollen wir in dieser Aufgabe eine ToDo-Liste entwickeln, welche es uns erlaubt unsere Aufgaben über die Konsole zu verwalten.

## Aufgabenmaterial herunterladen

Um das Aufgabenmeterial herunterzuladen, gib folgenden Befehl in _ein neues Terminal_ in deinem Codespace ein:

```bash
wget -O - https://inf-lab.dev/todo/material/scripts/setup.sh | bash
```

## Teilaufgabe 1

Wie immer, wenn wir einen vorbereiteten Code bekommen, sollten wir diesen vorerst verstehen bevor wir Änderungen vornehmen können. Lies deshalb den Code in der Datei `todo.py` und beantworte insbesondere folgende Fragen. Wenn du noch etwas unsicher mit der Python Syntax bist, kannst du die vorgegebene Datei `todo.c` zur hilfe nehmen. Diese enthält den selben Code - nur für die Programmiersprache C.

-   Welche Funktionen müssen laut `TODO`-Kommentaren von uns implementiert werden? Was sind ihre Parameter?
-   Wie genau kann der Benutzer eine Aufgabe hinzufügen, nachdem er das Programm mit `python todo.py` gestartet hat?
-   Welche Aufgabe haben die `NotImplementedError`s, die bei verschiedenen Funktionen ausgelöst werden?

## Teilaufgabe 2

Nachdem wir nun das Codegerüst verstanden haben, möchten wir in dieser Aufgabe den Grundstein für das Programm legen.

Erstelle daher in der bereitgestellten Datei `todo.py` eine Klasse `ToDo`, welche die eigentliche Aufgabe (`task`) und ob diese abgeschlossen ist (`completed`), speichert.
Diese Klasse soll mindestens folgende Methoden besitzen:

-   `__init__`: Initialisiert die Aufgabe und speichert den übergebenen `task`. Inital ist eine Aufgabe immer nicht `completed`.
-   `complete`: Markiert die Aufgabe als abgeschlossen (`completed`).
-   `update`: Ersetzt den gespeicherten `task` mit einem neuen, übergebenen `new_task`.

Füge außerdem eine globale Variable `todos` hinzu, in welche die Liste aller `ToDo`s gespeichert wird.

Implementiere schließlich die Funktion `show`, welche die Liste aller Aufgaben im untenstehenden Format ausgibt. Die Zahl in den eckigen Klammern `[]`, ist hierbei der Index (die Position) der Aufgabe innerhalb der `todos` Liste. Der Text `(completed)` soll außerdem nur angezeigt werden, wenn die Aufgabe auch wirklich abgeschlossen ist.

```
[0] Bake a cake (completed)
[1] Learn Inf-Einf
[2] Wash my clothes
```

Sollte noch keine Aufgabe existieren, soll statt der obigen Ausgabe die Nachricht `No ToDos have been created yet.` ausgegeben werden.

## Teilaufgabe 3

Da die Grundfunktionalität des Programms nun gegeben ist, ist es an der Zeit auch die verbleibenden Funktionen zu implementieren.

Beginne daher damit, die Funktion `create` zu erstellen. Diese soll eine neue Aufgabe mit dem übergebenen `task` erstellen. Wenn das `ToDo` erfolgreich erstellt wurde, soll zusätzlich `ToDo created successfully!` auf der Konsole ausgegeben werden.

Implementiere dann die Funktionen `complete` und `delete`. Die erste Funktion soll die Aufgabe am übergebenen `index` als abgeschlossen markieren und danach `Successfully completed the ToDo!` auf der Konsole ausgeben. Die zweite Funktion soll die Aufgabe am gegebenen `index` löschen und bei Erfolg `Successfully deleted the ToDo!` ausgeben.
Achte hier auch darauf, dass der übergebene `index` negativ oder größer als die `todos` Liste sein kann. Ist der übergebene `index` fehlerhaft, soll ein `ValueError` ausgelöst werden.

Schließlich muss auch noch die Funktion `update` implementiert werden. Diese soll die Aufgabe am übergebenen `index` mit dem übergebenen `new_task` ersetzen. Achte auch hier darauf, dass du den übergebenen `index` wie in der `complete` oder `delete` Funktion überprüfst. Wenn die Aufgabe erfolgreich ausgetauscht wurde, soll `Successfully updated the ToDo!` auf der Konsole ausgegeben werden.

Achte bei allen Aufgaben darauf, dass du deine bereits erstellte Klasse `ToDo` bestmöglichst nutzt!

## Teilaufgabe 4

Nun ist das Programm eigentlich fertig. Jedoch sollten wir es auch noch testen. Um Tests einfach wiederholen zu können, empfiehlt es sich Code zum testen zu verwenden.

Öffne deshalb die Datei `test_todo.py`, in welcher du die `ToDo` Klasse testest, in dieser Datei haben wir bereits einige Funktionen vorbereitet.
Du solltest _alle Methoden der ToDo Klasse_ testen. Wie du sinnvolle Tests schreibst, liegt an dir!

Um deine Tests schließlich auszuführen, kannst du folgenden Befehl verwenden.

```bash
pytest test_todo.py
```

## Testen

Teste zuerst manuell, ob sich das Programm wie erwartet verhält.

### Korrektheit

Verwende dazu je nach Teilaufgabe die folgenden Befehle, um dein Programm mit `check50` zu überprüfen.

-   **Teilaufgabe 1:** _kein `check50` verfügbar_
-   **Teilaufgabe 2:** `check50 -l inf-lab-dev/check/todo/a2`
-   **Teilaufgabe 3:** `check50 -l inf-lab-dev/check/todo/a3`
-   **Teilaufgabe 4:** `check50 -l inf-lab-dev/check/todo/a4`

### Style

Führe den folgenden Befehl aus, um den Stil deines Codes mit `style50` zu analysieren:

```bash
style50 todo.py
```
