'use client';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { getBusinessById, getItemsByBusinessId, mockReviews, mockItems } from '@/lib/mock-data';
import OfferCard from '@/components/shared/OfferCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, MapPin, MessageCircle, Utensils, ShoppingCart, ThumbsUp, PlusCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const PriceLevel: React.FC<{ level?: 1 | 2 | 3 | 4 }> = ({ level }) => {
  if (!level) return null;
  return <span className="text-primary">{'$'.repeat(level)}<span className="text-muted-foreground">{'$'.repeat(4-level)}</span></span>;
};

export default function StoreDetailPage() {
  const params = useParams();
  const storeId = params.storeId as string;
  const store = getBusinessById(storeId);
  
  if (!store) {
    return <p className="text-center text-muted-foreground py-10">Store not found.</p>;
  }

  const storeOffers = getItemsByBusinessId(store.id);
  const featuredOffers = storeOffers.filter(offer => offer.isFeatured);
  const regularMenuOffers = mockItems.filter(item => item.businessId === store.id && !item.isFeatured).slice(0,5); // Mocking regular menu items

  const IconComponent = store.type === 'grocery' ? ShoppingCart : Utensils;

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden shadow-soft-md">
        <CardHeader className="p-0 relative">
          <Image
            src={store.coverImageURL || store.logoURL || 'https://placehold.co/1200x400.png'}
            alt={`${store.name} cover image`}
            width={1200}
            height={400}
            className="w-full h-52 md:h-72 object-cover"
            data-ai-hint={store.dataAiHint || (store.type === 'grocery' ? 'large grocery store' : 'restaurant ambiance')}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <div className="flex items-center mb-2">
                <Avatar className="h-16 w-16 border-2 border-background mr-4">
                    <AvatarImage src={store.logoURL} alt={store.name} />
                    <AvatarFallback>{store.name.substring(0,2)}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold font-headline text-white">{store.name}</h1>
                    <Badge variant="secondary" className="mt-1 bg-background/80 backdrop-blur-sm text-foreground">
                        <IconComponent size={14} className="mr-1 text-primary" /> {store.type === 'grocery' ? 'Grocery Store' : 'Restaurant'}
                    </Badge>
                </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-4 mb-6 text-sm">
            <div className="flex items-center">
              <Star size={18} className="text-accent mr-2 fill-accent" />
              <span>{store.rating.toFixed(1)} stars ({store.reviews?.length || 0} reviews)</span>
            </div>
            {store.priceLevel && (
              <div className="flex items-center">
                <PriceLevel level={store.priceLevel} />
              </div>
            )}
            {store.pickupEta && (
              <div className="flex items-center">
                <Clock size={18} className="text-primary mr-2" />
                <span>Pickup ETA: {store.pickupEta}</span>
              </div>
            )}
            {store.location && (
              <div className="flex items-center md:col-span-3">
                <MapPin size={18} className="text-primary mr-2" />
                <span>{store.location.address}</span>
              </div>
            )}
          </div>
          <p className="text-muted-foreground mb-6">{store.description}</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="featured" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-3 md:w-auto md:inline-flex">
          <TabsTrigger value="featured"><ThumbsUp size={16} className="mr-2" />Featured Offers</TabsTrigger>
          <TabsTrigger value="menu"><Utensils size={16} className="mr-2" />Full Menu</TabsTrigger>
          <TabsTrigger value="reviews"><MessageCircle size={16} className="mr-2" />Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="featured">
          <h2 className="text-2xl font-bold font-headline mb-4">Today's Top Deals</h2>
          {featuredOffers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-10">No featured offers available right now from {store.name}.</p>
          )}
        </TabsContent>

        <TabsContent value="menu">
           <h2 className="text-2xl font-bold font-headline mb-4">All Items from {store.name}</h2>
           {regularMenuOffers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {regularMenuOffers.map((offer) => ( // Displaying all offers for simplicity as 'menu'
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-10">{store.name} has not listed their full menu yet.</p>
          )}
        </TabsContent>
        
        <TabsContent value="reviews">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
                 <h2 className="text-2xl font-bold font-headline">Customer Reviews</h2>
                 <Button variant="outline">
                    <PlusCircle size={16} className="mr-2" /> Add Your Review
                 </Button>
            </div>
            {store.reviews && store.reviews.length > 0 ? store.reviews.map((review) => (
              <Card key={review.id} className="shadow-soft">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={review.userPhotoURL || `https://placehold.co/40x40.png`} alt={review.userName} />
                      <AvatarFallback>{review.userName.substring(0,1)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{review.userName}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < review.rating ? 'text-accent fill-accent' : 'text-muted-foreground'} />
                        ))}
                        <span className="ml-2">{new Date(review.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{review.comment}</p>
                </CardContent>
              </Card>
            )) : (
              <p className="text-center text-muted-foreground py-10">No reviews yet for {store.name}. Be the first to write one!</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}