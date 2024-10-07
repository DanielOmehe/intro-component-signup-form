const form = document.querySelector(".intro-component-signup-form");
const firstName = document.getElementById("intro-first-name");
const lastName = document.getElementById("intro-last-name");
const email = document.getElementById("intro-email");
const password = document.getElementById("intro-password");
const inputFields = document.querySelectorAll(".form-input");

const validateEmail = (email) => {
  const emailRegex = /^([a-z\d\,-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  return passwordRegex.test(password);
};

const validateInputs = (field) => {
  const errorElementParent = field.parentElement;
  const errorElement = errorElementParent.querySelector(".error-message");
  const errorIconParent = errorElementParent.parentElement;
  const errorIcon = errorIconParent.querySelector(".icon-error");
  let inputIsValid = true;

  if (field.value.trim() === "") {
    inputIsValid = false;
    errorElement.classList.add("error");
    errorElement.innerText = `${field.placeholder} cannot be empty`;
    errorIcon.classList.add("error");
    field.classList.add("error");

    if (field.name === "email") {
      errorElement.innerText = "Email cannot be empty";
    }
  } else {
    if (field.name === "email" && !validateEmail(field.value)) {
      inputIsValid = false;
      errorElement.classList.add("error");
      errorElement.innerText = `Looks like this is not an email`;
      errorIcon.classList.add("error");
      field.classList.add("error");
    } else if (field.name === "password" && !validatePassword(field.value)) {
      inputIsValid = false;
      errorElement.classList.add("error");
      errorElement.innerText =
        "Password must be at least 8 characters, contain an uppercase letter, a number, and a special symbol";
      errorIcon.classList.add("error");
      field.classList.add("error");
    } else {
      errorElement.classList.remove("error");
      errorIcon.classList.remove("error");
      field.classList.remove("error");
      errorElement.innerText = "";
    }
  }

  return inputIsValid;
};

inputFields.forEach((field) => {
  field.addEventListener("keyup", () => {
    validateInputs(field);
  });
});

form.addEventListener("submit", (e) => {

  inputFields.forEach((field) => {
    if (field.classList.contains("error") || field.value === '') {
      e.preventDefault();
    } else {
      Swal.fire({
        title: "Thank you!",
        text: "Form submitted successfully!",
        icon: "success",
      });
      form.reset();
    }
  });
});