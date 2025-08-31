// popup.js

document.addEventListener('DOMContentLoaded', function () {
  const wordCountElement = document.getElementById('wordCount');
  const downloadButton = document.getElementById('downloadButton');
  
  // Add loading state
  wordCountElement.textContent = '...';
  
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'countWords' }, function (response) {
      if (response && response.wordCount !== undefined) {
        wordCountElement.textContent = response.wordCount.toLocaleString();
      } else {
        wordCountElement.textContent = '0';
      }
    });
  });

  downloadButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const wordCount = wordCountElement.textContent;
      const currentDate = new Date().toLocaleDateString();
      const currentTime = new Date().toLocaleTimeString();
      
      const textToSave = `Word Count Report\n` +
                        `Generated: ${currentDate} at ${currentTime}\n` +
                        `URL: ${tabs[0].url}\n` +
                        `Word Count: ${wordCount}\n`;

      const blob = new Blob([textToSave], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `word_count_${new Date().toISOString().split('T')[0]}.txt`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  });
});
