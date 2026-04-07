// =========================
// GLOBAL VARIABLES
// =========================
let keyTimes = [];
let lastKeyTime = Date.now();

let mouseMoves = [];
let lastMouseTime = Date.now();

let clickCount = 0;


// =========================
// KEYBOARD TRACKING
// =========================
document.getElementById("typingArea").addEventListener("keydown", () => {
    let now = Date.now();
    keyTimes.push(now - lastKeyTime);
    lastKeyTime = now;
});


// =========================
// MOUSE MOVEMENT TRACKING
// =========================
document.addEventListener("mousemove", () => {
    let now = Date.now();
    mouseMoves.push(now - lastMouseTime);
    lastMouseTime = now;
});


// =========================
// MOUSE CLICK TRACKING
// =========================
document.addEventListener("click", () => {
    clickCount++;
});


// =========================
// FEATURE EXTRACTION
// =========================
function extractFeatures() {

    // 🔹 20 keystroke features
    let keys = keyTimes.slice(-20);
    while (keys.length < 20) {
        keys.push(0);
    }

    // 🔹 Mouse features
    let avgMouse = mouseMoves.length > 0
        ? mouseMoves.reduce((a, b) => a + b, 0) / mouseMoves.length
        : 0;

    let maxMouse = mouseMoves.length > 0
        ? Math.max(...mouseMoves)
        : 0;

    let minMouse = mouseMoves.length > 0
        ? Math.min(...mouseMoves)
        : 0;

    let totalMoves = mouseMoves.length;

    // Total 25 features
    return [
        ...keys,
        avgMouse,
        maxMouse,
        minMouse,
        totalMoves,
        clickCount
    ];
}


// =========================
// SEND DATA (PREDICTION)
// =========================
function sendData() {

    let features = extractFeatures();

    fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features: features })
    })
    .then(res => res.json())
    .then(data => {

        if (data.error) {
            alert(data.error);
            return;
        }

        document.getElementById("result").innerHTML =
            `<b>Risk Score:</b> ${data.risk_score}% <br>
            <b>Status:</b> ${data.status}`;

            // Update meter
            updateMeter(data.risk_score);
        resetData();
    })
    .catch(err => {
        console.error(err);
        alert("Error connecting to server!");
    });
}


// =========================
// SAVE DATA
// =========================
function saveData() {

    let features = extractFeatures();

    fetch('/collect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features: features })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        resetData();
    })
    .catch(err => {
        console.error(err);
        alert("Error saving data!");
    });
}


// =========================
// TRAIN MODEL
// =========================
function trainModel() {

    fetch('/train', {
        method: 'POST'
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
    })
    .catch(err => {
        console.error(err);
        alert("Training failed!");
    });
}


// =========================
// RESET FUNCTION (IMPORTANT)
// =========================
function resetData() {
    keyTimes = [];
    mouseMoves = [];
    clickCount = 0;
}

// =========================
// RISK METER FUNCTION
// =========================
function updateMeter(score) {

    let meterBar = document.getElementById("meter-bar");
    let label = document.getElementById("meter-label");

    meterBar.style.width = score + "%";

    if (score < 40) {
        label.innerText = "🟢 Genuine User";
    } else if (score < 70) {
        label.innerText = "🟡 Suspicious Activity";
    } else {
        label.innerText = "🔴 Imposter Detected";
    }
}