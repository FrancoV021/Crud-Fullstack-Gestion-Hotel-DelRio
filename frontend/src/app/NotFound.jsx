import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-9xl font-serif font-bold text-primary/20">404</h1>
      <h2 className="text-3xl font-serif font-semibold mt-4">Page not found</h2>
      <p className="text-muted-foreground mt-2 mb-8 max-w-md">
        The sanctuary you are looking for does not exist or has been moved. 
        Please return to our main island.
      </p>
      <Button asChild>
        <Link to="/" className="flex items-center gap-2">
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </Button>
    </div>
  );
}