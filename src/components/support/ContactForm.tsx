
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail } from "lucide-react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending email
    setTimeout(() => {
      // In a real application, you would send the message to your backend
      console.log("Sending message:", { name, email, subject, message });
      toast.success("Your message has been sent successfully. We'll get back to you soon!");
      
      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium dark:text-gray-300">
            Your Name
          </label>
          <Input 
            id="name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="John Doe"
            className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium dark:text-gray-300">
            Email Address
          </label>
          <Input 
            id="email" 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="john@example.com"
            className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium dark:text-gray-300">
          Subject
        </label>
        <Input 
          id="subject" 
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          placeholder="Booking Inquiry"
          className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium dark:text-gray-300">
          Your Message
        </label>
        <Textarea 
          id="message" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="Please describe your inquiry in detail..."
          rows={6}
          className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={isSubmitting} 
        className="w-full md:w-auto flex items-center gap-2"
      >
        <Mail size={18} />
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
