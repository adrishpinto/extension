// Create a button element for triggering autofill manually
const autofillButton = document.createElement("button");
autofillButton.textContent = "Autofill Form";
autofillButton.style.position = "fixed";
autofillButton.style.bottom = "20px";
autofillButton.style.right = "20px";
autofillButton.style.padding = "10px 20px";
autofillButton.style.backgroundColor = "#4CAF50";
autofillButton.style.color = "white";
autofillButton.style.border = "none";
autofillButton.style.borderRadius = "5px";
autofillButton.style.cursor = "pointer";
autofillButton.style.zIndex = "1000";

// Append the button to the body
document.body.appendChild(autofillButton);

// Function to trigger events on form fields
function triggerEvent(element, eventName) {
  const event = new Event(eventName, { bubbles: true });
  element.dispatchEvent(event);
}

// Function to autofill the form
function autofillForm(userData) {
  const fullNameField = document.querySelector(
    'input[name="fullName"], input[name="fullName"], input.name'
  );
  const firstNameField = document.querySelector(
    'input[name="firstName"], input[name="first_name"], input.fname'
  );
  const lastNameField = document.querySelector(
    'input[name="lastName"], input[name="last_name"], input.lname'
  );
  const emailFields = document.querySelectorAll(
    'input[type="email"], input[name="email"], input.err-border, input#username, input#usernameField'
  );
  const genderField = document.querySelector('select[name="gender"]');
  const phoneField = document.querySelector(
    'input[name="phone"], input[name="phone_primary"]'
  );

  // Autofill data into form fields and trigger events
  if (fullNameField && userData.fullName) {
    fullNameField.value = userData.fullName;
    triggerEvent(fullNameField, "input");
    triggerEvent(fullNameField, "change");
    triggerEvent(fullNameField, "blur");
  }

  if (firstNameField && userData.firstName) {
    firstNameField.value = userData.firstName;
    triggerEvent(firstNameField, "input");
    triggerEvent(firstNameField, "change");
    triggerEvent(firstNameField, "blur");
  }

  if (lastNameField && userData.lastName) {
    lastNameField.value = userData.lastName;
    triggerEvent(lastNameField, "input");
    triggerEvent(lastNameField, "change");
    triggerEvent(lastNameField, "blur");
  }

  if (emailFields.length > 0 && userData.email) {
    emailFields.forEach((emailField) => {
      emailField.value = userData.email;
      triggerEvent(emailField, "input");
      triggerEvent(emailField, "change");
      triggerEvent(emailField, "blur");
    });
  }

  if (genderField && userData.gender) {
    genderField.value = userData.gender;
    triggerEvent(genderField, "input");
    triggerEvent(genderField, "change");
    triggerEvent(genderField, "blur");
  }

  if (phoneField && userData.phone) {
    phoneField.value = userData.phone;
    triggerEvent(phoneField, "input");
    triggerEvent(phoneField, "change");
    triggerEvent(phoneField, "blur");
  }

  // Autofill based on placeholder, name, or id attributes for email, phone, full name, first name, and last name
  const inputFields = document.querySelectorAll("input");
  inputFields.forEach((field) => {
    // Check for 'email' in placeholder, name, or id attributes
    if (
      (field.placeholder &&
        field.placeholder.toLowerCase().includes("email")) ||
      (field.name && field.name.toLowerCase().includes("email")) ||
      (field.id && field.id.toLowerCase().includes("email"))
    ) {
      if (!field.value) {
        field.value = userData.email;
        triggerEvent(field, "input");
        triggerEvent(field, "change");
        triggerEvent(field, "blur");
        console.log("Email field autofilled based on placeholder, name, or id");
      }
    }

    // Check for 'mobile' or 'phone' in placeholder, name, or id for phone number autofill
    if (
      (field.placeholder &&
        (field.placeholder.toLowerCase().includes("mobile") ||
          field.placeholder.toLowerCase().includes("phone"))) ||
      (field.name &&
        (field.name.toLowerCase().includes("mobile") ||
          field.name.toLowerCase().includes("phone"))) ||
      (field.id &&
        (field.id.toLowerCase().includes("mobile") ||
          field.id.toLowerCase().includes("phone")))
    ) {
      if (!field.value) {
        field.value = userData.phone;
        triggerEvent(field, "input");
        triggerEvent(field, "change");
        triggerEvent(field, "blur");
        console.log("Phone field autofilled based on placeholder, name, or id");
      }
    }

    // Check for 'fullname' or 'full name' in placeholder, name, or id for full name autofill
    if (
      (field.placeholder &&
        field.placeholder.toLowerCase().includes("full name")) ||
      (field.name && field.name.toLowerCase().includes("fullname")) ||
      (field.id && field.id.toLowerCase().includes("fullname"))
    ) {
      if (!field.value) {
        field.value = userData.fullName;
        triggerEvent(field, "input");
        triggerEvent(field, "change");
        triggerEvent(field, "blur");
        console.log(
          "Full name field autofilled based on placeholder, name, or id"
        );
      }
    }

    // Check for 'first name' or 'firstname' in placeholder, name, or id for first name autofill
    if (
      (field.placeholder &&
        field.placeholder.toLowerCase().includes("first name")) ||
      (field.name && field.name.toLowerCase().includes("firstname")) ||
      (field.id && field.id.toLowerCase().includes("firstname"))
    ) {
      if (!field.value) {
        field.value = userData.firstName;
        triggerEvent(field, "input");
        triggerEvent(field, "change");
        triggerEvent(field, "blur");
        console.log(
          "First name field autofilled based on placeholder, name, or id"
        );
      }
    }

    // Check for 'last name' or 'lastname' in placeholder, name, or id for last name autofill
    if (
      (field.placeholder &&
        field.placeholder.toLowerCase().includes("last name")) ||
      (field.name && field.name.toLowerCase().includes("lastname")) ||
      (field.id && field.id.toLowerCase().includes("lastname"))
    ) {
      if (!field.value) {
        field.value = userData.lastName;
        triggerEvent(field, "input");
        triggerEvent(field, "change");
        triggerEvent(field, "blur");
        console.log(
          "Last name field autofilled based on placeholder, name, or id"
        );
      }
    }
  });
}

// Fetch user data and autofill form
function fetchAndAutofill() {
  chrome.runtime.sendMessage({ action: "getUserData" }, (response) => {
    if (chrome.runtime.lastError) {
      console.error("Error retrieving user data:", chrome.runtime.lastError);
      return;
    }

    const userData = response.userData;

    if (userData) {
      console.log(userData);
      autofillForm(userData); // Call the autofill function automatically
    } else {
      console.log("No user data available to autofill");
    }
  });
}

// Automatically autofill when the script runs
fetchAndAutofill();

// Event listener for the autofill button (manual trigger)
autofillButton.addEventListener("click", () => {
  fetchAndAutofill(); // Trigger autofill manually via button
});
