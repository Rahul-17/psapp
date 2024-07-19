import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, CircularProgress } from '@mui/material';

const SpeechAnalyzer = ({ transcript }) => {
  const [suggestions, setSuggestions] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const requestData = {
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      {
        role: 'user',
        content:  `Here is a transcript of a speech: ${transcript} Please provide a modified version of the speech that adheres to public speaking standards. Format the response as follows:

        1. Provide the modified speech in a single paragraph.
        2. After the modified speech, start a new line with "Tips and Suggestions:"
        3. List each suggestion for improvement, numbered, and formatted in a way that can be easily parsed.`
        
      }
    ],
    max_tokens: 1000
  };

  const handleAnalyzeSpeech = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://sdsecc-openai.openai.azure.com/openai/deployments/gpt35/chat/completions?api-version=2024-02-01', requestData, {
        headers: {
          'Authorization': 'Bearer e02103670c7c4445a9a37f983d4f6642',
          'Content-Type': 'application/json',
          'api-Key': 'e02103670c7c4445a9a37f983d4f6642'
        },
      });

      setSuggestions(response.data.choices[0].message.content);
      setOpen(true);
    } catch (error) {
      console.error('Error analyzing speech:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formatSuggestions = (text) => {
    if(!text)return null;

    const parts = text.split(/(\d+\.\s+)/).filter(Boolean);
    const generalFeedback = parts[0].trim();
    const lastIndex = generalFeedback.lastIndexOf('.')
    const finalFeedback = generalFeedback.slice(0,lastIndex + 1).trim()
    const suggestions = parts.slice(1).filter((_, index) => index % 2 === 1);

    return (
      <div>
        {/* <span>Here is how you could have spoken instead:</span> */}
        <p><b>{finalFeedback}</b></p>
        {suggestions.length > 0 && (
          <div>
            <h4>Tips and Suggestions</h4>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index} style={{fontSize:"15px"}}>{suggestion.trim()}</li>
            ))}
          </ul>
          </div>
        )}
      </div>
    );
  };

  
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAnalyzeSpeech}
        disabled={loading}
        style={{backgroundColor:"#00736E"}}
      >
        Ask AI
        {loading && <CircularProgress size={24} />}
      </Button>

            <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Speech Improvement Suggestions</DialogTitle>
        <DialogContent>
          <h4>Here is how you could have spoken instead:</h4>
          {formatSuggestions(suggestions)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SpeechAnalyzer;