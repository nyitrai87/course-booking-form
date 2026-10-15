const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const cardInput = document.getElementById("card");
const form = document.getElementById("booking-form");
const submitButton = document.getElementById("submit-button");
const error = document.getElementById("error-container");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (
    validateName(nameInput.value) &&
    validateEmail(emailInput) &&
    validateCard(cardInput.value)
  ) {
    const emailBody = encodeURIComponent(
      `Name: ${nameInput.value}\r\nEmail: ${emailInput.value}\r\nCard: ${cardInput.value}`,
    );

    window.location.href = `mailto:challenge@dn-uk.com?body=${emailBody}`;
  } else {
    updateValidationStyle(nameInput, validateName(nameInput.value), true);
    updateValidationStyle(emailInput, validateEmail(emailInput), true);
    updateValidationStyle(cardInput, validateCard(cardInput.value), true);
    handleErrorMessage(nameInput, validateName(nameInput.value), true);
    handleErrorMessage(emailInput, validateEmail(emailInput), true);
    handleErrorMessage(cardInput, validateCard(cardInput.value), true);
  }
});

nameInput.addEventListener("blur", () => {
  const isValid = validateName(nameInput.value);
  updateValidationStyle(nameInput, isValid);
  handleErrorMessage(nameInput, isValid);
});

emailInput.addEventListener("blur", () => {
  const isValid = validateEmail(emailInput);
  updateValidationStyle(emailInput, isValid);
  handleErrorMessage(emailInput, isValid);
});

cardInput.addEventListener("blur", () => {
  const isValid = validateCard(cardInput.value);
  updateValidationStyle(cardInput, isValid);
  handleErrorMessage(cardInput, isValid);
});

const regex = /^[A-Z][a-z]+(-[A-Z][a-z]+)*( [A-Z][a-z]+(-[A-Z][a-z]+)*)+$/;

const validateName = (name) => {
  return regex.test(name);
};

const validateEmail = (emailInput) => {
  return emailInput.checkValidity();
};

const validateCard = (cardNumber) => {
  const isNum = /^\d+$/.test(cardNumber);
  const cardDigits = cardNumber.split("").map(Number);

  // Step 0: Check that the length of the card number is between 11 and 19 characters.
  if (cardNumber.length < 11 || cardNumber.length > 19) {
    return false;
  }

  // Step 1: Check that the card number only contains numeric characters.
  if (!isNum) {
    return false;
  }

  // Step 2: Check that the sum of the card number digits is not 0.
  // Sum can only be 0 if all digits are 0's.
  // This also satisfies the criteria to reject card number that consists of 0's only.
  if (cardDigits.every((digit) => digit === 0)) {
    return false;
  }

  // Step 3 and 4: Starting from the rightmost digit, double the value of every second digit.
  // If doubling the number results in a two-digit number greater than 9, then add the
  // digits of the product. This is equal to deducting 9 from the product.
  for (let i = cardDigits.length - 2; i >= 0; i -= 2) {
    if (cardDigits[i] * 2 > 9) {
      cardDigits[i] = cardDigits[i] * 2 - 9;
    } else {
      cardDigits[i] = cardDigits[i] * 2;
    }
  }

  // Step 5 and 6: Take the sum of all the single digits. If the total modulo 10 is equal to 0
  // then the number is valid according to the Luhn formula; else it is not valid.
  let sum = 0;
  cardDigits.forEach((digit) => {
    sum += digit;
  });

  if (sum % 10 !== 0) {
    return false;
  }

  return true;
};

const updateValidationStyle = (
  inputElement,
  isValid,
  showEmptyErrors = false,
) => {
  if (showEmptyErrors === false && inputElement.value === "") {
    inputElement.classList.remove("fail", "pass");
    return;
  }

  if (isValid) {
    inputElement.classList.remove("fail");
    inputElement.classList.add("pass");
  } else {
    inputElement.classList.remove("pass");
    inputElement.classList.add("fail");
  }
};

const handleErrorMessage = (inputElement, isValid, showEmptyErrors = false) => {
  const errorId = `${inputElement.id}-error`;
  const existingMessage = document.getElementById(errorId);
  const errorMessage = `Please enter a valid ${inputElement.name.split("-").join(" ")}.`;

  if (showEmptyErrors === false && inputElement.value === "") {
    if (existingMessage) {
      existingMessage.remove();
    }
    return;
  }

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
