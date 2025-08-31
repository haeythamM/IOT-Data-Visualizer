You can access:
```bash
http://127.0.0.1:5000/
http://192.168.1.3:5000
http://localhost:5000/apidocs/ → Swagger UI

http://localhost:5000/api/sensors → All sensor data (device temp, air temp, light)
http://localhost:5000/api/temperature/device	→ Reads internal device temp

http://localhost:5000/api/temperature/air	 →	 Reads air temp from AIN0
http://localhost:5000/api/light    →	 Reads light sensor from AIN1


http://localhost:5000/api/analyze →	 Analyzes the data and returns the result


```