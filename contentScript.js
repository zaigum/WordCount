// contentScript.js

function countWords() {
  const paragraphs = document.querySelectorAll('p'); // Yeh selector web page ke paragraphs ko select karega
  // Change this selector to match the paragraphs on the webpage.
  let wordCount = 0;

  paragraphs.forEach((paragraph) => {
    const words = paragraph.textContent.split(/\s+/);
    wordCount += words.length;
  });

  return wordCount;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'countWords') {
    const wordCount = countWords();
    sendResponse({ wordCount });
  }
});
