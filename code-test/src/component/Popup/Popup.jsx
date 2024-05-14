import React, { useState,useEffect } from 'react'
import axios from 'axios';
import './Popup.css'

const Popup = () => {
  const [datas, setDatas] = useState([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [query, setQuery] = useState('');
    const [type, setType] = useState('');
    const [error, setError] = useState('');
    const [webSocket, setWebSocket] = useState(null);

    useEffect(() => {
        //  WEBSOCKET CONNECTION
        const newSocket = new WebSocket("wss://code-exercise-98l4.onrender.com:/ws");
        newSocket.onopen = () => console.log('WS Connected');
        newSocket.onclose = () => console.log('WS Disconnected');
        newSocket.onerror = (err) => console.log("WS Error");
        newSocket.onmessage = (e) => {
          const data = JSON.parse(e.data);
          console.log("WS Receives: ", data);
          // Handle coming  data here webhook
        }
        setWebSocket(newSocket);
    
        return () => {
          // WEBSOCKET DISCONNECTED
          if (newSocket) {
            newSocket.close();
          }
        };
      }, []);
    
     
      const handleSubmit = async (e) => {
        e.preventDefault();
        const newData = {
          name,
          message,
          query,
          type
        };
    
        try {
          const response = await axios.post( process.env.REACT_APP_DATADOG_API + '/datadog', newData);
          
          setDatas([...datas, response.data]); 
          if (webSocket) {
            webSocket.send(JSON.stringify(newData));
          }
          window.location.reload()
          setError('');
        } catch (err) {
          setError('Failed to create monitor. Please try again.'); 
        }
      };

  return (
    <div>
          <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
            <input type="text" placeholder="Query" value={query} onChange={(e) => setQuery(e.target.value)} />
            <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
            <button type="submit" className='submit'>Submit</button>
          </form>
          {error && <p className="error" >{error}</p>}
        </div>
    </div>
  )
}

export default Popup
