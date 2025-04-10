
// Support bot responses for common travel-related questions
export const botResponses = {
  // General travel questions
  "what destinations do you recommend": "Based on your interests, I'd recommend destinations like Bali for beaches, Paris for culture, Japan for a mix of tradition and modernity, or Iceland for natural wonders. Would you like more specific recommendations based on your travel style?",
  
  "best time to book flights": "For the best deals, booking flights 3-4 months in advance for international trips and 1-3 months for domestic trips usually offers optimal prices. Tuesdays and Wednesdays are often the cheapest days to fly, and booking on Tuesdays can sometimes yield lower prices. Would you like more booking tips?",
  
  "travel insurance": "I highly recommend getting travel insurance for all trips. Look for policies that cover medical emergencies, trip cancellations, lost luggage, and flight delays. The cost is typically 4-10% of your total trip cost but can save you thousands in case of unexpected events.",
  
  "cancel booking": "I understand you want to cancel your booking. Please note that our cancellation policy allows full refunds if canceled 7 days or more before the departure date. A 50% refund is available for cancellations 3-7 days before departure. Would you like me to help you with the cancellation process?",
  
  "covid travel restrictions": "Travel restrictions continue to change frequently. I recommend checking the official website of your destination country's embassy or consulate for the most up-to-date entry requirements, which may include vaccination proof, testing, or quarantine requirements. Would you like me to help you find specific information?",
  
  "lost luggage": "I'm sorry to hear about your luggage situation. Please contact your airline immediately and file a Property Irregularity Report. Keep all your boarding passes and baggage claim tags. Most airlines will deliver found luggage to your accommodation. Would you like guidance on filing a claim?",
  
  "visa requirements": "Visa requirements depend on your nationality and destination. Some countries offer visa-free travel, while others require applying in advance. I recommend checking the embassy website of your destination country at least 2-3 months before traveling. Would you like help finding specific visa information?",
  
  "best places to visit": "Some of the world's top destinations include Paris for its art and cuisine, Tokyo for its unique blend of tradition and technology, New York for its energy and diversity, and Rome for its history and architecture. What type of experience are you looking for on your next trip?",
  
  "family-friendly destinations": "Great family destinations include Orlando for theme parks, Costa Rica for eco-adventures, Barcelona for beaches and culture, and London for its mix of history and entertainment. These places offer activities for all ages and have good family accommodation options. Would you like more specific recommendations?",
  
  "budget travel tips": "To travel on a budget, consider visiting during shoulder seasons (just before or after peak season), staying in accommodations with kitchens to save on meals, using public transportation, and looking for free activities and attractions. Would you like more specific budget tips?",
  
  "packing essentials": "Essential items for any trip include: adaptable clothing layers, comfortable walking shoes, necessary medications, universal adapter, basic toiletries, important documents (passport, insurance), and a first-aid kit. Would you like a more detailed packing list for a specific destination?",
  
  // Booking process questions
  "how to change my booking": "To modify your existing booking, please go to the 'My Trips' section, select the booking you want to change, and click on the 'Modify Booking' option. Changes may incur fees depending on your original booking conditions. Would you like assistance with a specific change?",
  
  "payment methods": "We accept all major credit and debit cards including Visa, Mastercard, American Express, and Discover. We also support PayPal and Apple Pay for added convenience and security. All payments are processed through secure encrypted connections.",
  
  "group bookings": "For groups of 10 or more travelers, we offer special rates and services. Please contact our group specialist at groups@voyagevista.com with your requirements including dates, destination, and group size for a customized quote.",
  
  "special requests": "We're happy to accommodate special requests such as room preferences, dietary requirements, or accessibility needs. Please add your requests during the booking process or contact our customer service team, and we'll do our best to fulfill them based on availability.",
  
  "loyalty program": "Our Voyager Rewards program lets you earn points on every booking which can be redeemed for discounts on future trips. You also get benefits like priority check-in, late check-out, and exclusive promotions. Would you like to join or learn more about the membership levels?",
  
  // Customer service questions
  "contact customer service": "You can reach our customer service team 24/7 via email at help@voyagevista.com, by phone at 1-800-VOYAGE-1, or through live chat on our website. For urgent matters related to current trips, please use our emergency line: 1-800-VOYAGE-911.",
  
  "refund policy": "Refunds are processed based on your booking terms and conditions. Generally, cancellations made 30+ days before arrival receive a full refund minus processing fees. Cancellations 14-30 days before arrival receive a 50% refund. Would you like me to check the specific policy for your booking?",
  
  "missing confirmation": "If you haven't received your booking confirmation, please check your spam folder first. If you still can't locate it, verify the email address you provided during booking. You can also find your booking details by logging into your account under 'My Trips'.",
  
  // App-specific questions
  "how to use app": "To use Voyage Vista, start by searching for your desired destination in the search bar. Browse available options, select your preferred accommodation or experience, and follow the booking process. You can manage all your bookings in the 'My Trips' section. Would you like a walkthrough of any specific feature?",
  
  "app features": "Our app offers destination search with filters, secure booking for accommodations and experiences, trip management tools, interactive maps, offline access to booking details, real-time notifications, and a 24/7 support chat. Which feature would you like to know more about?",
  
  "account settings": "To access your account settings, click on the 'Settings' option in the sidebar menu. Here you can update your profile information, change your password, set notification preferences, manage payment methods, and adjust display preferences including dark mode.",
  
  // Fallback responses
  "default": "I'm here to help with your travel questions and booking needs. Please let me know what specific information you're looking for, and I'll assist you right away.",
  
  "not understood": "I'm not sure I understood your question. Could you rephrase it or provide more details so I can better assist you with your travel needs?",
  
  "more information": "To provide you with the most accurate information, could you please share more details about your specific requirements or questions?"
};

// Function to find the best matching response
export const findBestResponse = (query: string): string => {
  if (!query) return botResponses.default;
  
  query = query.toLowerCase();
  
  // Direct matches
  for (const [key, response] of Object.entries(botResponses)) {
    if (query.includes(key)) {
      return response;
    }
  }
  
  // Keyword matching
  if (query.includes("book") || query.includes("reservation")) {
    return botResponses["how to use app"];
  }
  
  if (query.includes("change") || query.includes("modify")) {
    return botResponses["how to change my booking"];
  }
  
  if (query.includes("recommend") || query.includes("suggest") || query.includes("where")) {
    return botResponses["what destinations do you recommend"];
  }
  
  if (query.includes("covid") || query.includes("restriction") || query.includes("test")) {
    return botResponses["covid travel restrictions"];
  }
  
  if (query.includes("cancel")) {
    return botResponses["cancel booking"];
  }
  
  if (query.includes("refund") || query.includes("money back")) {
    return botResponses["refund policy"];
  }
  
  if (query.includes("contact") || query.includes("help") || query.includes("support")) {
    return botResponses["contact customer service"];
  }
  
  // Fallback
  return botResponses.not understood;
};
