import Image from 'next/image';
import type { Item } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tag, Zap, Percent } from 'lucide-react';

interface OfferCardProps {
  offer: Item;
}

export default function OfferCard({ offer }: OfferCardProps) {
  const discountedPercentage = offer.originalPrice > 0 
    ? Math.round(((offer.originalPrice - offer.discountedPrice) / offer.originalPrice) * 100) 
    : 0;

  return (
    <Card className="overflow-hidden hover:shadow-soft-md transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-0 relative">
        <Image
          src={offer.imageURL || `https://placehold.co/300x180.png`}
          alt={offer.title}
          width={300}
          height={180}
          className="w-full h-40 object-cover"
          data-ai-hint={offer.dataAiHint || 'food item'}
        />
        {offer.tags?.includes('Popular') && (
          <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
            <Zap size={14} className="mr-1" /> Popular
          </Badge>
        )}
         {offer.tags?.includes('New') && (
          <Badge variant="secondary" className="absolute top-2 right-2 bg-primary text-primary-foreground">
             New
          </Badge>
        )}
      </CardHeader>
      <CardContent className="pt-4 flex-grow">
        <CardTitle className="text-lg font-headline mb-1">{offer.title}</CardTitle>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{offer.description}</p>
        <div className="flex items-baseline mb-2">
          <span className="text-xl font-bold text-primary">${offer.discountedPrice.toFixed(2)}</span>
          <span className="text-sm text-muted-foreground line-through ml-2">${offer.originalPrice.toFixed(2)}</span>
        </div>
        {discountedPercentage > 0 && (
          <Badge variant="destructive" className="text-xs">
            <Percent size={12} className="mr-1" /> {discountedPercentage}% OFF
          </Badge>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-primary hover:bg-primary/90">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}