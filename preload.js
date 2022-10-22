// In the preload script.
const { ipcRenderer } = require('electron')

// listen for the source id from main process.
ipcRenderer.on('SET_SOURCE', async (event, sourceId) => {
  // if source id isn't null, create a stream from the source id.
  // else, then no source found.
  if(sourceId) {
    try {
      // create a stream from the source id.
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
    // no source found.
    const container = document.querySelector('.container');
    container.innerHTML = '<p>Any Google Meet tab is not found. Please open Google Meet tab and try again.</p>';
  }
 
})

function handleStream (stream) {
  // stream data send to video element on the DOM.
  const video = document.getElementById('recordData')
  video.srcObject = stream
  video.onloadedmetadata = () => video.play()
}

// error handling function.
function handleError (e) {
  console.log(e)
}