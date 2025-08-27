// background.js

 chrome.runtime.onInstalled.addListener(function() {
  
  console.log("Extension installed or updated");
});

 
chrome.browserAction.onClicked.addListener(function(tab) {
   chrome.action.openPopup();
});

 
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'example') {
    
    console.log('Received a message from the content script:', message);

     
    sendResponse({ data: 'Response from background.js' });
  }
});

 