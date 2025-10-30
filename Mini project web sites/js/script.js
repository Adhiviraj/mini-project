// Import Firebase SDK (modular version)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC62S6VNJDrCzO-XgOeHRkXUuRqKzwUmxM",
  authDomain: "smart-library-system-f5146.firebaseapp.com",
  projectId: "smart-library-system-f5146",
  storageBucket: "smart-library-system-f5146.firebasestorage.app",
  messagingSenderId: "116146169447",
  appId: "1:116146169447:web:6fe8b2f6c5a303d66fd6c2",
  measurementId: "G-YFD72X8LNB"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Function to test data entry
function writeTestData() {
  const dbRef = ref(db, 'library_logs/test');
  set(dbRef, {
    book: "AI Fundamentals",
    issued_to: "Test Student",
    time: new Date().toLocaleString()
  })
  .then(() => {
    alert("✅ Test data added successfully!");
  })
  .catch((error) => {
    alert("❌ Error: " + error);
  });
}

// Make function available in HTML
window.writeTestData = writeTestData;
// Monitor login state
auth.onAuthStateChanged((user) => {
    if (user) {
        loginSection.classList.add('d-none');
        dashboardSection.classList.remove('d-none');

        // Start fetching data
        loadLibraryData();
    } else {
        dashboardSection.classList.add('d-none');
        loginSection.classList.remove('d-none');
    }
});

// Fetch and display data
function loadLibraryData() {
    const logsTable = document.getElementById('logs-table-body');
    logsTable.innerHTML = '';

    database.ref('library_logs').on('value', (snapshot) => {
        logsTable.innerHTML = ''; // clear old rows
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();

            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${data.applicationNumber || '—'}</td>
              <td>${data.studentName}</td>
              <td>${data.rfidTag}</td>
              <td>${formatDate(data.entryTime)} ${formatTime(data.entryTime)}</td>
              <td>${formatDate(data.exitTime)} ${formatTime(data.exitTime)}</td>
              <td>${data.status}</td>
`;

            logsTable.appendChild(row);
        });
    });
}
