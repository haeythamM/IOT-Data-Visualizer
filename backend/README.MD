# Flask Live Sensor API

This project is a simple Flask backend that reads live data from a sensor (e.g., LabJack) and exposes it through a REST API.

## Project Structure




---

## Setup Instructions

### 1. Create a Virtual Environment (optional but recommended)

```bash
python -m venv venv

venv\Scripts\activate

source venv/bin/activate
call .\venv\Scripts\deactivate.bat

pip install flask

pip install -r requirements.txt

```
### 2. Create app.py

```bash
 from flask import Flask, jsonify
from sensor_reader import read_temperature

app = Flask(__name__)

@app.route('/api/live-data', methods=['GET'])
def get_live_data():
    return jsonify({'temperature': read_temperature()})

if __name__ == '__main__':
    app.run(debug=True)
```
### 3. Create sensor_reader.py

```python
import random  # Replace with actual LabJack code

def read_temperature():
    return round(random.uniform(20, 30), 2)
```
### 4. Run the Flask App

```bash
python app.py
```
### 5. Access the API
Open your web browser and go to `By default, it will run on:`
```bash
http://localhost:5000`
```
/api/live-data` to see the live data from the sensor.

## 7. Access the API Endpoint
``` bash
 GET http://localhost:5000/api/live-data
 ```

**Response:
```json
{
  "temperature": 26.47
}
```
**
## Auto-Reload (Optional)
If you want to enable auto-reload for development, you can run the Flask app with the `--reload` option:

```bash
set FLASK_APP=app.py
set FLASK_ENV=development
flask run
```
## Testing
```text
You can test the endpoint using:

Postman

Curl

Browser (GET requests)

React frontend with fetch()

Requirements Example

flask>=2.3.0
```
pip freeze > requirements.txt

