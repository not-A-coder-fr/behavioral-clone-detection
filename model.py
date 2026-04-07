import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import joblib
import os

DATA_PATH = 'dataset/user_data.csv'
MODEL_PATH = 'saved_model/model.pkl'


# =========================
# CHECK DATASET
# =========================
if not os.path.exists(DATA_PATH):
    print("❌ Dataset not found! Please collect data first.")
    exit()

# Load dataset
data = pd.read_csv(DATA_PATH)

# Check if dataset is empty
if data.empty:
    print("❌ Dataset is empty! Please save behavior data first.")
    exit()

# Validate number of features
if data.shape[1] != 25:
    print(f"❌ Expected 25 features, but found {data.shape[1]}")
    exit()


# =========================
# CLEAN DATA
# =========================
# Fill missing values
data = data.fillna(0)


# =========================
# FEATURE SCALING
# =========================
scaler = StandardScaler()
data_scaled = scaler.fit_transform(data)


# =========================
# TRAIN MODEL
# =========================
model = IsolationForest(
    n_estimators=200,
    contamination=0.15,
    random_state=42
)

model.fit(data_scaled)


# =========================
# SAVE MODEL
# =========================
joblib.dump((model, scaler), MODEL_PATH)

print("✅ Model trained and saved successfully!")