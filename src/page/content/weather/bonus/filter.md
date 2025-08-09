# Weitere Filter

Wir können nun bereits nach der Temperatur filtern. Im folgenden sollen weitere Filter entwickelt werden, um nach anderen Parametern filtern zu können.

## WindRangeFilter – Filtern nach Windgeschwindigkeit

Die zweite Subklasse, die du implementieren sollst, ist die `WindRangeFilter`. Diese Klasse erlaubt es, Städte anhand ihrer Windgeschwindigkeit zu filtern.

-   **Initialisierung:** Beim Erstellen der `WindRangeFilter`-Klasse werden zwei Parameter, `min_wind` und `max_wind`, übergeben. Diese definieren den Bereich der Windgeschwindigkeit, innerhalb dessen eine Stadt überprüft werden soll.
-   **Methode `evaluate`:** Die Methode nimmt ein `CityWeather`-Objekt entgegen und prüft, ob die Windgeschwindigkeit der Stadt innerhalb des angegebenen Bereichs liegt.
    -   Liegt die Windgeschwindigkeit im Bereich, gibt die Methode `True` zurück.
    -   Andernfalls gibt sie `False` zurück.

## ConditionFilter – Filtern nach Wetter-Symbol

Die dritte Subklasse ist die `ConditionFilter`, mit der Städte nach bestimmten Wetter-Symbolen gefiltert werden können.

-   **Initialisierung:** Beim Erstellen der `ConditionFilter`-Klasse wird ein Parameter `condition` übergeben, der das gesuchte Wetter-Symbol angibt (z. B. "🌫").
-   **Methode `evaluate`:** Diese Methode prüft, ob das Wetter-Symbol des übergebenen `CityWeather`-Objekts mit dem gewünschten Symbol übereinstimmt.
    -   Stimmen die Symbole überein, gibt die Methode `True` zurück.
    -   Andernfalls gibt sie `False` zurück.

## Filter testen

::: info
In dieser Aufgabe musst du deine Implementierung aus [Teilaufgabe 6](../task.md/#teilaufgabe-6) anpassen.
:::

In dieser Teilaufgabe integrierst du die neuen Filter und wendest die sie auf die Liste `cities_weather` an. Ziel ist es, die Liste so zu filtern, dass nur die Städte übrig bleiben, die den angegebenen Kriterien entsprechen. Diese Städte werden anschließend auf der Konsole ausgegeben. Die gesamte Logik wird in die `main`-Funktion eingebettet.

Zunächst legst du die Filter an, indem du eine Instanzen der Klassen `WindRangeFilter` und `ConditionFilter` mit beliebigen Kriterien erstellst. Zum Beispiel könnten die Kriterien so aussehen: Eine _Windgeschwindigkeit zwischen 0 km/h und 15 km/h_ sowie ein _bestimmtes Wetter-Symbol, beispielsweise "☀️"_ für sonniges Wetter.

Anschließend iterierst du über die Liste `cities_weather`, die die Wetterdaten der Städte enthält. Für jede Stadt überprüfst du, ob alle definierten Filterkriterien erfüllt sind. Wenn eine Stadt alle Filter erfüllt, wird sie der gefilterten Liste hinzugefügt.

Abschließend gibst du die Namen der Städte, die die Kriterien erfüllen, auf der Konsole aus.

::: warning
Für diese Aufgabe sind aktuell noch keine _check50_-Tests verfügbar.
Wir bemühen uns diese baldmöglichst zur Verfügung zu stellen.
:::
