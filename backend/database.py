import sqlite3
from datetime import datetime

# Initialize or create the database and table
def init_db():
    conn = sqlite3.connect("sensors.db")
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS sensor_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            device_temp REAL,
            air_temp REAL,
            light REAL
        )
    ''')
    conn.commit()
    conn.close()

# Insert a new sensor reading
def insert_reading(device_temp, air_temp, light):
    conn = sqlite3.connect("sensors.db")
    c = conn.cursor()
    c.execute('''
        INSERT INTO sensor_data (timestamp, device_temp, air_temp, light)
        VALUES (?, ?, ?, ?)
    ''', (datetime.now().isoformat(), device_temp, air_temp, light))
    conn.commit()
    conn.close()
    print("insert_reading() called")
