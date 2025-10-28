import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
          <a href="/" className="text-blue-500 underline hover:text-blue-700">
            Return to Home
          </a>
        </div>
      </div>

      <footer className="border-t border-border bg-card/50 backdrop-blur">
        <div className="px-4 py-3 flex justify-end items-center gap-2">
          <p className="text-sm text-muted-foreground">
            Developed by <span className="font-semibold text-foreground">Insyt</span>
          </p>
          <img src="/src/assets/insyt-logo.png" alt="Insyt Logo" className="h-6 w-auto" />
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
