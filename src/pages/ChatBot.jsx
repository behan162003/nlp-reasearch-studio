import { useState, useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useMutation } from '@tanstack/react-query';
import { Header } from '@/components/Header';
import { ChatMessage } from '@/components/ChatMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Bot, Trash, User } from 'lucide-react';
import { tokenize, analyzeSentiment, stem, removeStopwords } from '@/utils/nlpUtils';
import { motion } from 'framer-motion';

const mockBotResponse = (userMessage) => {
  const responses = [
    "I understand how that might feel. Could you tell me more about what's going on?",
    "Thank you for sharing that with me. How long have you been feeling this way?",
    "It sounds like you're going through a lot. What do you think would help you feel better?",
    "I'm here to listen. Would you like to talk more about how this is affecting you?",
    "That's completely valid. Many people feel that way in similar situations.",
    "I'm curious about what happened next. Would you feel comfortable sharing more?",
    "It takes courage to talk about these things. I appreciate your openness.",
    "Let's explore that feeling a bit more. When did you first notice it?",
    "Remember to be kind to yourself during this process. What small step could you take today?",
    "I'm glad you're reaching out. Sometimes talking about things can help us process them better."
  ];
  
  if (userMessage.toLowerCase().includes("anxious") || userMessage.toLowerCase().includes("anxiety")) {
    return Promise.resolve("Anxiety can be really challenging. What are some physical sensations you notice when you feel anxious?");
  } else if (userMessage.toLowerCase().includes("sad") || userMessage.toLowerCase().includes("depress")) {
    return Promise.resolve("I'm sorry to hear you're feeling down. Have you noticed any patterns to when these feelings are strongest?");
  } else if (userMessage.toLowerCase().includes("happy") || userMessage.toLowerCase().includes("good")) {
    return Promise.resolve("I'm glad to hear you're feeling positive! What do you think contributed to this good feeling?");
  } else if (userMessage.toLowerCase().includes("thank")) {
    return Promise.resolve("You're welcome. I'm here to support you whenever you need someone to talk to.");
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * responses.length);
        resolve(responses[randomIndex]);
      }, 1000);
    });
  }
};

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { 
      text: "Hi there! I'm Eliza, your personal therapy assistant. How are you feeling today? I'm here to listen and help in any way I can.", 
      isBot: true,
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const isMobile = useIsMobile();

  const sendMessageMutation = useMutation({
    mutationFn: async (message) => {
      const tokens = tokenize(message);
      const stemmed = tokens.map(token => stem(token));
      const withoutStopwords = removeStopwords(tokens);
      
      setIsTyping(true);
      return await mockBotResponse(message);
    },
    onSuccess: (response) => {
      setTimeout(() => {
        const sentiment = analyzeSentiment(response);
        setMessages(prev => [...prev, { 
          text: response, 
          isBot: true, 
          sentiment,
          timestamp: new Date()
        }]);
        setIsTyping(false);
      }, 500);
    },
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { 
      text: input, 
      isBot: false,
      timestamp: new Date()
    }]);
    sendMessageMutation.mutate(input);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearMessages = () => {
    setMessages([
      { 
        text: "Hi there! I'm Eliza, your personal therapy assistant. How are you feeling today? I'm here to listen and help in any way I can.", 
        isBot: true,
        timestamp: new Date()
      }
    ]);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f7fafd]">
      <Header />
      
      <main className="flex-1 container-wrapper py-4 md:py-8 flex flex-col">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6"
        >
          <div className="flex items-center mb-2 md:mb-0">
            <div className="bg-blue-50 p-2 rounded-lg mr-3">
              <Bot className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-left">
              <h1 className="text-xl font-medium text-gray-800">Chat with Eliza</h1>
              <p className="text-sm text-gray-500">Your personal therapy assistant</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearMessages}
              className="text-xs flex items-center gap-1 text-gray-600 border-gray-200 hover:bg-gray-100"
            >
              <Trash className="h-3.5 w-3.5" />
              <span>Clear Chat</span>
            </Button>
          </div>
        </motion.div>
        
        <div className="chat-interface flex flex-col flex-1">
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="chat-message-container flex-1 overflow-y-auto p-4 md:p-6">
                <div className="space-y-4 md:space-y-6">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                      <div className={`flex items-start gap-2 max-w-[85%]`}>
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.isBot ? 'bg-blue-100 text-blue-500' : 'bg-blue-500 text-white'}`}>
                          {msg.isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                        </div>
                        <div className="flex-1">
                          <div className="mb-1 text-xs text-gray-500">
                            {msg.isBot ? 'Eliza' : 'You'} • {msg.timestamp && formatTime(msg.timestamp)}
                          </div>
                          <ChatMessage message={msg.text} isBot={msg.isBot} sentiment={msg.sentiment} />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-start gap-2 max-w-[85%]">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-500">
                          <Bot className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="mb-1 text-xs text-gray-500">
                            Eliza • {formatTime(new Date())}
                          </div>
                          <div className="px-4 py-3 bg-blue-50 rounded-lg text-sm">
                            <div className="flex space-x-2">
                              <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"></div>
                              <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              <div className="chat-input-wrapper p-4">
                <div className="chat-input-container border border-blue-100 rounded-lg overflow-hidden shadow-sm transition-all">
                  {isMobile ? (
                    <div className="flex">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Message Eliza..."
                        className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                      <Button onClick={handleSendMessage} size="icon" className="rounded-none bg-blue-500 hover:bg-blue-600">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <Textarea 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Message Eliza..."
                        className="flex-1 min-h-[60px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        rows={2}
                      />
                      <div className="flex justify-between items-center p-2 bg-blue-50/50 border-t border-blue-100">
                        <div className="text-xs text-gray-500">Press Enter to send, Shift+Enter for new line</div>
                        <Button onClick={handleSendMessage} size="sm" className="bg-blue-500 hover:bg-blue-600 transition-colors">
                          <Send className="h-3.5 w-3.5 mr-1" />
                          Send
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <footer className="mt-8 py-6 border-t border-blue-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-500 mb-4 md:mb-0">
                <p>© 2025 Research Studio. All rights reserved.</p>
                <p>Created by Sakthi Behan</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-sm text-gray-500 mb-1">Contact Us:</p>
                <p className="text-sm text-gray-600">Email: behan3226@gmail.com</p>
                <p className="text-sm text-gray-600">Phone: +91 6385699037</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400">
                Built with
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default ChatBot;
