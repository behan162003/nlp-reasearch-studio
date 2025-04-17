
import { Card } from '@/components/ui/card';
import { HeartPulse, Frown, Smile, Sparkles } from 'lucide-react';

interface SentimentDisplayProps {
  sentiment: {
    score: number;
    label: string;
  };
  className?: string;
}

export const SentimentDisplay = ({ sentiment, className = '' }: SentimentDisplayProps) => {
  const getSentimentIcon = () => {
    if (sentiment.label === 'positive') return <Smile className="w-5 h-5 text-green-300" />;
    if (sentiment.label === 'negative') return <Frown className="w-5 h-5 text-red-300" />;
    return <HeartPulse className="w-5 h-5 text-yellow-300" />;
  };

  const getSentimentColor = () => {
    if (sentiment.label === 'positive') return 'bg-green-900/50 border-green-500/30 text-green-100';
    if (sentiment.label === 'negative') return 'bg-red-900/50 border-red-500/30 text-red-100';
    return 'bg-yellow-900/50 border-yellow-500/30 text-yellow-100';
  };

  return (
    <Card className={`p-5 animate-slide-in backdrop-blur-md border border-teal-500/30 bg-gradient-to-br from-blue-900/80 to-teal-900/80 shadow-[0_0_15px_rgba(0,176,209,0.2)] ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-teal-300" />
        <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-teal-100">Sentiment Analysis</h3>
      </div>
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-md ${getSentimentColor()}`}>
        {getSentimentIcon()}
        <div>
          <span className="font-medium">{sentiment.label.charAt(0).toUpperCase() + sentiment.label.slice(1)}</span>
        </div>
      </div>
    </Card>
  );
};
