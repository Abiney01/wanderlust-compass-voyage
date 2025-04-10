
import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { findBestResponse } from "./BotResponses";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "👋 Hi there! I'm your Voyage Vista support assistant. How can I help you today?",
    sender: "bot",
    timestamp: new Date(),
  }
];

const suggestedQuestions = [
  "What are the best destinations to visit?",
  "How do I change my booking?",
  "What's your cancellation policy?",
  "Do you offer group discounts?",
  "What payment methods do you accept?",
  "How do I contact customer service?"
];

export function SupportBot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    
    // Simulate bot typing and responding
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: findBestResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };
  
  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };
  
  return (
    <div className="flex flex-col h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b dark:border-gray-700 bg-blue-50 dark:bg-gray-800 flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 bg-blue-600 mr-2">
            <Bot className="h-5 w-5 text-white" />
          </Avatar>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">Support Assistant</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Online | 24/7 Support</p>
          </div>
        </div>
      </div>
      
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "bot" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`flex max-w-[80%] ${
                  message.sender === "bot"
                    ? "flex-row"
                    : "flex-row-reverse"
                }`}
              >
                <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center">
                  {message.sender === "bot" ? (
                    <Avatar className="h-8 w-8 bg-blue-600">
                      <Bot className="h-5 w-5 text-white" />
                    </Avatar>
                  ) : (
                    <Avatar className="h-8 w-8 bg-green-600">
                      <User className="h-5 w-5 text-white" />
                    </Avatar>
                  )}
                </div>
                <div
                  className={`mx-2 p-3 rounded-lg ${
                    message.sender === "bot"
                      ? "bg-blue-100 dark:bg-blue-900 text-gray-800 dark:text-white"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex max-w-[80%] flex-row">
                <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center">
                  <Avatar className="h-8 w-8 bg-blue-600">
                    <Bot className="h-5 w-5 text-white" />
                  </Avatar>
                </div>
                <div className="mx-2 p-3 rounded-lg bg-blue-100 dark:bg-blue-900">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-gray-500 dark:bg-gray-300 rounded-full animate-bounce" />
                    <div className="h-2 w-2 bg-gray-500 dark:bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="h-2 w-2 bg-gray-500 dark:bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="p-2 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="mb-2 flex flex-wrap gap-2">
          {suggestedQuestions.map((question) => (
            <Button
              key={question}
              variant="outline"
              size="sm"
              className="text-xs py-1 px-2 h-auto bg-white dark:bg-gray-700 whitespace-nowrap"
              onClick={() => handleSuggestedQuestion(question)}
            >
              {question}
            </Button>
          ))}
        </div>
        
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow dark:bg-gray-700"
            disabled={isTyping}
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!inputValue.trim() || isTyping}
          >
            {isTyping ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
