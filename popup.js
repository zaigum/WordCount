// popup.js

document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'countWords' }, function (response) {
      document.getElementById('wordCount').textContent = `Word Count: ${response.wordCount}`;
    });
  });

  document.getElementById('downloadButton').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const wordCount = document.getElementById('wordCount').textContent;
      const textToSave = `Word Count: ${wordCount}`;

      const blob = new Blob([textToSave], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'word_count.txt';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  });
});
