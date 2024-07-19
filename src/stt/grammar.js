import axios from 'axios';

export async function run(text) {
  try {
    const response = await axios.post(
      'https://api.sapling.ai/api/v1/edits',
      {
        "key": 'A4YJV73IP1CASD8CNZB2BQ2FBU0UWIFG', // replace with your API key
        "session_id": 'test session',
        text,
      }
    );
    const { status, data } = response;
    const sentences = [];
    console.log({ status });
    data.edits.forEach(edit => {
        sentences.push(edit.sentence);
    });
    console.log(JSON.stringify(data, null, 4));
    // console.log(sentences)
  } catch (err) {
    const { msg } = err.response.data;
    console.log({ err: msg });
  }
}