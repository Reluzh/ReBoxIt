import OrderHistoryCard from '@/components/shared/OrderHistoryCard';
import { mockOrders } from '@/lib/mock-data';
import type { Order } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarClock, History } from 'lucide-react';

export default function OrdersPage() {
  const today = new Date().toISOString().split('T')[0];
  
  const todayOrders = mockOrders.filter(order => 
    new Date(order.orderDate).toISOString().split('T')[0] === today && 
    (order.status === 'pending' || order.status === 'confirmed' || order.status === 'ready_for_pickup')
  );
  
  const pastOrders = mockOrders.filter(order => 
    !(new Date(order.orderDate).toISOString().split('T')[0] === today && 
    (order.status === 'pending' || order.status === 'confirmed' || order.status === 'ready_for_pickup'))
  ).sort((a,b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline mb-2">Your Orders</h1>
        <p className="text-muted-foreground">Track your current orders and view past purchases.</p>
      </div>

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px] mb-6">
          <TabsTrigger value="today">
            <CalendarClock size={16} className="mr-2"/> Today's Orders
          </TabsTrigger>
          <TabsTrigger value="past">
            <History size={16} className="mr-2"/> Past Orders
          </TabsTrigger>
        </TabsList>
        <TabsContent value="today">
            {todayOrders.length > 0 ? (
                todayOrders.map((order: Order) => (
                <OrderHistoryCard key={order.id} order={order} />
                ))
            ) : (
                <p className="text-center text-muted-foreground py-10">No active orders for today.</p>
            )}
        </TabsContent>
        <TabsContent value="past">
            {pastOrders.length > 0 ? (
                pastOrders.map((order: Order) => (
                <OrderHistoryCard key={order.id} order={order} />
                ))
            ) : (
                <p className="text-center text-muted-foreground py-10">You have no past orders.</p>
            )}
        </TabsContent>
      </Tabs>
    </div>
  );
}