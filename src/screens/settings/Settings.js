import React, { useState, useEffect } from 'react';

function Settings() {
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('');
  const [maxTokens, setMaxTokens] = useState(50);

  useEffect(() => {
    const savedApiKey = localStorage.getItem('CLAUDE_API_KEY');
    const savedModel = localStorage.getItem('CLAUDE_MODEL');
    const savedTokens = localStorage.getItem('CLAUDE_MAX_TOKENS');

    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
    if (savedModel) {
      setModel(savedModel);
    }
    if (savedTokens) {
      setMaxTokens(savedTokens);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('CLAUDE_API_KEY', apiKey);
    localStorage.setItem('CLAUDE_MODEL', model);
    localStorage.setItem('CLAUDE_MAX_TOKENS', maxTokens);
  };

  return (
    <div>
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your Claude API key"
        />
        <select value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="claude-v1">Claude v1</option>
          <option value="claude-v1-100k">Claude v1-100k</option>
          <option value="claude-instant-v1">Claude Instant v1</option>
          <option value="claude-instant-v1-100k">Claude Instant v1-100k</option>
          {/* Add more models here */}
        </select>
        <input
          type="number"
          value={maxTokens}
          onChange={(e) => setMaxTokens(e.target.value)}
          placeholder="Enter max token length"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Settings;