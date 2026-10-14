const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const cardInput = document.getElementById("card");
const form = document.getElementById("booking-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
});

nameInput.addEventListener("blur", () => {
  updateValidationStyle(nameInput, validateName(nameInput.value));
});

const regex = /^[A-Z][a-z]+(-[A-Z][a-z]+)*( [A-Z][a-z]+(-[A-Z][a-z]+)*)+$/;

const validateName = (name) => {
  return regex.test(name);
};

const updateValidationStyle = (inputElement, isValid) => {
  if (isValid) {
    inputElement.classList.remove("fail");
    inputElement.classList.add("pass");
  } else {
    inputElement.classList.remove("pass");
    inputElement.classList.add("fail");
  }
};
