// Import Firebase SDK (modular version)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getDatabase,
  ref,
  onValue,
  set
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// 🔹 Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC62S6VNJDrCzO-XgOeHRkXUuRqKzwUmxM",
  authDomain: "smart-library-system-f5146.firebaseapp.com",
  projectId: "smart-library-system-f5146",
  storageBucket: "smart-library-system-f5146.firebasestorage.app",
  messagingSenderId: "116146169447",
  appId: "1:116146169447:web:6fe8b2f6c5a303d66fd6c2",
  measurementId: "G-YFD72X8LNB"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// 🔹 Enable persistent login (stay logged in after refresh)
setPersistence(auth, browserLocalPersistence)
  .then(() => console.log("Persistence: LOCAL"))
  .catch((error) => console.error("Persistence error:", error));

// 🔹 DOM Elements
const loginSection = document.getElementById("login-section");
const dashboardSection = document.getElementById("dashboard-section");
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");
const googleLoginBtn = document.getElementById("google-login-btn");
const logoutBtn = document.getElementById("logout-btn");

// 🔹 Email/Password Login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      loginError.classList.add("d-none");
    })
    .catch(() => {
      loginError.classList.remove("d-none");
    });
});

// 🔹 Google Login
googleLoginBtn.addEventListener("click", () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(() => {
      loginError.classList.add("d-none");
    })
    .catch((error) => {
      console.error("Google Sign-in failed:", error.message);
      loginError.classList.remove("d-none");
    });
});

// 🔹 Monitor login state
onAuthStateChanged(auth, (user) => {
  if (user) {
    loginSection.classList.add("d-none");
    dashboardSection.classList.remove("d-none");
    loadLibraryData();
  } else {
    dashboardSection.classList.add("d-none");
    loginSection.classList.remove("d-none");
  }
});

// 🔹 Logout
logoutBtn.addEventListener("click", () => {
  signOut(auth);
});

// 🔹 Function to load data from Realtime Database
function loadLibraryData() {
  const logsTable = document.getElementById("logs-table-body");
  logsTable.innerHTML = "";

  const logsRef = ref(db, "library_logs");

  onValue(logsRef, (snapshot) => {
    logsTable.innerHTML = ""; // Clear previous rows

    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${data.applicationNumber || "—"}</td>
        <td>${data.studentName || "—"}</td>
        <td>${data.rfidTag || "—"}</td>
        <td>${formatDateTime(data.entryTime)}</td>
        <td>${formatDateTime(data.exitTime)}</td>
        <td>${data.status || "—"}</td>
      `;
      logsTable.appendChild(row);
    });
  });
}

// 🔹 Helper function for formatting timestamps
function formatDateTime(timestamp) {
  if (!timestamp) return "—";
  const date = new Date(timestamp);
  return date.toLocaleString();
}

// 🔹 Test data function (optional)
window.writeTestData = function () {
  const dbRef = ref(db, "library_logs/test");
  set(dbRef, {
    applicationNumber: "APP001",
    studentName: "Test Student",
    rfidTag: "123ABC",
    entryTime: Date.now(),
    exitTime: Date.now() + 3600000,
    status: "Inside"
  })
    .then(() => alert("✅ Test data added successfully!"))
    .catch((error) => alert("❌ Error: " + error));
};
