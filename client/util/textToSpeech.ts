import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';

export default async function speak(textToSpeak : string, setAudioUrl: Dispatch<SetStateAction<string>>) {
  const apiKey = process.env.GOOGLE_API_KEY;
  const apiEndpoint = 'https://texttospeech.googleapis.com/v1/text:synthesize';

  // Constructing the request data
  const requestData = {
    input: {
      text: 'Hello, this is a text-to-speech test.'
    },
    voice: {
      languageCode: 'en-US', // Language code
      name: 'en-US-Wavenet-D', // Voice name
    },
    audioConfig: {
      audioEncoding: 'MP3'
    }
  };

  const apiConfig = {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        }
    }
  

  try {
    const response = await axios.post(apiEndpoint, {
      body: JSON.stringify(requestData),
    }, apiConfig);

    //@ts-ignore
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    //@ts-ignore
    const result = await response.json();
    console.log('API Response:', result);

    // Handle the API response here

    // You may want to play the generated audio or display it in your application
    setAudioUrl(`data:audio/wav;base64,${response.data.audioContent}`);
} catch (error) {
    alert("Can't Speak");
    console.error('API Error:', error);
  }
}