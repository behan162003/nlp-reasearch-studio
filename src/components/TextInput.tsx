
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Send, Wand2, Sparkles } from 'lucide-react';

interface TextInputProps {
  onProcessText: (text: string) => void;
}

export const TextInput = ({ onProcessText }: TextInputProps) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    onProcessText(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  const getExampleText = () => {
    const examples = [
      "Natural language processing is a fascinating field that combines linguistics and computer science to enable machines to understand human language.",
      "The quick brown fox jumps over the lazy dog. This sentence contains every letter in the English alphabet.",
      "Machine learning algorithms can analyze vast amounts of text data and extract meaningful insights from unstructured information.",
      "I absolutely love this new smartphone! The camera quality is amazing and the battery lasts all day. It's the best purchase I've made this year.",
      "Climate change is one of the most pressing issues facing our planet today. We need to take immediate action to reduce carbon emissions."
    ];
    setText(examples[Math.floor(Math.random() * examples.length)]);
  };

  return (
    <Card className="p-4 animate-fade-in backdrop-blur-md border border-teal-500/30 bg-gradient-to-br from-blue-900/80 to-teal-900/80 shadow-[0_0_15px_rgba(0,176,209,0.2)]">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-teal-300" />
        <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-teal-100">Text Analysis</h3>
      </div>
      
      <div className="relative mb-4">
        <Textarea
          placeholder="Enter your text for NLP analysis..."
          className="min-h-[120px] transition-all duration-300 focus:ring-2 focus:ring-teal-500/50 text-cyan-100 resize-none text-sm bg-blue-950/30 border border-teal-500/30 rounded-xl px-4 py-3 placeholder:text-teal-400/70 backdrop-blur-md shadow-[0_0_10px_rgba(0,176,209,0.1)]"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute bottom-3 right-3 text-xs text-teal-300 bg-blue-900/70 px-2 py-1 rounded-md backdrop-blur-sm border border-teal-500/30">
          Press Ctrl+Enter to submit
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="ghost"
          onClick={getExampleText}
          className="text-xs border border-teal-500/30 bg-blue-900/40 hover:bg-blue-800/60 text-cyan-200 backdrop-blur-md shadow-[0_0_5px_rgba(0,176,209,0.1)] hover:shadow-[0_0_10px_rgba(0,176,209,0.2)] transition-all duration-300"
          size="sm"
        >
          <Wand2 className="mr-1 h-3 w-3" />
          Example
        </Button>
        <Button 
          onClick={handleSubmit}
          className="flex-1 text-sm transition-all duration-300 bg-gradient-to-r from-blue-600/90 to-teal-600/90 hover:from-blue-700/90 hover:to-teal-700/90 text-white border border-teal-500/30 shadow-[0_0_10px_rgba(0,176,209,0.2)] hover:shadow-[0_0_15px_rgba(0,176,209,0.3)]"
          disabled={!text.trim()}
          size="sm"
        >
          <Send className="mr-1 h-3 w-3" />
          Process
        </Button>
      </div>
    </Card>
  );
};
