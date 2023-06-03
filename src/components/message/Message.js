import './Message.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import axios from 'axios';

function Message(props) {
  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);

  const [fetchedInfo, setFetchedInfo] = useState(null);

  const fetchClaudeInfo = async (query) => {
    const apiKey = localStorage.getItem('CLAUDE_API_KEY');
    const model = localStorage.getItem('CLAUDE_MODEL') || 'claude-v1';
    const max_tokens_to_sample = Number(localStorage.getItem('CLAUDE_MAX_TOKENS')) || 50;
    const prompt = `\n\nHuman: ${query}\n\nAssistant:`;

    try {
      const response = await axios.post(
        'https://api.anthropic.com/v1/complete',
        {
          prompt,
          model,
          max_tokens_to_sample,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': apiKey,
          },
        },
      );
      const data = response.data.completion;
      setFetchedInfo(data);
      console.log('Claude API response:', data); // Debugging line
    } catch (error) {
      console.error('Error fetching data:', error);
      setFetchedInfo(null);
    }
  };

  useEffect(() => {
    console.log('Message content:', props.message.content); // Debugging line
    if (props.message && props.message.content && props.message.content.startsWith('/claude')) {
      const query = props.message.content.slice(8); // Remove the '/claude ' part and obtain the actual query
      fetchClaudeInfo(query);
    }
  }, [props.message]);

  return (
    <div className="message" onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
      <div className="message__data">
        <div className="message__left">
          <Avatar className="message__avatar" src={props.message.avatar} alt={`${props.message.name} ${props.message.uid} - Image`} />
        </div>
        <div className="message__right">
          <div className="message__details">
            <Link to={`/users/${props.message.uid}`}>{props.message.name}</Link>
          </div>
          <p className="message__text">
            {props.message.content}
            {fetchedInfo && <span className="message__claudeData"> — {fetchedInfo}</span>}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Message;
