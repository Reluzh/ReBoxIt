import StoreCard from '@/components/shared/StoreCard';
import { Button } from '@/components/ui/button';
import { mockBusinesses, mockItems } from '@/lib/mock-data';
import type { Business } from '@/types';
import Link from 'next/link';
import { ChevronRight, Leaf } from 'lucide-react';
import OfferCard from '@/components/shared/OfferCard';

export default function HomePage() {
  const featuredBusinesses = mockBusinesses.slice(0, 3);
  const popularOffers = mockItems.filter(item => item.isFeatured).slice(0,3);

  return (
    <div className="space-y-12">
      <section className="bg-gradient-to-br from-primary/20 via-background to-background rounded-lg p-8 md:p-12 text-center shadow-soft">
        <div className="max-w-3xl mx-auto">
          <Leaf className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-primary">
            Save Food, Save Money, Save the Planet
          </h1>
          <p className="text-lg text-foreground/80 mb-8">
            Discover delicious surplus food from your favorite local stores and restaurants at amazing prices.
          </p>
          <div className="space-x-4">
            <Link href="/browse" passHref>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Browse Deals Nearby <ChevronRight size={20} className="ml-2" />
              </Button>
            </Link>
            <Link href="/groceries" passHref>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Shop Groceries
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold font-headline mb-6">Popular Offers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
         {popularOffers.length === 0 && <p className="text-muted-foreground">No popular offers available right now. Check back soon!</p>}
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold font-headline">Featured Stores</h2>
          <Link href="/browse" passHref>
            <Button variant="link" className="text-primary hover:text-primary/80">
              View All <ChevronRight size={16} className="ml-1" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBusinesses.map((store: Business) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
        {featuredBusinesses.length === 0 && <p className="text-muted-foreground">No featured stores available at the moment.</p>}
      </section>
    </div>
  );
}