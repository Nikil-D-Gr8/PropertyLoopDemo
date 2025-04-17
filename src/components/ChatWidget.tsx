import { useState, useRef, useEffect } from 'react';
import { Image as ImageIcon, X, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  type: 'user' | 'ai';
  content: string;
}

interface ChatWidgetProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const ChatWidget = ({ isOpen, setIsOpen }: ChatWidgetProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const encodeImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String.split(',')[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const currentInput = input;
    setInput('');
    setIsOpen(true); // Ensure chat is open when sending
    setIsLoading(true);
    
    // Add user message immediately
    setMessages(prev => [...prev, { type: 'user', content: currentInput }]);

    const messageData: any = {
      message: currentInput,
      session_id: sessionId
    };

    if (selectedImage) {
      try {
        const imageData = await encodeImage(selectedImage);
        messageData.image = imageData;
      } catch (error) {
        console.error('Error encoding image:', error);
        setMessages(prev => [...prev, { type: 'ai', content: 'Error processing image. Please try again.' }]);
        setIsLoading(false);
        return;
      }
    }

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });

      const data = await response.json();

      if (data.session_id) {
        setSessionId(data.session_id);
      }

      // Add AI response
      setMessages(prev => [...prev, { type: 'ai', content: data.response }]);
      setSelectedImage(null);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { type: 'ai', content: 'Sorry, there was an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const formatMessage = (content: string) => {
    // Convert ** to proper bold markdown
    return content.replace(/\*\*/g, '__');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-96 h-[500px] flex flex-col">
          {/* Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold">Property Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="p-1">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-gray-500 text-center">
                How can I help you today?
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${
                  message.type === 'user' ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-gray-200'
                } rounded-lg p-3 max-w-[80%] break-words`}
              >
                <ReactMarkdown
                  components={{
                    p: ({node, ...props}) => <p className="m-0" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc ml-4" {...props} />,
                    li: ({node, ...props}) => <li className="my-1" {...props} />
                  }}
                >
                  {formatMessage(message.content)}
                </ReactMarkdown>
              </div>
            ))}
            {isLoading && (
              <div className="mr-auto bg-gray-200 rounded-lg p-3 animate-pulse">
                Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-4 border-t">
            {selectedImage && (
              <div className="mb-2 text-sm text-gray-600 flex justify-between items-center">
                <span>Image: {selectedImage.name}</span>
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            )}
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageSelect}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`p-2 hover:bg-gray-100 rounded ${selectedImage ? 'text-blue-500' : ''}`}
              >
                <ImageIcon size={20} />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || (!input.trim() && !selectedImage)}
                className={`p-2 rounded ${
                  isLoading || (!input.trim() && !selectedImage)
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'hover:bg-gray-100 text-blue-500'
                }`}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};


