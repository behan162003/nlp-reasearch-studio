
import { Card } from '@/components/ui/card';
import { BookOpen, Sparkles } from 'lucide-react';

interface POSDisplayProps {
  tokens: Array<{ word: string; pos: string }>;
  className?: string;
}

export const POSDisplay = ({ tokens, className = '' }: POSDisplayProps) => {
  const getTagColor = (pos: string) => {
    switch (pos) {
      case 'NOUN': return 'bg-blue-900/50 border-blue-500/30 text-blue-100';
      case 'PROPER_NOUN': return 'bg-blue-800/50 border-blue-400/30 text-blue-50';
      case 'PRONOUN': return 'bg-indigo-900/50 border-indigo-500/30 text-indigo-100';
      case 'VERB': return 'bg-emerald-900/50 border-emerald-500/30 text-emerald-100';
      case 'ADJECTIVE': return 'bg-purple-900/50 border-purple-500/30 text-purple-100';
      case 'ADVERB': return 'bg-amber-900/50 border-amber-500/30 text-amber-100';
      case 'PREPOSITION': return 'bg-pink-900/50 border-pink-500/30 text-pink-100';
      case 'DETERMINER': return 'bg-orange-900/50 border-orange-500/30 text-orange-100';
      case 'CONJUNCTION': return 'bg-teal-900/50 border-teal-500/30 text-teal-100';
      case 'INTERJECTION': return 'bg-rose-900/50 border-rose-500/30 text-rose-100';
      case 'NUMBER': return 'bg-cyan-900/50 border-cyan-500/30 text-cyan-100';
      default: return 'bg-slate-900/50 border-slate-500/30 text-slate-100';
    }
  };

  const getTagIcon = (pos: string) => {
    switch (pos) {
      case 'NOUN': return '🔷';
      case 'PROPER_NOUN': return '💠';
      case 'PRONOUN': return '👤';
      case 'VERB': return '🏃';
      case 'ADJECTIVE': return '🎨';
      case 'ADVERB': return '⚡';
      case 'PREPOSITION': return '🔄';
      case 'DETERMINER': return '👉';
      case 'CONJUNCTION': return '🔗';
      case 'INTERJECTION': return '😲';
      case 'NUMBER': return '🔢';
      default: return '❓';
    }
  };

  const getPOSDescription = (pos: string) => {
    switch (pos) {
      case 'NOUN': return 'Noun';
      case 'PROPER_NOUN': return 'Proper Noun';
      case 'PRONOUN': return 'Pronoun';
      case 'VERB': return 'Verb';
      case 'ADJECTIVE': return 'Adjective';
      case 'ADVERB': return 'Adverb';
      case 'PREPOSITION': return 'Preposition';
      case 'DETERMINER': return 'Determiner';
      case 'CONJUNCTION': return 'Conjunction';
      case 'INTERJECTION': return 'Interjection';
      case 'NUMBER': return 'Number';
      default: return pos.charAt(0) + pos.slice(1).toLowerCase();
    }
  };

  // Group tokens by part of speech for the legend
  const posCategories = [...new Set(tokens.map(token => token.pos))];

  return (
    <Card className={`p-5 animate-slide-in backdrop-blur-md border border-indigo-500/30 bg-gradient-to-br from-indigo-900/80 to-purple-900/80 shadow-[0_0_15px_rgba(123,104,238,0.2)] ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-4 h-4 text-indigo-300" />
        <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-100">Part of Speech Analysis</h3>
      </div>
      
      <div className="flex flex-wrap gap-3 mb-6">
        {tokens.map((token, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center rounded-xl p-3 backdrop-blur-md border border-indigo-500/30 bg-indigo-800/30 shadow-[0_0_10px_rgba(123,104,238,0.15)] transition-all duration-300 hover:bg-indigo-700/40 hover:border-indigo-400/50"
            style={{animationDelay: `${index * 50}ms`}}
          >
            <span className="text-base font-medium text-white mb-1">{token.word}</span>
            <span 
              className={`text-xs px-2 py-1 rounded-lg mt-1 font-medium flex items-center gap-1 ${getTagColor(token.pos)}`}
              title={getPOSDescription(token.pos)}
            >
              <span>{getTagIcon(token.pos)}</span>
              <span>{getPOSDescription(token.pos)}</span>
            </span>
          </div>
        ))}
      </div>
      
      <h4 className="text-sm font-semibold mb-3 flex items-center gap-1 text-indigo-200">
        <Sparkles className="w-3 h-3" />
        Legend
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
        {posCategories.map((category, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded-md ${getTagColor(category)} text-xs`}>
              {getTagIcon(category)} {getPOSDescription(category)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};
