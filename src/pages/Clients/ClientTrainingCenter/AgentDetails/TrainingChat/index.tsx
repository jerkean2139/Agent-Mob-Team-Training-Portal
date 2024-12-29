import React from 'react';
import { MessageSquare, Send } from 'lucide-react';

interface TrainingChatProps {
  clientId: string;
  agentId: string;
}

export default function TrainingChat({ clientId, agentId }: TrainingChatProps) {
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState<Array<{
    id: string;
    content: string;
    sender: 'user' | 'agent';
    timestamp: string;
  }>>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date().toISOString()
    }]);

    // Clear input
    setMessage('');

    // Simulate agent response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        content: "I'm processing your request and learning from our interaction.",
        sender: 'agent',
        timestamp: new Date().toISOString()
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[600px] bg-gray-50 rounded-lg border">
      {/* Chat Header */}
      <div className="p-4 border-b bg-white rounded-t-lg">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-primary" />
          <div>
            <h2 className="font-medium text-gray-900">Training Chat</h2>
            <p className="text-sm text-gray-500">Train and test agent responses</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.sender === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-white border'
              }`}
            >
              <p>{msg.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t bg-white rounded-b-lg">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}