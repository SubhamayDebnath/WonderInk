const showIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>`;
const hideIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
</svg>
`;
function togglePasswordVisibility(passwordInput, inputIcon) {
    inputIcon.addEventListener("click", function () {
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
      this.innerHTML = type === "password" ? showIcon : hideIcon;
    });
  }
const passwordInput = document.querySelector("#password");
const inputIcon = document.querySelector("#inputIcon");
togglePasswordVisibility(passwordInput, inputIcon);
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
  
  function togglePasswordVisibility(passwordInput, inputIcon) {
    inputIcon.addEventListener("click", function () {
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
      this.innerHTML = type === "password" ? showIcon : hideIcon;
    });
  }
  
  
  
  