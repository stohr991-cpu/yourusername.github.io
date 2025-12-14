// Make sure Firebase loaded
if (typeof firebase === "undefined") {
  alert("Firebase not loaded. Check script order.");
}

const auth = firebase.auth();

// Listen for login state
auth.onAuthStateChanged(user => {
  if (user && user.emailVerified) {
    document.querySelector(".login").style.display = "none";
    document.getElementById("payment").style.display = "block";
  } else {
    document.querySelector(".login").style.display = "block";
    document.getElementById("payment").style.display = "none";
  }
});

// REGISTER
function register() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Email and password required");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCred => {
      return userCred.user.sendEmailVerification();
    })
    .then(() => {
      alert("Verification email sent. Verify and then login.");
      auth.signOut();
    })
    .catch(error => {
      alert(error.message);
    });
}

// LOGIN
function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(userCred => {
      if (!userCred.user.emailVerified) {
        alert("Please verify your email first.");
        auth.signOut();
      }
    })
    .catch(error => {
      alert(error.message);
    });
}

// LOGOUT
function logout() {
  auth.signOut();
}