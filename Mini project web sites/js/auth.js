// === DOM Elements ===
const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const googleLoginBtn = document.getElementById('google-login-btn');
const logoutBtn = document.getElementById('logout-btn');

// === Email/Password Login ===
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Show error if empty
    if (!email || !password) {
        loginError.textContent = "Please enter both email and password.";
        loginError.classList.remove('d-none');
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            loginError.classList.add('d-none');
            loginSection.classList.add('d-none');
            dashboardSection.classList.remove('d-none');
        })
        .catch((error) => {
            console.error("Login error:", error);
            loginError.textContent = "Invalid email or password. Please try again.";
            loginError.classList.remove('d-none');
        });
});

// === Google Login (with fallback) ===
googleLoginBtn.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    provider.setCustomParameters({
        client_id: "116146169447-oo60pbpl3gdec7qbh7pkcjns25l08ntb.apps.googleusercontent.com"
    });

    auth.signInWithPopup(provider)
        .then((result) => {
            console.log("Google login success:", result.user.email);
            loginSection.classList.add('d-none');
            dashboardSection.classList.remove('d-none');
        })
        .catch((error) => {
            console.warn("Popup sign-in failed, trying redirect...", error.code);
            if (error.code === "auth/popup-blocked" || error.code === "auth/popup-closed-by-user") {
                auth.signInWithRedirect(provider);
            } else {
                loginError.textContent = "Google sign-in failed: " + (error.message || "Please try again.");
                loginError.classList.remove('d-none');
            }
        });
});


// === Logout ===
logoutBtn.addEventListener('click', () => {
    auth.signOut()
        .then(() => {
            dashboardSection.classList.add('d-none');
            loginSection.classList.remove('d-none');
        })
        .catch((error) => console.error("Logout error:", error));
});
