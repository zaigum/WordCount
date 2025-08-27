
function countWords() {
  const paragraphs = document.querySelectorAll('p');  
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
