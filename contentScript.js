function getTextStats() {
  const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, div, span, article, section');
  let allText = '';
  
  textElements.forEach((element) => {
    if (element.offsetParent !== null) {
      allText += element.textContent + ' ';
    }
  });
  
  const cleanText = allText.trim();
  const words = cleanText ? cleanText.split(/\s+/).filter(word => word.length > 0) : [];
  const wordCount = words.length;
  const charCount = cleanText.length;
  const readingSpeed = 200;
  const readTimeMinutes = Math.ceil(wordCount / readingSpeed);
  const readTime = readTimeMinutes === 1 ? '1 min' : `${readTimeMinutes} min`;
  
  return { wordCount, charCount, readTime };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getTextStats') {
    const stats = getTextStats();
    sendResponse(stats);
  }
});
