export interface User {
  uid: string;
  name?: string;
  email?: string;
  phone?: string;
  photoURL?: string;
  address?: string; // Could be a more complex object
  orderIds?: string[];
}

export interface Business {
  id: string;
  name: string;
  logoURL: string;
  coverImageURL?: string;
  type: 'restaurant' | 'grocery';
  rating: number; // e.g., 4.5
  priceLevel?: 1 | 2 | 3 | 4; // e.g., $ $$ $$$ $$$$
  pickupEta?: string; // e.g., "15-25 min"
  location?: { lat: number; lng: number; address: string }; // Simplified for now
  categories?: string[]; // e.g., ["Italian", "Pizza"] or ["Produce", "Bakery"]
  offerIds?: string[];
  description?: string;
  reviews?: Review[];
}

export interface Item {
  id: string;
  businessId: string;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  imageURL: string;
  tags?: string[]; // e.g., ["Popular", "New", "Vegetarian"]
  quantityAvailable?: number;
  pickupTimeRange?: { start: string; end: string }; // e.g., "4:00 PM - 6:00 PM"
  isFeatured?: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: Array<{ itemId: string; title: string; quantity: number, price: number }>;
  businessId: string;
  businessName: string;
  totalAmount: number;
  pickupTime: string; // Could be specific time or a range
  status: 'pending' | 'confirmed' | 'ready_for_pickup' | 'completed' | 'cancelled';
  orderDate: string; // ISO string
}

export interface Category {
  id: string;
  name: string;
  icon?: React.ElementType; // Lucide icon component
  imageURL?: string; // For visual representation
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userPhotoURL?: string;
  rating: number;
  comment: string;
  date: string; // ISO string
}
