
'use client';
import Link from 'next/link';
import OfferCard from '@/components/shared/OfferCard';
import StoreCard from '@/components/shared/StoreCard';
import { Button } from '@/components/ui/button';
import { mockItems, mockBusinesses } from '@/lib/mock-data';
import type { Item, Business } from '@/types';
import { ShoppingCart, Utensils, Sparkles, Building } from 'lucide-react';

export default function HomePage() {
  const featuredOffers = mockItems.filter(item => item.isFeatured).slice(0, 4);
  const popularStores = mockBusinesses.sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div className="space-y-12">
      <section className="text-center py-8 bg-gradient-to-r from-primary/10 via-background to-accent/10 rounded-lg shadow-soft">
        <h1 className="text-4xl font-bold font-headline mb-3 text-primary">Welcome to Surplus Saver!</h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
          Discover amazing deals on surplus food from your favorite local stores and restaurants. Help reduce waste and save money!
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/browse" passHref>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Utensils className="mr-2" /> Browse All Stores
            </Button>
          </Link>
          <Link href="/groceries" passHref>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5">
              <ShoppingCart className="mr-2" /> Shop Groceries
            </Button>
          </Link>
        </div>
      </section>

      {featuredOffers.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold font-headline mb-6 flex items-center">
            <Sparkles size={28} className="mr-3 text-accent fill-accent" />
            Featured Offers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredOffers.map((offer: Item) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </section>
      )}

      {popularStores.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold font-headline mb-6 flex items-center">
            <Building size={28} className="mr-3 text-primary" />
            Popular Stores
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularStores.map((store: Business) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
