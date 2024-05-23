import React, { useState } from "react";
import Chat, { Bubble, useMessages } from "@chatui/core";
import "@chatui/core/dist/index.css";
import axios from 'axios'

export default function App() {
  const { messages, appendMsg, setTyping } = useMessages([]);
  const [conversions, setConversions] = useState([]);

  async function handleSend(type, val) {
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right"
      });

      setTyping(true);

      const newConversions = [...conversions, { role: 'user', content: val }]
      console.log('newConversions', newConversions)
      setConversions(newConversions)

      const response = await axios.post('/', { messages: newConversions })

      setConversions([...conversions, { role: 'system', content: response.data.content }])

      console.log('conversions', conversions)

      appendMsg({
        type: "text",
        content: { text: response.data.content }
      });
    }
  }

  function renderMessageContent(msg) {
    const { content } = msg;
    return <Bubble content={content.text} />;
  }

  return (
    <Chat
      navbar={{ title: "智能助理" }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
    />
  );
}
