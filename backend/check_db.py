import sqlite3

conn = sqlite3.connect("sensors.db")
c = conn.cursor()

c.execute("SELECT COUNT(*) FROM sensor_data")
count = c.fetchone()[0]
print(f" Total records: {count}")

if count > 0:
    c.execute("SELECT * FROM sensor_data ORDER BY id DESC LIMIT 5")
    for row in c.fetchall():
        print(row)
else:
    print("⚠️ No data found.")

conn.close()
