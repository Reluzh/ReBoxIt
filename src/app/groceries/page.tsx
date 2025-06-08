'use client';
import { useState } from 'react';
import CategoryCard from '@/components/shared/CategoryCard';
import StoreCard from '@/components/shared/StoreCard';
import { Button } from '@/components/ui/button';
import { mockGroceryCategories, mockBusinesses } from '@/lib/mock-data';
import type { Business } from '@/types';
import { Award, Zap, Clock, ShoppingBag, SlidersHorizontal } from 'lucide-react';

const filterButtons = [
  { label: 'Featured', icon: Award, value: 'featured' },
  { label: 'Deals', icon: Zap, value: 'deals' },
  { label: 'Ready in 30 min', icon: Clock, value: 'fast_pickup' },
  { label: 'Pickup', icon: ShoppingBag, value: 'pickup_only' },
];

export default function GroceriesPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Dummy filter logic, replace with actual filtering based on store properties
  const popularGroceryStores = mockBusinesses.filter(b => b.type === 'grocery').slice(0, 4);
  
  const handleFilterClick = (value: string) => {
    setActiveFilter(prev => prev === value ? null : value);
    // Add logic to filter stores based on 'value'
  };

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-bold font-headline mb-2">Shop Groceries</h1>
        <p className="text-muted-foreground mb-6">Browse by category or find your favorite stores.</p>
        
        <div className="mb-8">
            <h2 className="text-2xl font-bold font-headline mb-4 flex items-center">
                <SlidersHorizontal size={24} className="mr-2 text-primary" />
                Filters
            </h2>
            <div className="flex flex-wrap gap-2">
            {filterButtons.map((filter) => (
                <Button
                key={filter.value}
                variant={activeFilter === filter.value ? 'default' : 'outline'}
                onClick={() => handleFilterClick(filter.value)}
                className={`
                    ${activeFilter === filter.value ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'hover:bg-accent/20'}
                `}
                >
                <filter.icon size={16} className="mr-2" />
                {filter.label}
                </Button>
            ))}
            </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold font-headline mb-4">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mockGroceryCategories.map((category) => (
            <CategoryCard key={category.id} category={category} baseUrl="/groceries/category" />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold font-headline mb-4">Popular Grocery Stores</h2>
        {popularGroceryStores.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularGroceryStores.map((store: Business) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No popular grocery stores found at the moment.</p>
        )}
      </section>
    </div>
  );
}