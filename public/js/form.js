function showAlert(message) {
  alert(message);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;

  return regex.test(password);
}

function validateFullname(fullname) {
  const nameRegex = /^[A-Za-z\s]+$/;
  return nameRegex.test(fullname);
}
function validateUsername(username) {
  const usernameRegex = /^(?=.*[A-Za-z])[A-Za-z0-9]+$/;
  return usernameRegex.test(username);
}
function loginValidateForm(){
  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById('loginPassword').value;
  if (!validateEmail(email)) {
    showAlert("Please enter a valid email address.");
    return false;
  }

  if (!validatePassword(password)) {
    showAlert(
      "Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    );
    return false;
  }

  return true;
}

function registerValidateForm() {
  const username = document.getElementById("username").value;
  const fullname = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (
    username.length < 3 ||
    username.length > 26 ||
    !validateUsername(username)
  ) {
    showAlert(
      "Username must be between 3 and 26 characters and can only contain letters and numbers."
    );
    return false;
  }

  if (
    fullname.length < 6 ||
    fullname.length > 26 ||
    !validateFullname(fullname)
  ) {
    showAlert(
      "Full name must be between 6 and 26 characters and contain only letters."
    );
    return false;
  }

  if (!validateEmail(email)) {
    showAlert("Please enter a valid email address.");
    return false;
  }

  if (!validatePassword(password)) {
    showAlert(
      "Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    );
    return false;
  }

  return true;
}
