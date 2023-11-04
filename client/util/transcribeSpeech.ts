import axios from 'axios';


// Function to encode audio in base64 format
function encodeAudioToBase64(audioFile) {
return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
    const base64String = btoa(new Uint8Array(event.target.result).reduce((data, byte) => data + String.fromCharCode(byte), ''));
    resolve(base64String);
    };

    reader.onerror = (error) => {
    reject(error);
    };

    reader.readAsArrayBuffer(audioFile);
});
}

// Input: Your audio file (replace with your own)
const audioFileInput = document.getElementById('audioFileInput');

// Handle the input change event
audioFileInput.addEventListener('change', async (event) => {
const audioFile = event.target.files[0];

if (audioFile) {
    try {
    const base64Audio = await encodeAudioToBase64(audioFile);
    console.log('Base64 Audio:', base64Audio);

    // You can now use the base64Audio string for your API request
    } catch (error) {
    console.error('Error encoding audio to base64:', error);
    }
}
});

async function transcribe() {
    const apiKey = 'YOUR_GOOGLE_API_KEY'; // Replace with your Google API key
    const apiEndpoint = 'https://speech.googleapis.com/v1/speech:recognize';

    // Construct the request data
    const requestData = {
        config: {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'en-US', // Language code (change as needed)
        },
        audio: {
        content: encodeAudioToBase64(), // Replace with your audio data in base64 format
        },
    };

    try {
        const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
        });

        if (!response.ok) {
        throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('API Response:', result);

        // Handle the API response here
    } catch (error) {
        console.error('API Error:', error);
        // Handle errors here
    }
}