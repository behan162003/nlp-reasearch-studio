
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Home } from "lucide-react";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-blue-50 sticky top-0 z-50 shadow-sm">
      <div className="container-wrapper py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
            <div className="text-white font-semibold text-sm">NLP</div>
          </div>
          <h1 className="text-xl font-medium text-gray-800">
            Research <span className="font-light text-blue-500">STUDIO</span>
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-gray-900 hover:bg-blue-50"
          >
            <Home className="w-4 h-4 mr-1.5" />
            <span>Home</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/chatbot")}
            className="text-gray-600 hover:text-gray-900 hover:bg-blue-50"
          >
            <MessageSquare className="w-4 h-4 mr-1.5" />
            <span>Eliza AI</span>
          </Button>
        </nav>

        <div className="flex md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/chatbot")}
            className="text-gray-600 hover:text-gray-900 hover:bg-blue-50 h-9 w-9"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="sr-only">Eliza AI</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
