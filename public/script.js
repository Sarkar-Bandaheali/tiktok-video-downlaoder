async function downloadVideo() {
  const videoURL = document.getElementById('videoURL').value;
  const resultContainer = document.getElementById('result');
  const loadingPopup = document.getElementById('loading-popup');

  // Clear previous results
  resultContainer.innerHTML = '';

  if (!videoURL) {
    alert('Please enter a TikTok video URL.');
    return;
  }

  // Show loading popup
  loadingPopup.style.display = 'flex';

  try {
    const response = await fetch('/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoURL }),
    });

    const data = await response.json();

    if (data.error) {
      resultContainer.innerHTML = `<p>${data.error}</p>`;
    } else {
      resultContainer.innerHTML = `
        <h3>${data.title}</h3>
        <p>Author: ${data.author}</p>
        <img src="${data.cover}" alt="Video Cover" width="300"/>
        <p><strong>Download Options:</strong></p>
        <button class="download-btn" onclick="downloadFile('${data.hdVideo}', 'hd_video.mp4')">Download HD Video</button>
        <button class="download-btn" onclick="downloadFile('${data.wmVideo}', 'watermarked_video.mp4')">Download Watermarked Video</button>
        <button class="download-btn" onclick="downloadFile('${data.sound}', 'audio.mp3')">Download Audio</button>
      `;
    }

  } catch (err) {
    console.error(err);
    resultContainer.innerHTML = '<p>Download failed! Please try again later.</p>';
  } finally {
    // Hide loading popup
    loadingPopup.style.display = 'none';
  }
}

async function downloadFile(fileURL, fileName) {
  try {
    const response = await fetch(fileURL);
    const blob = await response.blob();
    
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName;
    downloadLink.click();
    URL.revokeObjectURL(downloadLink.href);
  } catch (err) {
    alert('Failed to download the file. Please try again.');
  }
}
