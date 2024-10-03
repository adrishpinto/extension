chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");

  // Fetch data from your Vite website
  fetch("http://localhost:3000/")
    .then((response) => response.json())
    .then((data) => {
      // Store the fetched data in chrome.storage.local
      console.log(data);
      chrome.storage.local.set({ userData: data }, () => {
        console.log("User data fetched and stored");
      });
    })
    .catch((error) => console.error("Error fetching user data:", error));
});

// Message Listener to communicate with content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getUserData") {
    // Fetch user data from chrome.storage.local and send it to the content script
    chrome.storage.local.get("userData", (result) => {
      sendResponse({ userData: result.userData });
    });
  }

  // Return true to indicate async response
  return true;
});
