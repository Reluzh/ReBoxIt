import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingBasket, Home, Search, ClipboardList, User, Bell, Leaf } from 'lucide-react';

const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/browse', label: 'Browse', icon: Search },
  { href: '/groceries', label: 'Groceries', icon: ShoppingBasket },
  { href: '/orders', label: 'Orders', icon: ClipboardList },
  { href: '/account', label: 'Account', icon: User },
];

export default function Header() {
  return (
    <header className="bg-card shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/home" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
          <Leaf size={28} />
          <h1 className="text-2xl font-bold font-headline">ReBoxIt</h1>
        </Link>
        <nav className="flex items-center space-x-2 sm:space-x-4">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href}>
              <Button variant="ghost" className="hidden sm:inline-flex p-2 hover:bg-primary/10">
                <item.icon size={20} className="mr-0 sm:mr-2" />
                <span className="hidden sm:inline">{item.label}</span>
              </Button>
            </Link>
          ))}
           {navItems.map((item) => (
            <Link key={`${item.label}-mobile`} href={item.href}>
              <Button variant="ghost" size="icon" className="sm:hidden p-2 hover:bg-primary/10">
                <item.icon size={24} />
                 <span className="sr-only">{item.label}</span>
              </Button>
            </Link>
          ))}
          <Button variant="ghost" size="icon" className="hover:bg-primary/10">
            <Bell size={20} />
            <span className="sr-only">Notifications</span>
          </Button>
        </nav>
      </div>
    </header>
  );
}
