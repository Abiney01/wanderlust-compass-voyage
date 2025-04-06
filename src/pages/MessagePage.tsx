
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/Dashboard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, MoreVertical } from "lucide-react";

interface Message {
  id: number;
  senderId: number;
  text: string;
  timestamp: string;
}

interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  messages: Message[];
}

const contacts: Contact[] = [
  {
    id: 1,
    name: "Sarah Wilson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    lastMessage: "Looking forward to my trip!",
    timestamp: "09:30 AM",
    unread: 2,
    messages: [
      { id: 1, senderId: 1, text: "Hi there! I have a question about my booking.", timestamp: "09:15 AM" },
      { id: 2, senderId: 0, text: "Hello Sarah! How can I help you today?", timestamp: "09:20 AM" },
      { id: 3, senderId: 1, text: "I was wondering if I could change the date of my reservation.", timestamp: "09:25 AM" },
      { id: 4, senderId: 1, text: "Looking forward to my trip!", timestamp: "09:30 AM" },
    ]
  },
  {
    id: 2,
    name: "Mike Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    lastMessage: "Thanks for the information!",
    timestamp: "Yesterday",
    unread: 0,
    messages: [
      { id: 1, senderId: 2, text: "Hello, I need some information about the Bali tour package.", timestamp: "Yesterday" },
      { id: 2, senderId: 0, text: "Hi Mike! I'd be happy to help with the Bali tour. What would you like to know?", timestamp: "Yesterday" },
      { id: 3, senderId: 2, text: "Thanks for the information!", timestamp: "Yesterday" },
    ]
  },
  {
    id: 3,
    name: "Emma Davis",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    lastMessage: "Can I get a refund for my canceled flight?",
    timestamp: "Aug 25",
    unread: 1,
    messages: [
      { id: 1, senderId: 3, text: "Hi, I had to cancel my flight due to an emergency.", timestamp: "Aug 25" },
      { id: 2, senderId: 0, text: "I'm sorry to hear that, Emma. Let me check the refund policy for you.", timestamp: "Aug 25" },
      { id: 3, senderId: 3, text: "Can I get a refund for my canceled flight?", timestamp: "Aug 25" },
    ]
  },
];

const MessagePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [activeContacts, setActiveContacts] = useState<Contact[]>(contacts);
  
  const filteredContacts = activeContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;
    
    const updatedMessage: Message = {
      id: selectedContact.messages.length + 1,
      senderId: 0, // Current user
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    // Update contacts with new message
    const updatedContacts = activeContacts.map(contact => {
      if (contact.id === selectedContact.id) {
        return {
          ...contact,
          lastMessage: newMessage,
          timestamp: updatedMessage.timestamp,
          unread: contact.unread,
          messages: [...contact.messages, updatedMessage]
        };
      }
      return contact;
    });
    
    setActiveContacts(updatedContacts);
    setSelectedContact({
      ...selectedContact,
      lastMessage: newMessage,
      timestamp: updatedMessage.timestamp,
      messages: [...selectedContact.messages, updatedMessage]
    });
    setNewMessage("");
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-140px)] bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Contacts sidebar */}
        <div className="w-full md:w-80 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                className="pl-10"
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {filteredContacts.map(contact => (
              <div 
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${
                  selectedContact?.id === contact.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={contact.avatar} alt={contact.name} />
                      <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {contact.unread > 0 && (
                      <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                  <div className="ml-3 flex-1 overflow-hidden">
                    <div className="flex justify-between">
                      <h3 className="font-medium truncate">{contact.name}</h3>
                      <span className="text-xs text-gray-500">{contact.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat area */}
        {selectedContact ? (
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                  <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <h3 className="font-medium">{selectedContact.name}</h3>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical size={20} />
              </Button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {selectedContact.messages.map(message => (
                <div 
                  key={message.id}
                  className={`flex ${message.senderId === 0 ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.senderId === 0 
                        ? 'bg-blue-500 text-white rounded-br-none' 
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p>{message.text}</p>
                    <span className={`text-xs mt-1 block ${message.senderId === 0 ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-end">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 max-h-32 resize-none focus-visible:ring-blue-500"
                  rows={1}
                />
                <Button 
                  className="ml-2 rounded-full h-10 w-10 p-0 flex items-center justify-center bg-blue-500 hover:bg-blue-600 transition-colors disabled:opacity-50"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-gray-500">
            <div className="bg-blue-50 p-6 rounded-full mb-4">
              <Send size={32} className="text-blue-500" />
            </div>
            <h3 className="font-medium text-lg text-gray-700">Your Messages</h3>
            <p className="mt-2 max-w-xs">
              Select a conversation to start messaging
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MessagePage;
