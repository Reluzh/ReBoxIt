
import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/login');
  // The rest of the component will not be rendered after the redirect.
  // We can leave a minimal structure or remove it entirely.
  // For clarity, let's return null.
  return null;
}
