export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-6 text-center shadow-soft-md mt-auto">
      <div className="container mx-auto px-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Surplus Saver. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Helping reduce food waste, one meal at a time.
        </p>
      </div>
    </footer>
  );
}