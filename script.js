const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const cardInput = document.getElementById("card");
const form = document.getElementById("booking-form");
const error = document.getElementById("error-container");

form.addEventListener("submit", function (e) {
  e.preventDefault();
});

nameInput.addEventListener("blur", () => {
  const isValid = validateName(nameInput.value);
  updateValidationStyle(nameInput, isValid);
  handleErrorMessage(nameInput, isValid);
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

const handleErrorMessage = (inputElement, isValid) => {
  const errorId = `${inputElement.id}-error`;
  const existingMessage = document.getElementById(errorId);
  const errorMessage =
    "Please enter a valid " + inputElement.name.split("-").join(" ") + ".";

  if (isValid && existingMessage) {
    existingMessage.remove();
  }

  if (!isValid && !existingMessage) {
    const paragraph = document.createElement("p");
    paragraph.id = errorId;
    paragraph.textContent = errorMessage;
    error.append(paragraph);
  }
};
