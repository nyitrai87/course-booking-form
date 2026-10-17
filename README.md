# Course Booking Form

A browser-based course booking form built with HTML, CSS and vanilla JavaScript. It validates a name, email address and proxy card number before opening a prefilled email draft.

This project focuses on client-side validation, DOM manipulation and implementing the Luhn algorithm without external libraries.

## Features

- Validate individual fields when they lose focus.
- Keep empty fields neutral until the form is submitted.
- Show success and failure states through input styling.
- Display and clear field-specific error messages without duplicates.
- Validate all three fields before opening an email draft.
- Support submission using the Submit button or Enter key.
- Keep the form centred and allow the container to grow for error messages.

## Built with

- **HTML5:** form structure, labels and email validation constraints.
- **CSS3:** Flexbox, Grid and validation styles.
- **JavaScript:** validation logic, DOM updates and event handling.

No dependencies, build tools or back-end server are required.

## Getting started

Clone the repository:

```bash
git clone https://github.com/nyitrai87/course-booking-form.git
cd course-booking-form
```

Open `index.html` in a browser, or use a local development server such as the VS Code Live Server extension.

Successful submission requires a configured email application or browser handler for `mailto:` links.

## Validation

### Name

Names must contain at least two parts separated by single spaces. Each part starts with an uppercase A–Z letter followed by at least one lowercase a–z letter.

Hyphenated given and family names are supported. Each hyphenated segment follows the same capitalisation and minimum-length rules.

| Example            | Result  |
| ------------------ | ------- |
| `John Doe`         | Valid   |
| `John Doe-Deer`    | Valid   |
| `John-Paul Doe`    | Valid   |
| `John Michael Doe` | Valid   |
| `John`             | Invalid |
| `J Doe`            | Invalid |
| `John D`           | Invalid |
| `John@Doe`         | Invalid |

The current expression does not support accented letters or apostrophes.

### Email

Email validation combines the HTML `email` input type, the `required` attribute and a custom `pattern`.

JavaScript uses `checkValidity()` to evaluate these constraints together. The additional pattern requires a dotted domain, rejecting entries such as `test@abc` and `test@.com`.

### Proxy card number

Card validation follows these steps:

1. Require between **11 and 19 characters**.
2. Accept digits only.
3. Reject numbers consisting entirely of zeros.
4. Double every second digit, starting with the second digit from the right.
5. Subtract nine from doubled values greater than nine.
6. Sum the processed digits.
7. Accept the checksum only when the total is divisible by ten.

Spaces and hyphens are not accepted.

A passing Luhn checksum does not confirm that a card exists or can be used for payment.

## How it works

Validation and feedback are handled separately:

- `validateName()`, `validateEmail()` and `validateCard()` return boolean results.
- `updateValidationStyle()` applies success or failure styling.
- `handleErrorMessage()` adds or removes one error message per field.

Blur listeners check individual inputs. On submission, every field is validated, including empty fields. Each result is stored once and reused for styling, error messages and the final submission decision.

If all fields are valid, the form opens an email draft containing the entered values. The message body is encoded using `encodeURIComponent()`.

The user reviews and sends the draft through their email application; the page does not send email automatically.

## Project structure

```text
course-booking-form/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Testing

The form was manually tested with valid and invalid inputs, blur events and submission scenarios.

Use the following fictional data to try a successful submission:

```text
Name: John Doe
Email: test@abc.com
Card: 4111111111111111
```

Other checks include:

- Empty fields remain neutral when they lose focus.
- Submitting an empty form displays errors for all three fields.
- Invalid names, email addresses and card numbers are rejected.
- All-zero card numbers are rejected.
- Correcting an input removes its error and applies success styling.
- Repeated validation does not create duplicate messages.
- Invalid submission does not open an email draft.

No automated test suite is included.

## Scope

This is a front-end demonstration, not a payment-processing or booking service.

Use fictional proxy card numbers only. The entered card value is included in the email draft.

## Future improvements

- Responsive dimensions and spacing for smaller screens.
- Broader support for international names.
- Accessible error announcements and links between inputs and messages.
- Automated tests for validation boundaries and additional edge cases.
