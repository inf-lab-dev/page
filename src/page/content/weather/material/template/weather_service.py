# DISCLAIMER: This code is provided as a reference and does not need to be fully understood to complete the exercise. Flask will be covered in detail later this semester, so focus on the overall structure rather than the specifics. This code may not be perfect with regard to the upcoming lecture about Flask.

from flask import Flask


# Initialize the Flask application
app = Flask(__name__)


# Hardcoded weather data for specific cities
CITIES_WEATHER = {
    'Bamberg': '🌧   🌡️7°C 🌬️→23km/h',
    'Paris': '☀️   🌡️15°C 🌬️↑10km/h',
    'New York': '⛅   🌡️12°C 🌬️←18km/h',
    'Tokyo': '🌩️   🌡️20°C 🌬️↗25km/h',
    'Sydney': '🌤️   🌡️25°C 🌬️↓5km/h',
    'Cape Town': '☁️   🌡️18°C 🌬️↘12km/h',
    'Rio De Janeiro': '🌧   🌡️27°C 🌬️↙8km/h',
    'Mumbai': '☀️   🌡️32°C 🌬️→15km/h',
    'Dubai': '☀️   🌡️40°C 🌬️↑20km/h',
    'Toronto': '❄️   🌡️-5°C 🌬️←10km/h',
    'Shanghai': '🌤️   🌡️18°C 🌬️↖14km/h',
    'Mexico City': '🌦️   🌡️22°C 🌬️↘8km/h',
    'Bangkok': '☀️   🌡️33°C 🌬️↑5km/h',
    'Moscow': '❄️   🌡️-10°C 🌬️↙15km/h',
    'Istanbul': '⛅   🌡️10°C 🌬️→18km/h',
}


def normalize_city_name(city):
    # Normalize the city name to ensure it matches the format in CITIES_WEATHER.
    return ' '.join([word.capitalize() for word in city.split()])


@app.route('/', defaults={'city': 'Bamberg'})
@app.route('/<city>')
def weather_info(city):
    # Normalize the city name to match the keys in CITIES_WEATHER
    city = normalize_city_name(city)
    # Retrieve the weather for the city or return a default message if not found
    weather = CITIES_WEATHER.get(city, 'Unknown city: Weather data not available')
    return f'{city}: {weather}'


if __name__ == '__main__':
    # Run the Flask application in debug mode
    app.run(debug=True)
