const axios = require('axios').default;

const options = {
  method: 'POST',
  url: 'http://localhost:1000/ai/get-answer',
  headers: {
    Accept: '*/*',
    'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    'Content-Type': 'application/json'
  },
  data: {
    prompt: 'I am a student currently pursuing a course in computer scrince. I have study batches or topics related to: . Each library item has a type property (chapter, notes, audio, video, image). Please recommend a list of the top 15 high-quality, free online resources (articles, videos, PDFs, tutorials, etc.) for these topics. Requirements:- Educational and trustworthy- Free to access- Variety of formats- Include for each item: title, description, tags (including the type), a direct usable URL,- Include additional metadata: reading time (if applicable), rating, and views.Return the response strictly in JSON format as an array of objects, each with keys: '
  }
};

try {
  const { data } = await axios.request(options);
  console.log(data);
} catch (error) {
  console.error(error);
}
