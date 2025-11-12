// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Listen for form submission
document.getElementById("reportForm").addEventListener("submit", submitReport);

function submitReport(event) {
  event.preventDefault();

  const incidentType = document.getElementById("incidentType").value;
  const description = document.getElementById("description").value;
  const name = document.getElementById("reporterName").value;
  const lat = document.getElementById("lat").value;
  const lng = document.getElementById("lng").value;

  // Simple AI categorization logic
  let category = "Other";
  const lowerDesc = description.toLowerCase();

  if (lowerDesc.includes("theft") || lowerDesc.includes("stolen")) {
    category = "Theft";
  } else if (lowerDesc.includes("assault") || lowerDesc.includes("fight")) {
    category = "Assault";
  } else if (lowerDesc.includes("robbery") || lowerDesc.includes("mug")) {
    category = "Robbery";
  } else if (lowerDesc.includes("harassment") || lowerDesc.includes("abuse")) {
    category = "Harassment";
  } else if (lowerDesc.includes("fraud") || lowerDesc.includes("scam")) {
    category = "Fraud";
  }

  // Save to Firebase
  push(ref(database, "reports"), {
    incidentType,
    description,
    name,
    category,
    lat,
    lng,
    timestamp: new Date().toISOString()
  })
  .then(() => {
    alert(`✅ Report submitted successfully! Category: ${category}`);
    document.getElementById("reportForm").reset();
  })
  .catch((error) => {
    alert("❌ Error submitting report: " + error);
  });
}

