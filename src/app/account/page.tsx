
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockUsers } from "@/lib/mock-data"
import { User as UserType } from "@/types"
import { ChevronRight, CreditCard, Gift, HelpCircle, LogOut, MapPin, Bell as NotificationBell, Settings, UserCircle2 } from "lucide-react"
import Link from "next/link"

const menuItems = [
  { label: "Manage Account", icon: Settings, href: "/account/manage" },
  { label: "Payment Methods", icon: CreditCard, href: "/account/payment" },
  { label: "Delivery Addresses", icon: MapPin, href: "/account/addresses" },
  { label: "Notifications", icon: NotificationBell, href: "/account/notifications" },
  { label: "Gift Cards", icon: Gift, href: "/account/giftcards" },
  { label: "Get Help", icon: HelpCircle, href: "/account/help" },
];

export default function AccountPage() {
  const user: UserType | undefined = mockUsers[0]; // Assuming first user for demo

  if (!user) {
    return <p>Please log in to view your account.</p>; // Or a redirect to login
  }

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold font-headline mb-2">My Account</h1>
        <p className="text-muted-foreground">Manage your profile, settings, and more.</p>
      </div>

      <Card className="shadow-soft">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.photoURL || undefined} alt={user.name || "User"} />
            <AvatarFallback>
              <UserCircle2 size={40} />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl font-headline">{user.name || "Valued Customer"}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
            {user.phone && <CardDescription>{user.phone}</CardDescription>}
          </div>
        </CardHeader>
      </Card>

      <Card className="shadow-soft">
        <CardContent className="p-0">
          <ul className="divide-y divide-border">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href} passHref>
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-auto py-4 px-6 text-base hover:bg-accent/10"
                  >
                    <item.icon className="mr-3 h-5 w-5 text-primary" />
                    {item.label}
                    <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <div className="text-center">
        <Link href="/login" passHref>
          <Button variant="destructive" className="w-full sm:w-auto">
            <LogOut className="mr-2 h-5 w-5" />
            Log Out
          </Button>
        </Link>
      </div>
    </div>
  );
}
