
import { toast } from 'sonner';

// OpenCage API configuration
const API_KEY = 'YOUR_OPENCAGE_API_KEY'; // Replace with your OpenCage API key
const BASE_URL = 'https://api.opencagedata.com/geocode/v1/json';

export interface PlaceResult {
  id: string;
  name: string;
  location: string;
  type: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  country?: string;
  formatted?: string;
  description?: string;
  annotations?: any;
  timezone?: string;
  flag?: string;
  components?: any;
}

// Fallback images for different place types
const fallbackImages: Record<string, string[]> = {
  City: [
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df",
    "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b"
  ],
  Beach: [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1519046904884-53103b34b206"
  ],
  Mountain: [
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99"
  ],
  Cultural: [
    "https://images.unsplash.com/photo-1577334935026-721cdf91c7af",
    "https://images.unsplash.com/photo-1590352561841-41e70583d6c4"
  ],
  Historical: [
    "https://images.unsplash.com/photo-1578128178799-ffdd2e56ed5d",
    "https://images.unsplash.com/photo-1555881400-74d7acaacd8b"
  ],
  Nature: [
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e"
  ],
  Default: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    "https://images.unsplash.com/photo-1526772662000-3f88f10405ff"
  ]
};

// Function to get a random fallback image based on place type
const getFallbackImage = (placeType: string) => {
  const type = Object.keys(fallbackImages).find(key => 
    placeType.toLowerCase().includes(key.toLowerCase())
  ) || 'Default';
  
  const images = fallbackImages[type];
  return images[Math.floor(Math.random() * images.length)];
};

// Determine place type based on OpenCage components and category
const determinePlaceType = (components: any): string => {
  if (components._category === 'natural' || components.natural) return 'Nature';
  if (components._category === 'historic' || components.historic) return 'Historical';
  if (components.beach) return 'Beach';
  if (components.mountain || components.peak) return 'Mountain';
  if (components.tourism || components.attraction) return 'Cultural';
  if (components.city || components.town || components.village) return 'City';
  return 'Destination';
};

// Search for places using OpenCage API
export const searchPlaces = async (query: string): Promise<PlaceResult[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${encodeURIComponent(query)}&key=${API_KEY}&limit=10&no_annotations=0`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch places data');
    }
    
    const data = await response.json();
    
    if (data.results.length === 0) {
      return [];
    }
    
    // Map API results to our PlaceResult interface
    return data.results.map((result: any, index: number) => {
      const components = result.components;
      const placeType = determinePlaceType(components);
      
      const name = components.attraction || 
                   components.tourism || 
                   components.city || 
                   components.town || 
                   components.village || 
                   components.state ||
                   query;
      
      const location = `${components.country || ''}`;
      
      return {
        id: `place-${index}-${Date.now()}`,
        name,
        location,
        coordinates: {
          lat: result.geometry.lat,
          lng: result.geometry.lng,
        },
        type: placeType,
        country: components.country,
        formatted: result.formatted,
        description: `Explore ${name} in ${components.country || 'the world'}!`,
        annotations: result.annotations,
        timezone: result.annotations?.timezone?.name || '',
        flag: result.annotations?.flag || '',
        components
      };
    });
  } catch (error) {
    console.error('Error searching places:', error);
    toast.error('Failed to search places. Please try again.');
    return [];
  }
};

// Get detailed information about a specific place
export const getPlaceDetails = async (placeId: string, placeName: string): Promise<PlaceResult | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${encodeURIComponent(placeName)}&key=${API_KEY}&no_annotations=0`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch place details');
    }
    
    const data = await response.json();
    
    if (data.results.length === 0) {
      return null;
    }
    
    // Get the first result as the place details
    const result = data.results[0];
    const components = result.components;
    const placeType = determinePlaceType(components);
    
    const name = components.attraction || 
                 components.tourism || 
                 components.city || 
                 components.town || 
                 components.village || 
                 components.state ||
                 placeName;
    
    const location = `${components.country || ''}`;
    
    return {
      id: placeId,
      name,
      location,
      coordinates: {
        lat: result.geometry.lat,
        lng: result.geometry.lng,
      },
      type: placeType,
      country: components.country,
      formatted: result.formatted,
      description: `Explore ${name} in ${components.country || 'the world'}!`,
      annotations: result.annotations,
      timezone: result.annotations?.timezone?.name || '',
      flag: result.annotations?.flag || '',
      components
    };
  } catch (error) {
    console.error('Error getting place details:', error);
    toast.error('Failed to get place details. Please try again.');
    return null;
  }
};

// Get place images
export const getPlaceImages = (place: PlaceResult): { image: string, fallbackImage: string } => {
  // In a real app, you'd use a photo API like Unsplash, Pexels, or Google Places
  // For now, we'll use fallback images based on place type
  const fallbackImage = getFallbackImage(place.type);
  
  return {
    image: `${fallbackImage}?auto=format&fit=crop&w=600&h=350&q=80`,
    fallbackImage: `${fallbackImage}?auto=format&fit=crop&w=600&h=350&q=60`,
  };
};
