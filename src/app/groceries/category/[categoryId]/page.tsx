'use client';
import { useParams, useSearchParams } from 'next/navigation';
import StoreCard from '@/components/shared/StoreCard';
import OfferCard from '@/components/shared/OfferCard';
import { mockBusinesses, mockItems, mockGroceryCategories } from '@/lib/mock-data';
import type { Business, Item } from '@/types';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function GroceryCategoryPage() {
  const params = useParams();
  const searchParamsHook = useSearchParams(); // Renamed to avoid conflict
  const categoryId = params.categoryId as string;
  const categoryNameParam = searchParamsHook.get('categoryName'); // Used if navigating from a link with categoryName

  const category = mockGroceryCategories.find(cat => cat.id === categoryId);
  const displayName = categoryNameParam || category?.name || "Category";

  const [searchTerm, setSearchTerm] = useState('');

  // Dummy logic: Filter items/stores based on category. 
  // In a real app, items would have category IDs, or stores would be linked to categories.
  // For now, showing all grocery stores and items, with search.
  const relevantStores = mockBusinesses.filter(b => b.type === 'grocery');
  const relevantItems = mockItems.filter(i => 
    mockBusinesses.find(b => b.id === i.businessId && b.type === 'grocery')
  );

  const filteredItems = useMemo(() => {
    return relevantItems.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, relevantItems]);

  const filteredStores = useMemo(() => {
    return relevantStores.filter(store => 
      store.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, relevantStores]);


  if (!category && !categoryNameParam) {
    return <p className="text-center text-muted-foreground py-10">Category not found.</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline mb-2">Groceries: {displayName}</h1>
        <p className="text-muted-foreground mb-6">Find great deals in the {displayName.toLowerCase()} category.</p>
      </div>

      <div className="relative w-full md:max-w-md mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder={`Search within ${displayName}...`}
          className="pl-10 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <section>
        <h2 className="text-2xl font-bold font-headline mb-4">Offers in {displayName}</h2>
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item: Item) => (
              <OfferCard key={item.id} offer={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-10">No offers found for "{searchTerm}" in {displayName}.</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold font-headline mb-4">Stores with {displayName}</h2>
         {filteredStores.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStores.map((store: Business) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-10">No stores found for "{searchTerm}" offering {displayName}.</p>
        )}
      </section>
    </div>
  );
}
