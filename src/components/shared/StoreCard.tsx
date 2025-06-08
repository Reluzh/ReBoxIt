import Image from 'next/image';
import Link from 'next/link';
import type { Business } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, ShoppingCart, Utensils } from 'lucide-react';

interface StoreCardProps {
  store: Business;
}

const PriceLevel: React.FC<{ level?: 1 | 2 | 3 | 4 }> = ({ level }) => {
  if (!level) return null;
  return <span className="text-primary">{'$'.repeat(level)}<span className="text-muted-foreground">{'$'.repeat(4-level)}</span></span>;
};


export default function StoreCard({ store }: StoreCardProps) {
  const IconComponent = store.type === 'grocery' ? ShoppingCart : Utensils;

  return (
    <Link href={`/stores/${store.id}`} className="block group">
      <Card className="overflow-hidden h-full flex flex-col hover:shadow-soft-md transition-shadow duration-300">
        <CardHeader className="p-0 relative">
          <Image
            src={store.coverImageURL || store.logoURL || `https://placehold.co/400x200.png`}
            alt={store.name}
            width={400}
            height={200}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            data-ai-hint={store.dataAiHint || (store.type === 'grocery' ? 'grocery store' : 'restaurant front')}
          />
           <Badge variant="secondary" className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm">
            <IconComponent size={14} className="mr-1 text-primary" /> {store.type === 'grocery' ? 'Grocery' : 'Restaurant'}
          </Badge>
        </CardHeader>
        <CardContent className="pt-4 flex-grow">
          <CardTitle className="text-xl font-headline mb-2">{store.name}</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <Star size={16} className="text-accent mr-1 fill-accent" />
            <span>{store.rating.toFixed(1)}</span>
            {store.priceLevel && (
              <>
                <span className="mx-2">·</span>
                <PriceLevel level={store.priceLevel} />
              </>
            )}
          </div>
          {store.pickupEta && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock size={16} className="text-primary mr-1" />
              <span>{store.pickupEta}</span>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {store.categories?.slice(0, 2).map((category) => (
            <Badge key={category} variant="outline" className="mr-2 text-xs">{category}</Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
}