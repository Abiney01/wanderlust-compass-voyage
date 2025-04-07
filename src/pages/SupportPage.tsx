
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layout/Dashboard";
import { MessageSquare, FileText, HelpCircle, Mail } from "lucide-react";
import { ContactForm } from "@/components/support/ContactForm";
import { useNavigate } from "react-router-dom";

const SupportPage = () => {
  const navigate = useNavigate();
  
  const faqItems = [
    {
      question: "How do I cancel a booking?",
      answer: "You can cancel your booking by going to 'My Trips' section in your account dashboard and selecting the booking you wish to cancel. Click on 'Cancel Booking' and follow the instructions. Please note that cancellation policies vary for different accommodations."
    },
    {
      question: "When will I receive my booking confirmation?",
      answer: "You should receive your booking confirmation via email immediately after completing your booking. If you haven't received it, please check your spam or junk folder. You can also view all your booking details in the 'My Trips' section."
    },
    {
      question: "How can I change my reservation dates?",
      answer: "To change your reservation dates, go to 'My Trips' in your account, select the booking you want to modify, and click 'Change Dates'. Availability and any price differences will be displayed before you confirm the changes."
    },
    {
      question: "Do you offer refunds for weather-related cancellations?",
      answer: "Refunds for weather-related issues depend on the specific circumstances and the property's cancellation policy. We recommend purchasing travel insurance to cover unexpected situations. Contact our customer support for assistance with weather-related concerns."
    }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 dark:text-white">Help & Support</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2 dark:text-white">Live Chat Support</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">Chat with our support team in real-time for immediate assistance.</p>
            <Button onClick={() => navigate('/message')}>Start Chat</Button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2 dark:text-white">Email Support</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">Send us an email and we'll get back to you within 24 hours.</p>
            <Button variant="outline" onClick={() => document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' })}>
              Contact Us
            </Button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2 dark:text-white">Knowledge Base</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">Browse through our FAQs and help articles for quick solutions.</p>
            <Button variant="outline" onClick={() => document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' })}>
              View FAQs
            </Button>
          </div>
        </div>
        
        <div id="faq-section" className="mb-16">
          <div className="flex items-center mb-6">
            <HelpCircle className="h-6 w-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold dark:text-white">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-3 dark:text-white">{item.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div id="contact-form-section" className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-sm">
          <div className="flex items-center mb-6">
            <Mail className="h-6 w-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold dark:text-white">Contact Us</h2>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Can't find what you're looking for? Send us a message and our support team will get back to you as soon as possible.
          </p>
          
          <ContactForm />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SupportPage;
