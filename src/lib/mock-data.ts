
import type { Business, Item, Order, Category, Review, User } from '@/types';
import { Apple, Archive, Milk, Drumstick, Sandwich, Wheat, Carrot, ShoppingCart, Utensils } from 'lucide-react';

const assetImagePaths = Array.from({ length: 19 }, (_, i) => `/assets/im${i + 1}.jpg`);
let currentImageIndex = 0;
const getDeterministicNextImage = () => {
  const imagePath = assetImagePaths[currentImageIndex % assetImagePaths.length];
  currentImageIndex++;
  return imagePath;
};

export const mockUsers: User[] = [
  {
    uid: 'user1',
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    photoURL: getDeterministicNextImage(),
    address: '123 Green St, Foodville',
  }
];

export const mockReviews: Review[] = [
  { id: 'review1', userId: 'user1', userName: 'Alex D.', rating: 5, comment: 'Great deals and fresh food!', date: new Date(Date.now() - 86400000 * 2).toISOString(), userPhotoURL: getDeterministicNextImage() },
  { id: 'review2', userId: 'user2', userName: 'Sarah P.', rating: 4, comment: 'Good selection, friendly staff.', date: new Date(Date.now() - 86400000 * 5).toISOString(), userPhotoURL: getDeterministicNextImage() },
];

export const mockItems: Item[] = [
  {
    id: 'item1',
    businessId: 'biz1',
    title: 'Surplus Veggie Box',
    description: 'A mix of fresh, seasonal vegetables nearing their best-before date. Perfect for stews or roasting.',
    originalPrice: 15.00,
    discountedPrice: 7.50,
    imageURL: getDeterministicNextImage(),
    dataAiHint: 'vegetables box',
    tags: ['Popular', 'Healthy'],
    quantityAvailable: 5,
    pickupTimeRange: { start: '4:00 PM', end: '6:00 PM' },
    isFeatured: true,
  },
  {
    id: 'item2',
    businessId: 'biz1',
    title: 'Day-Old Artisan Bread Loaf',
    description: 'Delicious sourdough bread, baked yesterday. Still great for toast or sandwiches.',
    originalPrice: 6.00,
    discountedPrice: 2.50,
    imageURL: getDeterministicNextImage(),
    dataAiHint: 'artisan bread',
    tags: ['Bakery', 'New'],
    quantityAvailable: 10,
  },
  {
    id: 'item3',
    businessId: 'biz2',
    title: 'Chef\'s Special Pasta Leftovers',
    description: 'Generous portion of our daily pasta special. Changes daily.',
    originalPrice: 18.00,
    discountedPrice: 9.00,
    imageURL: getDeterministicNextImage(),
    dataAiHint: 'pasta dish',
    tags: ['Restaurant Meal', 'Comfort Food'],
    pickupTimeRange: { start: '7:00 PM', end: '8:00 PM' },
  },
  {
    id: 'item4',
    businessId: 'biz3',
    title: 'Mixed Fruit Bag',
    description: 'A selection of fruits that are ripe and ready to eat.',
    originalPrice: 10.00,
    discountedPrice: 4.00,
    imageURL: getDeterministicNextImage(),
    dataAiHint: 'fruit bag',
    tags: ['Healthy', 'Snack'],
    isFeatured: true,
  },
  {
    id: 'item5',
    businessId: 'biz2',
    title: 'End-of-Day Salad Mix',
    description: 'Freshly prepared salad components, ready to be mixed.',
    originalPrice: 12.00,
    discountedPrice: 5.00,
    imageURL: getDeterministicNextImage(),
    dataAiHint: 'salad mix',
    tags: ['Healthy', 'Quick Meal'],
  },
];

export const mockBusinesses: Business[] = [
  {
    id: 'biz1',
    name: 'Green Grocer Market',
    logoURL: getDeterministicNextImage(),
    coverImageURL: getDeterministicNextImage(),
    dataAiHint: 'grocery storefront',
    type: 'grocery',
    rating: 4.5,
    priceLevel: 2,
    pickupEta: '10-20 min',
    location: { lat: 0, lng: 0, address: '123 Green St, Foodville' },
    categories: ['Fresh Produce', 'Bakery', 'Pantry Staples'],
    offerIds: ['item1', 'item2'],
    description: 'Your friendly local market with a commitment to reducing waste and offering fresh, affordable food.',
    reviews: [mockReviews[0]],
  },
  {
    id: 'biz2',
    name: 'Luigi\'s Italian Kitchen',
    logoURL: getDeterministicNextImage(),
    coverImageURL: getDeterministicNextImage(),
    dataAiHint: 'restaurant interior',
    type: 'restaurant',
    rating: 4.8,
    priceLevel: 3,
    pickupEta: '20-30 min',
    location: { lat: 0, lng: 0, address: '456 Pasta Ln, Foodville' },
    categories: ['Italian', 'Pasta', 'Pizza'],
    offerIds: ['item3', 'item5'],
    description: 'Authentic Italian cuisine. We offer our delicious surplus meals at the end of the day to prevent waste.',
    reviews: [mockReviews[1]],
  },
  {
    id: 'biz3',
    name: 'The Corner Store',
    logoURL: getDeterministicNextImage(),
    coverImageURL: getDeterministicNextImage(),
    dataAiHint: 'convenience store',
    type: 'grocery',
    rating: 4.2,
    priceLevel: 1,
    pickupEta: '5-10 min',
    location: { lat: 0, lng: 0, address: '789 Snack Ave, Foodville' },
    categories: ['Snacks', 'Drinks', 'Quick Bites'],
    offerIds: ['item4'],
    description: 'Quick and easy groceries. We always have great deals on items nearing their sell-by date.',
  },
];

export const mockOrders: Order[] = [
  {
    id: 'order1',
    userId: 'user1',
    items: [
      { itemId: 'item1', title: 'Surplus Veggie Box', quantity: 1, price: 7.50 },
      { itemId: 'item2', title: 'Day-Old Artisan Bread Loaf', quantity: 2, price: 2.50 },
    ],
    businessId: 'biz1',
    businessName: 'Green Grocer Market',
    totalAmount: 12.50,
    pickupTime: 'Today, 5:00 PM - 5:30 PM',
    status: 'ready_for_pickup',
    orderDate: new Date().toISOString(),
  },
  {
    id: 'order2',
    userId: 'user1',
    items: [{ itemId: 'item3', title: "Chef's Special Pasta Leftovers", quantity: 1, price: 9.00 }],
    businessId: 'biz2',
    businessName: 'Luigi\'s Italian Kitchen',
    totalAmount: 9.00,
    pickupTime: 'Yesterday, 7:15 PM',
    status: 'completed',
    orderDate: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: 'order3',
    userId: 'user1',
    items: [{ itemId: 'item4', title: "Mixed Fruit Bag", quantity: 1, price: 4.00 }],
    businessId: 'biz3',
    businessName: 'The Corner Store',
    totalAmount: 4.00,
    pickupTime: '3 days ago, 2:30 PM',
    status: 'completed',
    orderDate: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
  },
];


export const mockGroceryCategories: Category[] = [
  { id: 'cat1', name: 'Fresh Produce', icon: Carrot, imageURL: getDeterministicNextImage(), dataAiHint: 'fresh vegetables' },
  { id: 'cat2', name: 'Pantry Staples', icon: Archive, imageURL: getDeterministicNextImage(), dataAiHint: 'pantry items' },
  { id: 'cat3', name: 'Dairy & Alternatives', icon: Milk, imageURL: getDeterministicNextImage(), dataAiHint: 'dairy products' },
  { id: 'cat4', name: 'Meat & Seafood', icon: Drumstick, imageURL: getDeterministicNextImage(), dataAiHint: 'fresh meat' },
  { id: 'cat5', name: 'Bakery', icon: Sandwich, imageURL: getDeterministicNextImage(), dataAiHint: 'bakery goods' },
  { id: 'cat6', name: 'Ready Meals', icon: Utensils, imageURL: getDeterministicNextImage(), dataAiHint: 'ready meal' },
];

export const mockRestaurantCategories: Category[] = [
  { id: 'rcat1', name: 'Italian', icon: Utensils, imageURL: getDeterministicNextImage(), dataAiHint: 'italian food' },
  { id: 'rcat2', name: 'Mexican', icon: Utensils, imageURL: getDeterministicNextImage(), dataAiHint: 'mexican food' },
  { id: 'rcat3', name: 'Asian', icon: Utensils, imageURL: getDeterministicNextImage(), dataAiHint: 'asian food' },
  { id: 'rcat4', name: 'Cafe', icon: Utensils, imageURL: getDeterministicNextImage(), dataAiHint: 'cafe coffee' },
];


export const getBusinessById = (id: string): Business | undefined => mockBusinesses.find(b => b.id === id);
export const getItemsByIds = (ids: string[]): Item[] => mockItems.filter(item => ids.includes(item.id));
export const getItemsByBusinessId = (businessId: string): Item[] => mockItems.filter(item => item.businessId === businessId);
export const getItemById = (id: string): Item | undefined => mockItems.find(item => item.id === id);
export const getUserById = (id: string): User | undefined => mockUsers.find(user => user.uid === id);
