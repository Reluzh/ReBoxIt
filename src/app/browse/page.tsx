'use client';
import { useState, useMemo } from 'react';
import StoreCard from '@/components/shared/StoreCard';
import { Input } from '@/components/ui/input';
import { mockBusinesses } from '@/lib/mock-data';
import type { Business } from '@/types';
import { Search, MapPin, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export default function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('rating');


  const filteredBusinesses = useMemo(() => {
    return mockBusinesses
      .filter((store) =>
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.categories?.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .filter((store) => selectedType === 'all' || store.type === selectedType)
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'priceLevel' && a.priceLevel && b.priceLevel) return a.priceLevel - b.priceLevel;
        return 0;
      });
  }, [searchTerm, selectedType, sortBy]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline mb-2">Browse Stores</h1>
        <p className="text-muted-foreground">Find great deals from local restaurants and grocery stores.</p>
      </div>

      <div className="sticky top-[65px] bg-background/80 backdrop-blur-md py-4 z-10 rounded-lg shadow-soft">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name or category (e.g., Italian, Bakery)"
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="restaurant">Restaurants</SelectItem>
                <SelectItem value="grocery">Groceries</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="priceLevel">Price Level</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filteredBusinesses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBusinesses.map((store: Business) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-10">
          No stores found matching your criteria. Try adjusting your search or filters.
        </p>
      )}
    </div>
  );
}