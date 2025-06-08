
import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirect to /home as per typical logged-in user flow
  // The login page itself is at /login
  redirect('/home'); 
  return null;
}
