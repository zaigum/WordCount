// background.js

// Event listener for when the extension is installed or updated
chrome.runtime.onInstalled.addListener(function() {
  // Do any necessary initialization here
  console.log("Extension installed or updated");
});

// Event listener for when the extension icon is clicked
chrome.browserAction.onClicked.addListener(function(tab) {
  // Open the extension's popup window when the icon is clicked
  chrome.action.openPopup();
});

// Example of sending a message to a content script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'example') {
    // Do something with the message
    console.log('Received a message from the content script:', message);

    // Send a response back to the content script if needed
    sendResponse({ data: 'Response from background.js' });
  }
});

// Other background tasks and functionality can be added here
