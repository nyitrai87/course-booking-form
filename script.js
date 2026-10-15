// Get the form, inputs and shared error-message container.
const form = document.getElementById("booking-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const cardInput = document.getElementById("card");
const error = document.getElementById("error-container");

// Validate every field on Submit, including empty fields.
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Store each result so it can be reused for visual feedback and submission.
  const isNameValid = validateName(nameInput.value);
  const isEmailValid = validateEmail(emailInput);
  const isCardValid = validateCard(cardInput.value);

  updateValidationStyle(nameInput, isNameValid, true);
  updateValidationStyle(emailInput, isEmailValid, true);
  updateValidationStyle(cardInput, isCardValid, true);
  handleErrorMessage(nameInput, isNameValid, true);
  handleErrorMessage(emailInput, isEmailValid, true);
  handleErrorMessage(cardInput, isCardValid, true);

  // Open an email draft only when all three fields are valid.
  if (isNameValid && isEmailValid && isCardValid) {
    const emailBody = encodeURIComponent(
      `Name: ${nameInput.value}\r\nEmail: ${emailInput.value}\r\nCard: ${cardInput.value}`,
    );

    window.location.href = `mailto:challenge@dn-uk.com?body=${emailBody}`;
  }
});

// Validate each field when it loses focus.
// The helpers keep empty fields neutral unless explicitly told otherwise
// by including a third argument set to true.
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

// Require at least two space-separated name parts using A–Z letters.
// Each part, including each hyphenated segment, must start with a capital
// followed by at least one lowercase letter.
const regex = /^[A-Z][a-z]+(-[A-Z][a-z]+)*( [A-Z][a-z]+(-[A-Z][a-z]+)*)+$/;

const validateName = (name) => {
  return regex.test(name);
};

// Check the email input's type, required and pattern constraints.
const validateEmail = (emailInput) => {
  return emailInput.checkValidity();
};

// Check the card's length and format before applying the Luhn algorithm.
const validateCard = (cardNumber) => {
  const isNum = /^\d+$/.test(cardNumber);
  const cardDigits = cardNumber.split("").map(Number);

  // Step 0: Require between 11 and 19 characters.
  if (cardNumber.length < 11 || cardNumber.length > 19) {
    return false;
  }

  // Step 1: Accept numeric characters only.
  if (!isNum) {
    return false;
  }

  // Step 2: Reject numbers consisting entirely of zeros.
  // These would otherwise pass the Luhn checksum.
  // This also satisfies the criteria to reject card number that consists of zeros only.
  if (cardDigits.every((digit) => digit === 0)) {
    return false;
  }

  // Steps 3 and 4: Moving left from the rightmost check digit,
  // double every second digit. Subtract 9 if the result exceeds 9.
  // This is equivalent to adding the two digits of that result.
  for (let i = cardDigits.length - 2; i >= 0; i -= 2) {
    if (cardDigits[i] * 2 > 9) {
      cardDigits[i] = cardDigits[i] * 2 - 9;
    } else {
      cardDigits[i] = cardDigits[i] * 2;
    }
  }

  // Steps 5 and 6: Add the processed digits.
  // A valid Luhn checksum must be divisible by 10.
  let sum = 0;
  cardDigits.forEach((digit) => {
    sum += digit;
  });

  if (sum % 10 !== 0) {
    return false;
  }

  return true;
};

// Apply validation styling.
// Submit passes true to show failure styling for empty fields too.
const updateValidationStyle = (
  inputElement,
  isValid,
  showEmptyErrors = false,
) => {
  // On blur, clear previous validation styling if the field is empty.
  if (showEmptyErrors === false && inputElement.value === "") {
    inputElement.classList.remove("fail", "pass");
    return;
  }

  // Apply the matching validation class and remove the opposite one.
  if (isValid) {
    inputElement.classList.remove("fail");
    inputElement.classList.add("pass");
  } else {
    inputElement.classList.remove("pass");
    inputElement.classList.add("fail");
  }
};

// Maintain one error message per field using a unique paragraph ID.
const handleErrorMessage = (inputElement, isValid, showEmptyErrors = false) => {
  const errorId = `${inputElement.id}-error`;
  const existingMessage = document.getElementById(errorId);
  const errorMessage = `Please enter a valid ${inputElement.name.split("-").join(" ")}.`;

  // On blur, remove any previous message for an empty field and stop.
  if (showEmptyErrors === false && inputElement.value === "") {
    if (existingMessage) {
      existingMessage.remove();
    }
    return;
  }

  // Remove the field's error message when its value becomes valid.
  if (isValid && existingMessage) {
    existingMessage.remove();
  }

  // Create an error message only if the field does not already have one.
  if (!isValid && !existingMessage) {
    const paragraph = document.createElement("p");
    paragraph.id = errorId;
    paragraph.textContent = errorMessage;
    error.append(paragraph);
  }
};
