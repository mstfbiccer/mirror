// In the preload script.
const { ipcRenderer } = require('electron')

ipcRenderer.on('SET_SOURCE', async (event, sourceId) => {
  if(sourceId) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: sourceId,
            maxWidth: 500,
            maxHeight: 500,
            minHeigh: 500,
            maxHeight: 500
          }
        }
      })
      handleStream(stream)
    } catch (e) {
      handleError(e)
    }
  }else {
    const container = document.querySelector('.container');
    container.innerHTML = '<p>Any Google Meet tab is not found. Please open Google Meet tab and try again.</p>';
  }
 
})

function handleStream (stream) {
  const video = document.getElementById('recordData')
  video.srcObject = stream
  video.onloadedmetadata = (e) => video.play()
}

function handleError (e) {
  console.log(e)
}