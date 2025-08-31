from flask import Flask, render_template, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from threading import Lock
from database import init_db, insert_reading
from flasgger import Swagger
import sqlite3
import time
import u3

 
# ========================== Flask Initialization ==========================
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")
swagger = Swagger(app)

# ========================== Global Variables ==========================
d = None
thread = None
thread_lock = Lock()

# ========================== Initialize Database ==========================
init_db()

# ========================== LabJack Connection ==========================
def connect_labjack():
    global d
    if d is None:
        try:
            d = u3.U3()
            print("✅ LabJack U3 Connected")
        except Exception as e:
            print("❌ LabJack connection error:", e)
            d = None

@app.before_request
def connect_labjack_once():
    connect_labjack()

# ========================== Background Sensor Thread ==========================
def background_sensor_thread():
    global d
    print("background_sensor_thread() started")
    while True:
        if d is not None:
            try:
                temp_device = d.getTemperature() - 273.15
                temp_air = (d.getAIN(0) * 100) / 10
                light = (d.getAIN(1) / 5.0) * 100

                print(f"Reading: {temp_device:.2f}, {temp_air:.2f}, {light:.2f}")

                socketio.emit('sensor_update', {
                    "device_temperature": round(temp_device, 2),
                    "air_temperature": round(temp_air, 2),
                    "light": round(light, 2)
                })

                insert_reading(temp_device, temp_air, light)
                print("Inserted into DB ✅")

            except Exception as e:
                print("❌ Sensor error:", e)
                socketio.emit('sensor_error', {'error': str(e)})

        time.sleep(1)

# ========================== WebSocket Connection ==========================
# @socketio.on('connect')
# def on_connect():
#     global thread
#     print("WebSocket client connected")
#     with thread_lock:
#         if thread is None:
#             thread = socketio.start_background_task(target=background_sensor_thread)
#             print("Background sensor thread started")
#     emit('connected', {'data': 'Connected to LabJack sensor stream ✅'})
def start_background_thread():
    global thread
    with thread_lock:
        if thread is None:
            thread = socketio.start_background_task(target=background_sensor_thread)
            print("Background sensor thread started manually")

# ========================== HTTP Routes ========================== 
@app.route("/")
@app.route("/home")
@app.route("/index")
def home():
    return render_template("index.html.j2")

@app.route("/api/sensors")
def api_sensors():
    """
    Get all sensor data
    ---
    responses:
      200:
        description: Sensor readings
    """
    if d is None:
        return jsonify({"error": "LabJack not connected"}), 500
    try:
        temp_device = d.getTemperature() - 273.15
        temp_air = (d.getAIN(0) * 100) / 10
        light = (d.getAIN(1) / 5.0) * 100
        return jsonify({
            "device_temperature": round(temp_device, 2),
            "air_temperature": round(temp_air, 2),
            "light": round(light, 2)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
@app.route("/terms")
def terms():
    return render_template("/terms.html.j2")
@app.route("/privacy")
def privacy():
    return render_template("/privacy.html.j2")

@app.route("/Documentation")
def about():
    return render_template("/Documentation.html.j2")

@app.route("/api/temperature/air")
def api_air_temperature():
    """
    Get air temperature only
    ---
    responses:
      200:
        description: Air temperature in Celsius
    """
    if d is None:
        return jsonify({"error": "LabJack not connected"}), 500
    try:
        voltage = d.getAIN(0)
        temp_c = (voltage * 100) / 10
        return jsonify({"air_temperature": round(temp_c, 2)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/temperature/device")
def api_device_temperature():
    """
    Get internal device temperature
    ---
    responses:
      200:
        description: Device temperature in Celsius
    """
    if d is None:
        return jsonify({"error": "LabJack not connected"}), 500
    try:
        kelvin = d.getTemperature()
        temp_c = kelvin - 273.15
        return jsonify({"device_temperature": round(temp_c, 2)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/light")
def api_light():
    """
    Get light level percentage
    ---
    responses:
      200:
        description: Light level
    """
    if d is None:
        return jsonify({"error": "LabJack not connected"}), 500
    try:
        voltage = d.getAIN(1)
        light_percent = (voltage / 5.0) * 100
        return jsonify({"light": round(light_percent, 2)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/analyze")
def analyze():
    """
    Analyze sensor data (min, max, range)
    """
    conn = sqlite3.connect("sensors.db")
    c = conn.cursor()

    c.execute("SELECT MIN(device_temp), MAX(device_temp), MAX(device_temp)-MIN(device_temp) FROM sensor_data")
    device_stats = c.fetchone()

    c.execute("SELECT MIN(air_temp), MAX(air_temp), MAX(air_temp)-MIN(air_temp) FROM sensor_data")
    air_stats = c.fetchone()

    c.execute("SELECT MIN(light), MAX(light), MAX(light)-MIN(light) FROM sensor_data")
    light_stats = c.fetchone()

    conn.close()


    return render_template("analyze.html.j2", 
                           device=device_stats, 
                           air=air_stats, 
                           light=light_stats)

@app.route("/api/analyze")
def api_analyze_data():
    """
    Analyze stored sensor data (min, max, range)
    ---
    responses:
      200:
        description: Min, Max, and Range values for each sensor type
        content:
          application/json:
            example:
              {
                "device": [25.3, 31.7, 6.4],
                "air": [20.1, 29.5, 9.4],
                "light": [50.2, 95.3, 45.1]
              }
    """

    conn = sqlite3.connect("sensors.db")
    c = conn.cursor()

    c.execute("SELECT MIN(device_temp), MAX(device_temp), MAX(device_temp)-MIN(device_temp) FROM sensor_data")
    device_stats = c.fetchone()

    c.execute("SELECT MIN(air_temp), MAX(air_temp), MAX(air_temp)-MIN(air_temp) FROM sensor_data")
    air_stats = c.fetchone()

    c.execute("SELECT MIN(light), MAX(light), MAX(light)-MIN(light) FROM sensor_data")
    light_stats = c.fetchone()

    conn.close()

    return jsonify({
        "device": device_stats,
        "air": air_stats,
        "light": light_stats
    })

# ========================== Run App ==========================
if __name__ == '__main__':
    start_background_thread()
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)