
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/Dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger
} from "@/components/ui/accordion";
import { 
  HelpCircle, 
  PhoneCall, 
  Mail, 
  MessageSquare,
  Clock,
  Check
} from "lucide-react";
import { toast } from "sonner";

const faqs = [
  {
    question: "How do I cancel my booking?",
    answer: "You can cancel your booking by going to 'My Bookings' section in your account dashboard. Select the booking you wish to cancel and click on the 'Cancel Booking' button. Please note that cancellation policies vary depending on the property and the time of cancellation."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards including Visa, MasterCard, and American Express. We also accept PayPal, Apple Pay, and Google Pay for secure and convenient transactions."
  },
  {
    question: "How can I change the dates of my reservation?",
    answer: "To change your reservation dates, go to 'My Bookings' in your account, select the booking you want to modify, and click 'Change Dates'. Availability and any price differences will be displayed before you confirm the changes."
  },
  {
    question: "Do you offer travel insurance?",
    answer: "Yes, we offer comprehensive travel insurance through our partners. You can add insurance during the booking process or add it to an existing booking by contacting our customer support team."
  },
  {
    question: "How do I get a receipt for my booking?",
    answer: "You can download or print a receipt for any booking by going to 'My Bookings' in your account dashboard, selecting the relevant booking, and clicking on 'Download Receipt' or 'Print Receipt'."
  }
];

const SupportPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your message has been sent!", {
      description: "We'll get back to you as soon as possible."
    });
    // Reset form
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Customer Support</h1>
          <p className="text-gray-500">Get help with your bookings and trips.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-500 mb-4">
              <PhoneCall size={24} />
            </div>
            <h3 className="font-semibold text-lg mb-2">Call Us</h3>
            <p className="text-gray-500 mb-4">Available 24/7 for urgent assistance</p>
            <Button variant="outline" className="w-full hover:bg-blue-50 transition-colors">
              +1 (800) 123-4567
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-500 mb-4">
              <Mail size={24} />
            </div>
            <h3 className="font-semibold text-lg mb-2">Email Support</h3>
            <p className="text-gray-500 mb-4">Get a response within 24 hours</p>
            <Button variant="outline" className="w-full hover:bg-blue-50 transition-colors">
              support@voyagevista.com
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-500 mb-4">
              <MessageSquare size={24} />
            </div>
            <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
            <p className="text-gray-500 mb-4">Instant assistance from our team</p>
            <Button className="w-full">Start Chat</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <HelpCircle className="mr-2" size={20} />
              Frequently Asked Questions
            </h2>
            
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="animate-fade-in">
                  <AccordionTrigger className="text-left hover:text-blue-600 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Contact Us</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Name</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Subject</label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="How can we help?"
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Message</label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please describe your issue or question"
                  rows={5}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full transition-transform hover:scale-105"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="font-semibold text-lg mb-4">Our Support Hours</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Clock className="mr-2 text-blue-500" size={20} />
              <div>
                <p className="font-medium">Monday to Friday</p>
                <p className="text-sm text-gray-600">9:00 AM - 8:00 PM EST</p>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 text-blue-500" size={20} />
              <div>
                <p className="font-medium">Weekends & Holidays</p>
                <p className="text-sm text-gray-600">10:00 AM - 6:00 PM EST</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-start">
            <Check className="mr-2 text-green-500 mt-1 flex-shrink-0" size={20} />
            <p className="text-sm text-gray-600">
              Emergency support is available 24/7 for travelers with active bookings.
              Please call our emergency line: +1 (800) 999-8888.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SupportPage;
