
import { useState } from 'react';
import { TextInput } from '@/components/TextInput';
import { TokenDisplay } from '@/components/TokenDisplay';
import { SentimentDisplay } from '@/components/SentimentDisplay';
import { POSDisplay } from '@/components/POSDisplay';
import { AudioUploader } from '@/components/AudioUploader';
import { tokenize, stem, removeStopwords, analyzeSentiment, posTag, detectLanguage } from '@/utils/nlpUtils';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Globe, Shield, FileText, Tag, Brain } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { motion } from 'framer-motion';

const Index = () => {
  const [tokens, setTokens] = useState<string[]>([]);
  const [stemmedTokens, setStemmedTokens] = useState<string[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<string[]>([]);
  const [sentiment, setSentiment] = useState<{ score: number; label: string } | null>(null);
  const [posTokens, setPosTokens] = useState<Array<{ word: string; pos: string }>>([]);
  const [showPos, setShowPos] = useState(false);
  const [isSpam, setIsSpam] = useState<boolean | null>(null);
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);
  const [audioText, setAudioText] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string>('');
  const navigate = useNavigate();

  const handleProcessText = (text: string) => {
    if (!text.trim()) return;
    
    setInputText(text);
    
    const newTokens = tokenize(text);
    setTokens(newTokens);
    
    const newStemmedTokens = newTokens.map(stem);
    setStemmedTokens(newStemmedTokens);
    
    const newFilteredTokens = removeStopwords(newTokens);
    setFilteredTokens(newFilteredTokens);

    const sentimentResult = analyzeSentiment(text);
    setSentiment(sentimentResult);

    const posResult = posTag(text);
    setPosTokens(posResult);

    const language = detectLanguage(text);
    setDetectedLanguage(language);

    const spamWords = ['buy now', 'free', 'winner', 'lottery', 'prize', 'viagra', 'investment'];
    setIsSpam(spamWords.some(word => text.toLowerCase().includes(word)));
  };

  const handleAudioProcessed = (transcribedText: string) => {
    setAudioText(transcribedText);
    handleProcessText(transcribedText);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container-wrapper py-12">
        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="hero-gradient rounded-xl px-6 py-12 mb-16 text-center"
        >
          <h1 className="text-4xl font-medium mb-4">
            Natural Language Processing <span className="text-primary font-light">Research Studio</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore cutting-edge NLP technologies, analyze text data, and discover insights through our educational tools.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => navigate('/chatbot')}
              className="flex items-center gap-2 pulse-glow"
              size="lg"
            >
              <MessageSquare className="h-4 w-4" />
              Talk to Eliza AI Assistant
            </Button>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-16"
        >
          <h2 className="section-title text-center">NLP Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="feature-card p-6 text-left">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Brain className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">Natural Language Understanding</h3>
              <p className="text-muted-foreground">Explore how machines understand and interpret human language through semantic analysis.</p>
            </div>
            <div className="feature-card p-6 text-left">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Globe className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">Multilingual Analysis</h3>
              <p className="text-muted-foreground">Study language detection and cross-lingual processing techniques for global communication.</p>
            </div>
            <div className="feature-card p-6 text-left">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">Interactive AI Chat</h3>
              <p className="text-muted-foreground">Engage with our therapeutic AI assistant to understand conversational AI capabilities.</p>
            </div>
          </div>
        </motion.section>

        {/* NLP Tools Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          id="nlp-tools" 
          className="pt-8"
        >
          <h2 className="section-title text-center mb-8">Interactive NLP Toolkit</h2>
          
          <Card className="max-w-3xl mx-auto bg-card shadow-sm border border-border p-4 sm:p-6 rounded-lg">
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="text">Text Analysis</TabsTrigger>
                <TabsTrigger value="audio">Speech Analysis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="text" className="mt-0">
                <TextInput onProcessText={handleProcessText} />
              </TabsContent>
              
              <TabsContent value="audio" className="mt-0">
                <AudioUploader onAudioProcessed={handleAudioProcessed} />
                {audioText && (
                  <Card className="p-4 mt-4 bg-secondary">
                    <h3 className="text-sm font-medium mb-2">Transcribed Text</h3>
                    <p className="text-sm text-foreground">{audioText}</p>
                  </Card>
                )}
              </TabsContent>
            </Tabs>

            {(detectedLanguage || isSpam !== null) && (
              <div className="flex flex-wrap gap-2 mt-4">
                {detectedLanguage && (
                  <div className="flex items-center gap-1 bg-secondary text-foreground px-2 py-1 rounded-md text-xs">
                    <Globe className="h-3 w-3" />
                    <span>Language: {detectedLanguage}</span>
                  </div>
                )}

                {isSpam !== null && (
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs ${
                    isSpam ? 'bg-red-900/50 text-red-200' : 'bg-green-900/50 text-green-200'
                  }`}>
                    <Shield className="h-3 w-3" />
                    <span>{isSpam ? 'Spam detected' : 'No spam'}</span>
                  </div>
                )}
              </div>
            )}

            {tokens.length > 0 && (
              <div className="mt-6">
                <div className="flex justify-center gap-3 mb-4">
                  <Button 
                    variant={!showPos ? "default" : "outline"} 
                    onClick={() => setShowPos(false)}
                    size="sm"
                    className="text-sm"
                  >
                    <FileText className="mr-2 h-3.5 w-3.5" />
                    Text Analysis
                  </Button>
                  <Button 
                    variant={showPos ? "default" : "outline"} 
                    onClick={() => setShowPos(true)}
                    size="sm"
                    className="text-sm"
                  >
                    <Tag className="mr-2 h-3.5 w-3.5" />
                    POS Analysis
                  </Button>
                </div>

                <div>
                  {!showPos ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sentiment && <SentimentDisplay sentiment={sentiment} className="bg-card border border-border" />}
                      <TokenDisplay tokens={tokens} title="Tokenization" className="bg-card border border-border" />
                      <TokenDisplay tokens={stemmedTokens} title="Stemming" className="bg-card border border-border" />
                      <TokenDisplay tokens={filteredTokens} title="Stopwords Removed" className="bg-card border border-border" />
                    </div>
                  ) : (
                    <POSDisplay tokens={posTokens} />
                  )}
                </div>
              </div>
            )}
          </Card>
        </motion.section>
      </main>
    </div>
  );
};

export default Index;
