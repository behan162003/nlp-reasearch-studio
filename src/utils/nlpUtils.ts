// Improved tokenization
export const tokenize = (text: string): string[] => {
  // This regex splits on spaces but keeps contractions and punctuation attached to words
  return text.toLowerCase()
    .match(/[\w\d']+|[.,!?;:]/g) || [];
};

// Enhanced stemming with more robust rules
export const stem = (word: string): string => {
  // Remove word if it's just punctuation
  if (/^[.,!?;:]$/.test(word)) return '';
  
  let result = word.toLowerCase();
  
  // Don't stem short words
  if (result.length <= 2) return result;
  
  // Handle possessives
  if (result.endsWith("'s")) {
    result = result.slice(0, -2);
  }
  
  // Handle common irregular plurals
  const irregularPlurals: Record<string, string> = {
    'children': 'child',
    'people': 'person',
    'men': 'man',
    'women': 'woman',
    'teeth': 'tooth',
    'feet': 'foot',
    'mice': 'mouse',
    'geese': 'goose'
  };
  
  if (irregularPlurals[result]) {
    return irregularPlurals[result];
  }
  
  // Handle plurals and common word endings
  if (result.endsWith('ies') && result.length > 3) {
    return result.slice(0, -3) + 'y';
  } else if ((result.endsWith('es') || result.endsWith('ss')) && result.length > 3) {
    // Special handling for words ending in 'ss'
    if (result.endsWith('sses')) {
      return result.slice(0, -2);
    }
    // Words ending in -es but not -ses typically drop the -es
    if (!result.endsWith('ses') && result.endsWith('es')) {
      return result.slice(0, -2);
    }
  } else if (result.endsWith('s') && !result.endsWith('ss') && !result.endsWith('us') && !result.endsWith('is') && result.length > 3) {
    return result.slice(0, -1);
  }
  
  // Handle common verb endings and fix doubled consonants
  if (result.endsWith('ing')) {
    // Check for doubled consonant before -ing
    if (result.length > 4 && isDoubledConsonant(result, -4)) {
      return result.slice(0, -4);
    }
    // Add back 'e' for cases like 'coming' -> 'come'
    if (['com', 'tim', 'nam', 'writ', 'tak', 'mak', 'mov', 'lov', 'giv'].includes(result.slice(0, -3))) {
      return result.slice(0, -3) + 'e';
    }
    return result.length > 4 ? result.slice(0, -3) : result;
  }
  
  if (result.endsWith('ed')) {
    // Check for doubled consonant before -ed
    if (result.length > 3 && isDoubledConsonant(result, -3)) {
      return result.slice(0, -3);
    }
    // Add back 'e' for cases like 'lived' -> 'live'
    if (needsEndingE(result.slice(0, -2))) {
      return result.slice(0, -2) + 'e';
    }
    return result.slice(0, -2);
  }
  
  // Handle more complex suffixes in order of complexity
  const suffixRules = [
    { suffix: 'ational', replacement: 'ate' },
    { suffix: 'tional', replacement: 'tion' },
    { suffix: 'enci', replacement: 'ence' },
    { suffix: 'anci', replacement: 'ance' },
    { suffix: 'izer', replacement: 'ize' },
    { suffix: 'ator', replacement: 'ate' },
    { suffix: 'alism', replacement: 'al' },
    { suffix: 'iveness', replacement: 'ive' },
    { suffix: 'fulness', replacement: 'ful' },
    { suffix: 'ousness', replacement: 'ous' },
    { suffix: 'aliti', replacement: 'al' },
    { suffix: 'iviti', replacement: 'ive' },
    { suffix: 'biliti', replacement: 'ble' },
    { suffix: 'ement', replacement: '' },
    { suffix: 'ment', replacement: '' },
    { suffix: 'ness', replacement: '' },
    { suffix: 'ful', replacement: '' },
    { suffix: 'ity', replacement: '' },
    { suffix: 'ism', replacement: '' },
    { suffix: 'ous', replacement: '' },
    { suffix: 'ive', replacement: '' },
    { suffix: 'ize', replacement: '' },
    { suffix: 'ise', replacement: '' },
    { suffix: 'able', replacement: '' },
    { suffix: 'ible', replacement: '' },
    { suffix: 'ant', replacement: '' },
    { suffix: 'ent', replacement: '' },
    { suffix: 'al', replacement: '' },
    { suffix: 'er', replacement: '' },
    { suffix: 'ly', replacement: '' }
  ];
  
  for (const { suffix, replacement } of suffixRules) {
    if (result.endsWith(suffix) && result.length > suffix.length + 2) {
      return result.slice(0, -suffix.length) + replacement;
    }
  }
  
  return result;
};

// Helper function to check if a word ends with a doubled consonant
function isDoubledConsonant(word: string, position: number): boolean {
  if (Math.abs(position) >= word.length) return false;
  
  const charPos = position < 0 ? word.length + position : position;
  const prevCharPos = charPos - 1;
  
  if (prevCharPos < 0) return false;
  
  const char = word[charPos];
  const prevChar = word[prevCharPos];
  
  const isConsonant = (c: string) => !/[aeiou]/.test(c);
  
  return char === prevChar && isConsonant(char);
}

// Helper function to determine if a word stem needs an 'e' at the end
function needsEndingE(stem: string): boolean {
  // Common stems that should end in 'e'
  const eStems = [
    'liv', 'lov', 'mov', 'hav', 'writ', 'rid', 'mak', 'tak', 'giv',
    'com', 'car', 'dar', 'shar', 'prepar', 'car', 'declar', 'compar'
  ];
  
  return eStems.includes(stem);
}

// Enhanced stopwords list
export const stopwords = new Set([
  'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 
  'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 
  'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 
  'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 
  'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 
  'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 
  'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 
  'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 
  'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 
  'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 
  'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 
  'will', 'just', 'don', 'don\'t', 'should', 'should\'ve', 'now', 'd', 'll', 'm', 'o', 're', 
  've', 'y', 'ain', 'aren', 'aren\'t', 'couldn', 'couldn\'t', 'didn', 'didn\'t', 'doesn', 
  'doesn\'t', 'hadn', 'hadn\'t', 'hasn', 'hasn\'t', 'haven', 'haven\'t', 'isn', 'isn\'t', 
  'ma', 'mightn', 'mightn\'t', 'mustn', 'mustn\'t', 'needn', 'needn\'t', 'shan', 'shan\'t', 
  'shouldn', 'shouldn\'t', 'wasn', 'wasn\'t', 'weren', 'weren\'t', 'won', 'won\'t', 'wouldn', 
  'wouldn\'t'
]);

export const removeStopwords = (tokens: string[]): string[] => {
  return tokens.filter(token => 
    !stopwords.has(token.toLowerCase()) && 
    !/^[.,!?;:]$/.test(token) && // Remove punctuation tokens
    token.length > 1 // Remove single characters
  );
};

// Improved sentiment analysis 
export const analyzeSentiment = (text: string) => {
  const positiveWords = new Set([
    'good', 'great', 'awesome', 'excellent', 'happy', 'love', 'wonderful',
    'fantastic', 'amazing', 'beautiful', 'best', 'perfect', 'brilliant',
    'delighted', 'excited', 'grateful', 'lovely', 'outstanding', 'pleased',
    'terrific', 'thrilled', 'superb', 'magnificent', 'marvelous', 'enjoy',
    'positive', 'joy', 'joyful', 'pleasant', 'satisfied', 'success', 'successful',
    'win', 'winning', 'victory', 'victorious', 'achievement', 'achieve', 'accomplished',
    'accomplishment', 'impressive', 'exceptional', 'extraordinary', 'remarkable',
    'incredible', 'splendid', 'sublime', 'adore', 'cherish', 'delight', 'delightful',
    'glad', 'happiness', 'cheerful', 'blessing', 'blessed', 'fortunate', 'lucky',
    'prosperous', 'triumph', 'triumphant'
  ]);

  const negativeWords = new Set([
    'bad', 'terrible', 'awful', 'horrible', 'sad', 'hate', 'worst',
    'poor', 'disappointing', 'negative', 'wrong', 'failed', 'ugly',
    'angry', 'furious', 'upset', 'irritated', 'frustrated', 'annoyed',
    'miserable', 'devastated', 'terrible', 'dreadful', 'inferior', 'pathetic',
    'inadequate', 'mediocre', 'disastrous', 'ruined', 'broken', 'abysmal',
    'atrocious', 'appalling', 'dire', 'grim', 'bleak', 'depressing', 'depressed',
    'unhappy', 'sorrowful', 'regretful', 'remorseful', 'despairing', 'despair',
    'grief', 'grievous', 'lamentable', 'woeful', 'wretched', 'painful', 'hurt',
    'distressed', 'suffering', 'agony', 'agonizing', 'unbearable', 'intolerable'
  ]);

  // Add negation handling
  const negations = new Set(['not', 'no', 'never', 'neither', 'nor', 'barely', 'hardly', 'scarcely', 'seldom', "don't", "doesn't", "didn't", "won't", "wouldn't", "can't", "cannot", "couldn't"]);
  
  // Intensifiers and diminishers
  const intensifiers = new Set(['very', 'extremely', 'absolutely', 'completely', 'totally', 'utterly', 'really', 'truly', 'highly', 'especially', 'exceedingly', 'immensely', 'enormously', 'extraordinarily']);
  const diminishers = new Set(['somewhat', 'slightly', 'barely', 'hardly', 'scarcely', 'rarely', 'seldom', 'occasionally', 'partially', 'kind of', 'sort of', 'relatively', 'moderately', 'a bit', 'a little']);

  const tokens = text.toLowerCase().match(/[\w']+|[.,!?;:]/g) || [];
  
  let score = 0;
  let wordCount = 0;
  let isNegated = false;
  let intensityMultiplier = 1;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i].toLowerCase();
    
    // Check for negations
    if (negations.has(token)) {
      isNegated = true;
      continue;
    }
    
    // Check for intensifiers/diminishers
    if (intensifiers.has(token)) {
      intensityMultiplier = 1.5;
      continue;
    }
    
    if (diminishers.has(token)) {
      intensityMultiplier = 0.5;
      continue;
    }
    
    // Handle sentiment words
    if (positiveWords.has(token)) {
      score += isNegated ? -1 * intensityMultiplier : 1 * intensityMultiplier;
      wordCount++;
      isNegated = false;
      intensityMultiplier = 1;
    } else if (negativeWords.has(token)) {
      score += isNegated ? 1 * intensityMultiplier : -1 * intensityMultiplier;
      wordCount++;
      isNegated = false;
      intensityMultiplier = 1;
    }
    
    // Reset negation after punctuation
    if (/[.,!?;:]/.test(token)) {
      isNegated = false;
      intensityMultiplier = 1;
    }
  }

  // Calculate normalized score with nonlinear normalization for more extreme results
  const normalizedScore = wordCount > 0 
    ? Math.tanh(score / Math.sqrt(wordCount + 1)) // tanh ensures value between -1 and 1
    : 0;
  
  return {
    score: normalizedScore,
    label: normalizedScore > 0.15 ? 'positive' : 
           normalizedScore < -0.15 ? 'negative' : 'neutral'
  };
};

// Improved language detection patterns
const languagePatterns = {
  english: /^[a-zA-Z\s.,!?'"-]+$/,
  spanish: /[áéíóúüñ¿¡]/i,
  french: /[àâçéèêëîïôûùüÿœæ]/i,
  german: /[äöüßÄÖÜ]/i,
  italian: /[àèéìíîòóùú]/i,
  portuguese: /[ãõáéíóúçâêôà]/i,
  russian: /[а-яА-Я]/,
  chinese: /[\u4e00-\u9fff]/,
  japanese: /[\u3040-\u309f\u30a0-\u30ff]/,
  korean: /[\uac00-\ud7af]/,
  arabic: /[\u0600-\u06ff]/,
  hindi: /[\u0900-\u097f]/,
};

export const detectLanguage = (text: string): string => {
  if (!text.trim()) return 'Unknown';
  
  for (const [language, pattern] of Object.entries(languagePatterns)) {
    if (pattern.test(text)) {
      return language.charAt(0).toUpperCase() + language.slice(1);
    }
  }
  
  // Default to English for Latin-script text without special characters
  if (/^[a-zA-Z\s.,!?'"-]+$/.test(text)) {
    return 'English';
  }
  
  return 'Unknown';
};

// Greatly improved part of speech tagging
export const posTag = (text: string) => {
  // Comprehensive part-of-speech categories
  const categories = {
    NOUN: new Set([
      // Common nouns
      'time', 'person', 'year', 'way', 'day', 'thing', 'man', 'world', 'life', 'hand', 
      'part', 'child', 'eye', 'woman', 'place', 'work', 'week', 'case', 'point', 'government', 
      'company', 'number', 'group', 'problem', 'fact', 'cat', 'dog', 'house', 'tree', 'book', 
      'car', 'city', 'food', 'computer', 'phone', 'table', 'chair', 'window', 'door', 'floor', 
      'wall', 'room', 'family', 'history', 'money', 'water', 'people', 'business', 'issue', 
      'team', 'area', 'program', 'question', 'job', 'home', 'school', 'country', 'state',
      'information', 'power', 'data', 'system', 'research', 'development', 'software', 'hardware',
      'user', 'news', 'idea', 'solution', 'project', 'product', 'market', 'industry', 'story',
      'internet', 'website', 'browser', 'application'
    ]),
    PROPER_NOUN: new Set([
      // Locations
      'london', 'paris', 'tokyo', 'berlin', 'rome', 'madrid', 'moscow', 'beijing', 'nyc', 
      'york', 'angeles', 'francisco', 'chicago', 'boston', 'seattle', 'washington', 'dallas',
      'miami', 'atlanta', 'denver', 'america', 'europe', 'asia', 'africa', 'australia',
      'india', 'china', 'japan', 'brazil', 'canada', 'mexico', 'germany', 'france', 'italy',
      'spain', 'russia', 'uk', 'states', 'kingdom', 'zealand',
      // Organizations
      'google', 'microsoft', 'apple', 'amazon', 'facebook', 'tesla', 'samsung', 'ibm', 
      'netflix', 'twitter', 'intel', 'nike', 'coca-cola', 'toyota', 'disney', 'adidas',
      // Days, months
      'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
      'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august',
      'september', 'october', 'november', 'december'
    ]),
    PRONOUN: new Set([
      'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
      'my', 'your', 'his', 'its', 'our', 'their', 'myself', 'yourself', 'himself', 
      'herself', 'itself', 'ourselves', 'themselves', 'this', 'that', 'these', 'those',
      'who', 'whom', 'whose', 'which', 'what', 'whatever', 'whoever', 'whomever',
      'anyone', 'everyone', 'someone', 'anything', 'everything', 'something',
      'nothing', 'nobody', 'everybody', 'somebody', 'few', 'many', 'several', 'all',
      'some', 'none', 'one', 'both', 'either', 'neither'
    ]),
    VERB: new Set([
      // Be verbs
      'am', 'is', 'are', 'was', 'were', 'be', 'being', 'been',
      // Have verbs
      'have', 'has', 'had', 'having',
      // Do verbs
      'do', 'does', 'did', 'doing',
      // Modal verbs
      'can', 'could', 'may', 'might', 'shall', 'should', 'will', 'would', 'must',
      // Common verbs
      'go', 'goes', 'going', 'went', 'gone', 'make', 'makes', 'making', 'made',
      'take', 'takes', 'taking', 'took', 'taken', 'get', 'gets', 'getting', 'got',
      'see', 'sees', 'seeing', 'saw', 'seen', 'know', 'knows', 'knowing', 'knew',
      'known', 'want', 'wants', 'wanting', 'wanted', 'think', 'thinks', 'thinking',
      'thought', 'come', 'comes', 'coming', 'came', 'look', 'looks', 'looking', 'looked',
      'use', 'uses', 'using', 'used', 'find', 'finds', 'finding', 'found', 'give',
      'gives', 'giving', 'gave', 'given', 'tell', 'tells', 'telling', 'told',
      'work', 'works', 'working', 'worked', 'call', 'calls', 'calling', 'called',
      'try', 'tries', 'trying', 'tried', 'ask', 'asks', 'asking', 'asked', 'need',
      'needs', 'needing', 'needed', 'feel', 'feels', 'feeling', 'felt', 'become',
      'becomes', 'becoming', 'became', 'leave', 'leaves', 'leaving', 'left', 'put',
      'puts', 'putting', 'mean', 'means', 'meaning', 'meant', 'keep', 'keeps',
      'keeping', 'kept', 'let', 'lets', 'letting', 'begin', 'begins', 'beginning',
      'began', 'begun', 'help', 'helps', 'helping', 'helped', 'talk', 'talks',
      'talking', 'talked', 'turn', 'turns', 'turning', 'turned', 'start', 'starts',
      'starting', 'started', 'show', 'shows', 'showing', 'showed', 'shown', 'hear',
      'hears', 'hearing', 'heard', 'play', 'plays', 'playing', 'played', 'run',
      'runs', 'running', 'ran', 'move', 'moves', 'moving', 'moved', 'live', 'lives',
      'living', 'lived', 'believe', 'believes', 'believing', 'believed', 'bring',
      'brings', 'bringing', 'brought', 'happen', 'happens', 'happening', 'happened',
      'write', 'writes', 'writing', 'wrote', 'written', 'provide', 'provides',
      'providing', 'provided', 'sit', 'sits', 'sitting', 'sat', 'stand', 'stands',
      'standing', 'stood', 'lose', 'loses', 'losing', 'lost', 'pay', 'pays', 'paying',
      'paid', 'meet', 'meets', 'meeting', 'met', 'include', 'includes', 'including',
      'included', 'learn', 'learns', 'learning', 'learned', 'learnt', 'change',
      'changes', 'changing', 'changed', 'lead', 'leads', 'leading', 'led', 'understand',
      'understands', 'understanding', 'understood', 'watch', 'watches', 'watching',
      'watched', 'follow', 'follows', 'following', 'followed'
    ]),
    ADJECTIVE: new Set([
      'good', 'new', 'first', 'last', 'long', 'great', 'little', 'own', 'other',
      'old', 'right', 'big', 'high', 'different', 'small', 'large', 'next', 'early',
      'young', 'important', 'few', 'public', 'bad', 'same', 'able', 'beautiful',
      'happy', 'nice', 'sad', 'angry', 'smart', 'clever', 'rich', 'poor', 'thick',
      'thin', 'hot', 'cold', 'warm', 'cool', 'easy', 'hard', 'free', 'true', 'false',
      'real', 'full', 'empty', 'cheap', 'expensive', 'flat', 'round', 'slow', 'fast',
      'deep', 'shallow', 'clean', 'dirty', 'strong', 'weak', 'safe', 'dangerous',
      'great', 'terrible', 'horrible', 'fantastic', 'wonderful', 'amazing', 'awful',
      'perfect', 'simple', 'complex', 'basic', 'advanced', 'effective', 'ineffective',
      'efficient', 'inefficient', 'reliable', 'unreliable', 'useful', 'useless',
      'interesting', 'boring', 'exciting', 'dull', 'bright', 'dark', 'light', 'heavy'
    ]),
    ADVERB: new Set([
      'very', 'also', 'often', 'however', 'too', 'usually', 'really', 'early',
      'never', 'always', 'sometimes', 'together', 'likely', 'simply', 'generally',
      'instead', 'actually', 'again', 'rather', 'almost', 'especially', 'ever',
      'quickly', 'probably', 'already', 'below', 'directly', 'therefore', 'else',
      'thus', 'easily', 'eventually', 'exactly', 'certainly', 'normally', 'currently',
      'extremely', 'finally', 'constantly', 'properly', 'soon', 'specifically',
      'suddenly', 'tomorrow', 'yesterday', 'tonight', 'alone', 'ahead', 'super',
      'maybe', 'otherwise', 'entirely', 'anyway', 'perfectly', 'seriously', 'obviously',
      'clearly', 'definitely', 'absolutely', 'completely', 'totally', 'fully',
      'significantly', 'deliberately', 'merely', 'solely', 'virtually', 'somewhere',
      'anywhere', 'everywhere', 'nowhere', 'somehow', 'anyhow', 'nonetheless',
      'nevertheless', 'notwithstanding', 'yet', 'still', 'further', 'furthermore'
    ]),
    PREPOSITION: new Set([
      'of', 'in', 'to', 'for', 'with', 'on', 'at', 'from', 'by', 'about', 'as',
      'into', 'like', 'through', 'after', 'over', 'between', 'out', 'against',
      'during', 'without', 'before', 'under', 'around', 'among', 'until', 'within',
      'along', 'above', 'behind', 'near', 'since', 'across', 'despite', 'towards',
      'inside', 'upon', 'concerning', 'unto', 'amid', 'throughout', 'beside',
      'besides', 'except', 'beyond', 'towards', 'underneath', 'beneath', 'versus',
      'outside', 'according to', 'because of', 'instead of', 'regardless of',
      'prior to', 'subsequent to', 'due to', 'apart from', 'ahead of', 'along with'
    ]),
    DETERMINER: new Set([
      'the', 'a', 'an', 'this', 'that', 'these', 'those', 'my', 'your', 'his', 'her',
      'its', 'our', 'their', 'some', 'any', 'many', 'much', 'few', 'little', 'other',
      'another', 'such', 'what', 'whatever', 'which', 'whichever', 'either', 'neither',
      'each', 'every', 'both', 'all', 'half', 'several', 'enough', 'own', 'certain'
    ]),
    CONJUNCTION: new Set([
      'and', 'but', 'or', 'yet', 'so', 'for', 'nor', 'because', 'although', 'though',
      'even though', 'while', 'if', 'unless', 'until', 'since', 'when', 'whenever',
      'where', 'wherever', 'after', 'before', 'as', 'whether', 'than', 'that', 'who',
      'whoever', 'whom', 'whomever', 'whose', 'which', 'whichever', 'what', 'whatever',
      'how', 'however', 'therefore', 'thus', 'consequently', 'furthermore', 'moreover',
      'nevertheless', 'meanwhile'
    ]),
    INTERJECTION: new Set([
      'oh', 'wow', 'ouch', 'oops', 'hey', 'hi', 'hello', 'bye', 'goodbye', 'yeah',
      'well', 'hmm', 'uh', 'er', 'um', 'ah', 'yikes', 'gosh', 'golly', 'aha', 'yay',
      'hurray', 'bingo', 'alas', 'damn', 'darn', 'shoot', 'whoa', 'bravo', 'hooray',
      'congratulations', 'ha', 'thanks', 'please', 'ok', 'okay'
    ])
  };

  const tokens = [];
  const words = text.match(/[\w']+|[.,!?;:\(\)\[\]"']/g) || [];
  
  // More sophisticated POS tagging with context awareness
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const lowered = word.toLowerCase();
    
    // Handle numbers
    if (/^\d+(\.\d+)?$/.test(word)) {
      tokens.push({ word, pos: 'NUMBER' });
      continue;
    }
    
    // Handle punctuation
    if (/^[.,!?;:\(\)\[\]"']$/.test(word)) {
      tokens.push({ word, pos: 'PUNCTUATION' });
      continue;
    }
    
    // Check for proper nouns (capitalized words not at the start of a sentence)
    if (i > 0 && 
        !/[.!?]\s*$/.test(words[i-1]) && // Not after end of sentence
        word[0] === word[0].toUpperCase() && 
        word[0] !== word[0].toLowerCase()) { // Truly uppercase, not just a symbol
      tokens.push({ word, pos: 'PROPER_NOUN' });
      continue;
    }
    
    // Check against all our categories
    let found = false;
    for (const [pos, wordSet] of Object.entries(categories)) {
      if (wordSet.has(lowered)) {
        tokens.push({ word, pos });
        found = true;
        break;
      }
    }
    
    if (found) continue;
    
    // Enhanced pattern recognition
    if (i === 0 && word[0] === word[0].toUpperCase()) {
      // First word of sentence capitalized - check if it's a proper noun in our list
      if (categories.PROPER_NOUN.has(lowered)) {
        tokens.push({ word, pos: 'PROPER_NOUN' });
      } else {
        // Apply other rules for first word
        if (categories.PRONOUN.has(lowered)) {
          tokens.push({ word, pos: 'PRONOUN' });
        } else if (categories.VERB.has(lowered)) {
          tokens.push({ word, pos: 'VERB' });
        } else if (word.endsWith('ly')) {
          tokens.push({ word, pos: 'ADVERB' });
        } else if (word.endsWith('ing')) {
          tokens.push({ word, pos: 'VERB' });
        } else if (word.endsWith('ed')) {
          tokens.push({ word, pos: 'VERB' });
        } else {
          tokens.push({ word, pos: 'NOUN' }); // Default for capitalized first word
        }
      }
      continue;
    }
    
    // Apply suffix rules
    if (lowered.endsWith('ly')) {
      tokens.push({ word, pos: 'ADVERB' });
    } else if (lowered.endsWith('ing')) {
      tokens.push({ word, pos: 'VERB' });
    } else if (lowered.endsWith('ed')) {
      tokens.push({ word, pos: 'VERB' });
    } else if (lowered.endsWith('tion') || lowered.endsWith('sion') || lowered.endsWith('ment') || lowered.endsWith('ness') || lowered.endsWith('ity')) {
      tokens.push({ word, pos: 'NOUN' });
    } else if (lowered.endsWith('ful') || lowered.endsWith('ous') || lowered.endsWith('ish') || lowered.endsWith('ive') || lowered.endsWith('able') || lowered.endsWith('ible') || lowered.endsWith('al') || lowered.endsWith('ic') || lowered.endsWith('ant') || lowered.endsWith('ent')) {
      tokens.push({ word, pos: 'ADJECTIVE' });
    } else if (lowered.endsWith('ly')) { 
      tokens.push({ word, pos: 'ADVERB' });
    } else if (i > 0 && (words[i-1].toLowerCase() === 'the' || words[i-1].toLowerCase() === 'a' || words[i-1].toLowerCase() === 'an')) {
      // After article, likely a noun
      tokens.push({ word, pos: 'NOUN' });
    } else if (i > 0 && categories.ADJECTIVE.has(words[i-1].toLowerCase())) {
      // After adjective, likely a noun
      tokens.push({ word, pos: 'NOUN' });
    } else if (i < words.length - 1 && categories.VERB.has(words[i+1].toLowerCase())) {
      // Before verb, likely a noun or pronoun
      tokens.push({ word, pos: 'NOUN' });
    } else {
      // Default for unknown words
      tokens.push({ word, pos: 'OTHER' });
    }
  }
  
  return tokens;
};
