from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np
import os
import csv

app = Flask(__name__)

MODEL_PATH = 'saved_model/model.pkl'

# Load model and scaler
model = None
scaler = None

if os.path.exists(MODEL_PATH):
    model, scaler = joblib.load(MODEL_PATH)


# =========================
# HOME PAGE
# =========================
@app.route('/')
def home():
    return render_template('index.html')


# =========================
# PREDICT ROUTE
# =========================
@app.route('/predict', methods=['POST'])
def predict():
    global model, scaler

    if model is None or scaler is None:
        return jsonify({"error": "Model not trained yet! Click Train Model first."})

    data = request.json['features']

    # Ensure 25 features
    if len(data) < 25:
        data += [0] * (25 - len(data))
    else:
        data = data[:25]

    # Scale data
    data = scaler.transform([data])

    # Predict
    prediction = model.decision_function(data)[0]

    # Convert to risk score
    risk_score = int((1 - prediction) * 100)

    # Status
    if risk_score < 40:
        status = "Genuine ✅"
    elif risk_score < 70:
        status = "Suspicious ⚠️"
    else:
        status = "Imposter ❌"

    return jsonify({
        "risk_score": risk_score,
        "status": status
    })


# =========================
# TRAIN MODEL
# =========================
@app.route('/train', methods=['POST'])
def train():
    os.system("python model.py")

    global model, scaler
    if os.path.exists(MODEL_PATH):
        model, scaler = joblib.load(MODEL_PATH)

    return jsonify({"message": "Model trained successfully!"})


# =========================
# COLLECT DATA
# =========================
@app.route('/collect', methods=['POST'])
def collect():
    data = request.json['features']

    file_path = 'dataset/user_data.csv'

    # Add header if file empty
    if not os.path.exists(file_path) or os.stat(file_path).st_size == 0:
        header = [f"t{i}" for i in range(1, 21)] + [f"m{i}" for i in range(1, 6)]
        with open(file_path, 'w', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(header)

    # Append data
    with open(file_path, 'a', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(data)

    return jsonify({"message": "Data saved successfully!"})


# =========================
# RUN APP
# =========================
if __name__ == "__main__":
    app.run(debug=True)