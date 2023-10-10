// Axios is the framework we will be using to calling the API
const axios = require('axios');

// This is the function where the call to the API is made. Returns the summarized text as a string.
async function summarizeText(text) {

  // The raw JSON body, including the text_to_summarize as the input and the min and max length
  // in terms of tokens for the summarized text output.
  let data = JSON.stringify({
    "inputs": text,
    "parameters": {
      "max_length": 100,
      "min_length": 30
    }
  });

  // Create a config object that will contain the information for the request to the API
  let config = {
    method: 'post',
    url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env['ACCESS_TOKEN']
    },
    data: data
  };

  // Capture the request in a try/catch to check for any errors that may occur
  try {
    const response = await axios.request(config);
    // Return the summary text from the response
    return response.data[0].summary_text;
  } catch (err) {
    console.log(err);
    return "Error, check console for more information."
  }
}

// Allows for summarizeText() to be called outside of this file
module.exports = summarizeText;
