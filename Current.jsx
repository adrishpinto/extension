// Send message to the background script to get user data
chrome.runtime.sendMessage({ action: "getUserData" }, (response) => {
    if (chrome.runtime.lastError) {
      console.error("Error retrieving user data:", chrome.runtime.lastError);
      return;
    }
  
    const userData = response.userData;
  
    if (userData) {
      console.log(userData);
  
      // Select fields for autofilling
      const fullNameField = document.querySelector(
        'input[name="fullName"], input[name="fullName"]'
      );
      const firstNameField = document.querySelector(
        'input[name="firstName"], input[name="first_name"]'
      );
      const lastNameField = document.querySelector(
        'input[name="lastName"], input[name="last_name"]'
      );
      const emailFields = document.querySelectorAll(
        'input[type="email"], input[name="email"], input.err-border, input#username, input#usernameField'
      );
      const genderField = document.querySelector('select[name="gender"]');
      const phoneField = document.querySelector(
        'input[name="phone"], input[name="phone_primary"]'
      );
  
      // Autofill data into form fields
      if (firstNameField && userData.firstName) {
        firstNameField.value = userData.firstName;
      }
      if (fullNameField && userData.fullName) {
        fullNameField.value = userData.fullName;
      }
      if (lastNameField && userData.lastName) {
        lastNameField.value = userData.lastName;
      }
      emailFields.forEach((emailField) => {
        if (userData.email) {
          emailField.value = userData.email;
        }
      });
      if (genderField && userData.gender) {
        genderField.value = userData.gender; // Set selected option based on value
      }
      if (phoneField && userData.phone) {
        phoneField.value = userData.phone;
      }
  
      console.log("Form autofilled with data from your website");
  
      // Autofill based on placeholder
      const inputFields = document.querySelectorAll("input");
      inputFields.forEach((field) => {
        if (field.placeholder) {
          if (field.placeholder.toLowerCase().includes("email") && !field.value) {
            field.value = userData.email;
            console.log("Email field autofilled based on placeholder");
          }
          if (
            field.placeholder.toLowerCase().includes("mobile") &&
            !field.value
          ) {
            field.value = userData.phone;
            console.log("Phone field autofilled based on placeholder");
          }
        }
      });
    } else {
      console.log("No user data available to autofill");
    }
  });
  