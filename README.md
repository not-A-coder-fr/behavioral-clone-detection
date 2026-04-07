# 🚀 AI-Based Behavioral Clone Detection System

A web-based cybersecurity system that detects **digital impersonation** using **behavioral biometrics** such as typing patterns and mouse movements.

---

## 📌 Overview

Traditional authentication methods like passwords and OTPs can be stolen or spoofed.  
This project introduces a smarter approach:

👉 *“Authenticate users based on how they behave, not just what they know.”*

The system continuously analyzes:
- ⌨️ Keystroke dynamics (typing rhythm)
- 🖱️ Mouse movement patterns
- 🖱️ Click behavior

and uses Machine Learning to detect anomalies in real-time.

---

## 🧠 Features

- ✅ Keystroke dynamics tracking (20 features)
- ✅ Mouse movement analysis (speed, variation)
- ✅ Click frequency detection
- ✅ Machine Learning (Isolation Forest)
- ✅ Feature scaling for improved accuracy
- ✅ Real-time risk scoring (0–100)
- ✅ Web-based interactive interface

---

## 🏗️ Project Structure
```
behavioral-clone-detection/
├── app.py                 # Flask backend server
├── model.py               # ML training script
├── requirements.txt       # Python dependencies
├── README.md              # Project documentation
├── dataset/
│   └── user_data.csv      # Training data
├── saved_model/
│   └── model.pkl          # Pre-trained model file
├── templates/
│   └── index.html         # Frontend UI template
└── static/
    ├── script.js          # Behavior tracking logic
    └── style.css          # UI styling
```
---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

git clone https://github.com/yourusername/behavioral-clone-detection.git

cd behavioral-clone-detection

---

### 2️⃣ Install Dependencies

pip install -r requirements.txt

---

### 3️⃣ Run the Application


python app.py


Open browser:


http://127.0.0.1:5000

---

## 🧪 How It Works

1. User types in the text area  
2. System captures behavioral data  
3. Features are extracted (keyboard + mouse)  
4. ML model compares with trained profile  
5. Risk score is generated  

---

## 📊 Risk Score Interpretation

- 🟢 **0 – 40** → Genuine User  
- 🟡 **40 – 70** → Suspicious  
- 🔴 **70 – 100** → Imposter  

---

## 🧠 Machine Learning Model

- Algorithm: **Isolation Forest**
- Type: **Anomaly Detection**
- Training: Learns *normal user behavior*
- Input: 25 features (keyboard + mouse)

---

## 📁 Dataset Format

`user_data.csv` must contain **25 columns**:

- 20 → Keystroke timing features  
- 5 → Mouse features  

Example:
t1,t2,...,t20,m1,m2,m3,m4,m5
120,95,...,108,50,200,10,3,5

---

## 🚀 Demo Flow

1. Type normally → Click **Train Model**
2. Type again → Click **Check Behavior**
3. Another user tries → System detects anomaly

---

## 🔐 Applications

- Banking systems  
- Secure login systems  
- Enterprise security  
- Continuous authentication  
- Fraud detection  

---

## ⚠️ Ethical Considerations

- This system should be used **with user consent**
- Behavioral data must be handled securely
- Intended for **educational and research purposes**

---

## 👨‍💻 Authors

- Sudharsan Nayik. V 
- Santhosh. S
- Sreedher. M. J

---

## 🌟 Future Improvements

- Deep Learning (LSTM / Transformers)
- Real-time monitoring dashboard
- Multi-user authentication system
- Deployment to cloud (Render / AWS)

