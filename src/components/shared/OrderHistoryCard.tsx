import type { Order } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Clock, Store, CheckCircle, AlertCircle, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface OrderHistoryCardProps {
  order: Order;
}

const statusMap: Record<Order['status'], { label: string; Icon: React.ElementType; color: string }> = {
  pending: { label: 'Pending', Icon: ShoppingCart, color: 'bg-yellow-500' },
  confirmed: { label: 'Confirmed', Icon: ShoppingCart, color: 'bg-blue-500' },
  ready_for_pickup: { label: 'Ready for Pickup', Icon: Package, color: 'bg-green-500 text-success-foreground' },
  completed: { label: 'Completed', Icon: CheckCircle, color: 'bg-primary text-primary-foreground' },
  cancelled: { label: 'Cancelled', Icon: AlertCircle, color: 'bg-destructive text-destructive-foreground' },
};


export default function OrderHistoryCard({ order }: OrderHistoryCardProps) {
  const statusInfo = statusMap[order.status];

  return (
    <Card className="mb-4 shadow-soft">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-headline flex items-center">
              <Store size={20} className="mr-2 text-primary" />
              {order.businessName}
            </CardTitle>
            <CardDescription>Order ID: {order.id}</CardDescription>
          </div>
          <Badge className={`${statusInfo.color} text-xs py-1 px-2`}>
            <statusInfo.Icon size={14} className="mr-1" />
            {statusInfo.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1 text-sm mb-3">
          {order.items.map(item => (
            <li key={item.itemId} className="flex justify-between">
              <span>{item.title} (x{item.quantity})</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
         <div className="border-t pt-2 text-sm font-semibold flex justify-between">
            <span>Total:</span>
            <span>${order.totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mt-3">
          <Clock size={16} className="mr-2 text-primary" />
          <span>Pickup: {order.pickupTime}</span>
        </div>
         <p className="text-xs text-muted-foreground mt-1">
          Ordered on: {new Date(order.orderDate).toLocaleDateString()} at {new Date(order.orderDate).toLocaleTimeString()}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Link href={`/stores/${order.businessId}`} passHref>
          <Button variant="outline" size="sm">View Store</Button>
        </Link>
        {order.status === 'completed' && (
          <Button variant="secondary" size="sm">Reorder</Button>
        )}
        {order.status === 'ready_for_pickup' && (
           <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90">View Pickup Details</Button>
        )}
      </CardFooter>
    </Card>
  );
}