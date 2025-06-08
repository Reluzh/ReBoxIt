import Image from 'next/image';
import type { Category } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface CategoryCardProps {
  category: Category;
  baseUrl?: string;
}

export default function CategoryCard({ category, baseUrl = "/groceries" }: CategoryCardProps) {
  const IconComponent = category.icon;
  return (
    <Link href={`${baseUrl}?category=${category.id}`} className="block group">
      <Card className="overflow-hidden hover:shadow-soft-md transition-shadow duration-300 text-center h-full">
        <CardHeader className="p-0 relative aspect-video flex items-center justify-center">
          {category.imageURL ? (
            <Image
              src={category.imageURL}
              alt={category.name}
              width={200}
              height={120}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              data-ai-hint={category.dataAiHint || 'category food'}
            />
          ) : IconComponent ? (
             <IconComponent size={48} className="text-primary group-hover:scale-110 transition-transform duration-300" />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-sm">No Image</span>
            </div>
          )}
        </CardHeader>
        <CardContent className="p-3">
          <CardTitle className="text-md font-headline">{category.name}</CardTitle>
        </CardContent>
      </Card>
    </Link>
  );
}