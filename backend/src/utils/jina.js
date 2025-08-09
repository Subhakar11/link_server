const axios = require('axios');

module.exports = {
  generateSummary: async (urlOrText) => {
    // Basic placeholder implementation — you should replace with actual Jina AI endpoint and API key
    // Example: POST to process text or fetch the page server-side then send to Jina

    try {
      // For safety, fetch the page text here and then send extracted text to Jina for summarization.
      // But to keep this simple, we'll return a short placeholder here.
      // Replace with actual call e.g. axios.post(process.env.JINA_ENDPOINT, { data: extractedText }, { headers: { Authorization: `Bearer ${process.env.JINA_API_KEY}` } })
      return `Auto-summary placeholder for ${urlOrText}. Replace backend/src/utils/jina.js with real Jina API call.`;
    } catch (err) {
      console.error('Jina summa error', err.message);
      return '';
    }
  }
};