// popup.js

document.addEventListener('DOMContentLoaded', function () {
  const wordCountElement = document.getElementById('wordCount');
  const charCountElement = document.getElementById('charCount');
  const readTimeElement = document.getElementById('readTime');
  const downloadButton = document.getElementById('downloadButton');
  const copyButton = document.getElementById('copyButton');
  const refreshButton = document.getElementById('refreshButton');
  
  let currentStats = {};
  
  function loadStats() {
    wordCountElement.textContent = '...';
    charCountElement.textContent = '...';
    readTimeElement.textContent = '...';
    
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'getTextStats' }, function (response) {
        if (response) {
          currentStats = response;
          wordCountElement.textContent = response.wordCount.toLocaleString();
          charCountElement.textContent = response.charCount.toLocaleString();
          readTimeElement.textContent = response.readTime;
        } else {
          wordCountElement.textContent = '0';
          charCountElement.textContent = '0';
          readTimeElement.textContent = '0 min';
        }
      });
    });
  }
  
  loadStats();
  
  refreshButton.addEventListener('click', loadStats);
  
  copyButton.addEventListener('click', function () {
    const statsText = `Words: ${currentStats.wordCount || 0}\nCharacters: ${currentStats.charCount || 0}\nReading Time: ${currentStats.readTime || '0 min'}`;
    navigator.clipboard.writeText(statsText);
  });

  downloadButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentDate = new Date().toLocaleDateString();
      const currentTime = new Date().toLocaleTimeString();
      
      const textToSave = `Text Analysis Report\n` +
                        `Generated: ${currentDate} at ${currentTime}\n` +
                        `URL: ${tabs[0].url}\n\n` +
                        `Statistics:\n` +
                        `Words: ${currentStats.wordCount || 0}\n` +
                        `Characters: ${currentStats.charCount || 0}\n` +
                        `Reading Time: ${currentStats.readTime || '0 min'}\n`;

      const blob = new Blob([textToSave], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `text_analysis_${new Date().toISOString().split('T')[0]}.txt`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  });
});
