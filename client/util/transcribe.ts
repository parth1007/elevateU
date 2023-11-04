// Function to convert audio blob to base64 encoded string
// @ts-ignore
export const audioBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const arrayBuffer = reader.result;
        const base64Audio = btoa(
            // @ts-ignore
          new Uint8Array(arrayBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        resolve(base64Audio);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
    });
  };

// @ts-ignore
 export const convertToMP3 = async(blob, setBlob) => {
    if (blob) {
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);

      audio.addEventListener('canplaythrough', () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = audio.duration * 200;
        canvas.height = 50;
        
        //@ts-ignore
        context.clearRect(0, 0, canvas.width, canvas.height);
        //@ts-ignore
        context.fillRect(0, 0, canvas.width, canvas.height);

        audio.currentTime = 0;

        audio.play();

        const mediaStream = canvas.captureStream();
        const audioTrack = mediaStream.getAudioTracks()[0];

        //@ts-ignore
        const recordedChunks = [];

        const mediaRecorder = new MediaRecorder(mediaStream);
        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            recordedChunks.push(e.data);
          }
        };

        mediaRecorder.onstop = () => {
            //@ts-ignore
            const blob = new Blob(recordedChunks, { type: 'audio/mp3' });
            setBlob(blob);
        };

        mediaRecorder.start();
        audioTrack.onended = () => mediaRecorder.stop();
      });
    }
  };