
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Brain } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      toast({
        title: "Username required",
        description: "Please enter a username to continue",
        variant: "destructive"
      });
      return;
    }

    // Save username to localStorage
    localStorage.setItem('nlpStudioUsername', username);
    
    // Navigate to home page
    navigate('/');
    
    toast({
      title: "Welcome to NLP Studio!",
      description: `Hello, ${username}! You've successfully logged in.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-indigo-600 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md p-6 shadow-2xl">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center shadow-lg">
            <Brain className="w-12 h-12 text-white" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-1 text-indigo-700">
          Welcome to NLP Studio
        </h1>
        <p className="text-sm text-center mb-6 text-gray-600">
          Enter your username to get started with advanced natural language processing tools
        </p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input 
              id="username"
              placeholder="Enter your username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-indigo-200 focus:border-indigo-400"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
          >
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
