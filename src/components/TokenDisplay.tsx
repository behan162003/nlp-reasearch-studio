
import { Card } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

interface TokenDisplayProps {
  tokens: string[];
  title: string;
  className?: string;
}

export const TokenDisplay = ({ tokens, title, className = '' }: TokenDisplayProps) => {
  return (
    <Card className={`p-4 backdrop-blur-md border border-indigo-500/30 bg-gradient-to-br from-indigo-900/80 to-purple-900/80 shadow-[0_0_15px_rgba(123,104,238,0.2)] ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-indigo-300" />
        <h3 className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-100 font-serif">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-500/30 scrollbar-track-transparent pr-1">
        {tokens.map((token, index) => (
          <span 
            key={index} 
            className="inline-block px-2 py-1 rounded-lg border border-indigo-500/30 bg-indigo-800/50 text-indigo-100 backdrop-blur-sm hover:bg-indigo-700/70 transition-all duration-300 hover:border-indigo-400/50 shadow-[0_0_5px_rgba(123,104,238,0.2)] text-xs"
            style={{animationDelay: `${index * 50}ms`}}
          >
            {token}
          </span>
        ))}
      </div>
    </Card>
  );
};
