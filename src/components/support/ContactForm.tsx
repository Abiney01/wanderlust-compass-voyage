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

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", message);

    try {
      const response = await fetch("https://formspree.io/f/xzzzybrg", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        toast.success("Your message has been sent successfully. We'll get back to you soon!");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } catch (error) {
      toast.error("Failed to send message. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
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
            name="name"
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
            name="email"
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
          name="subject"
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
          name="message"
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
