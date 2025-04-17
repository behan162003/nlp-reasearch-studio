
/**
 * Enhanced grammar and typo correction
 * In a production app, this would connect to an API like LanguageTool,
 * Grammarly, or similar services
 */
export const fixGrammar = (text: string): string => {
  // This is a sophisticated mock implementation
  // In a real app, this would call a proper grammar checking API
  
  let corrected = text;
  
  // Comprehensive grammar and typo corrections
  const corrections = [
    // Capitalization fixes
    { pattern: /(?<=^|\. |\? |\! )([a-z])/g, replacement: (match) => match.toUpperCase() },
    { pattern: /\bi\b/g, replacement: "I" },
    
    // Contractions fixes
    { pattern: /\bim\b/gi, replacement: "I'm" },
    { pattern: /\bIm\b/g, replacement: "I'm" },
    { pattern: /\bdont\b/gi, replacement: "don't" },
    { pattern: /\bcant\b/gi, replacement: "can't" },
    { pattern: /\bwont\b/gi, replacement: "won't" },
    { pattern: /\bisnt\b/gi, replacement: "isn't" },
    { pattern: /\barent\b/gi, replacement: "aren't" },
    { pattern: /\bhavent\b/gi, replacement: "haven't" },
    { pattern: /\bhasnt\b/gi, replacement: "hasn't" },
    { pattern: /\bwasnt\b/gi, replacement: "wasn't" },
    { pattern: /\bwerent\b/gi, replacement: "weren't" },
    { pattern: /\bcouldnt\b/gi, replacement: "couldn't" },
    { pattern: /\bwouldnt\b/gi, replacement: "wouldn't" },
    { pattern: /\bshouldnt\b/gi, replacement: "shouldn't" },
    { pattern: /\bitsnt\b/gi, replacement: "it's not" },
    { pattern: /\bcouldve\b/gi, replacement: "could've" },
    { pattern: /\bwouldve\b/gi, replacement: "would've" },
    { pattern: /\bshoudlve\b/gi, replacement: "should've" },
    { pattern: /\bmustve\b/gi, replacement: "must've" },
    { pattern: /\bmightve\b/gi, replacement: "might've" },
    { pattern: /\bweve\b/gi, replacement: "we've" },
    { pattern: /\btheyve\b/gi, replacement: "they've" },
    { pattern: /\byouve\b/gi, replacement: "you've" },
    
    // Common homophone confusions
    { pattern: /\bthier\b/gi, replacement: "their" },
    { pattern: /\bthey're ([a-z]+)\b/gi, replacement: (match, p1) => {
      return /^(car|house|book|idea|opinion|dog|cat|phone|computer)s?$/i.test(p1) ? `their ${p1}` : match;
    }},
    { pattern: /\btheir (go|com|walk|run|talk|look|seem)/gi, replacement: "they're $1" },
    { pattern: /\byour ([a-z]+)(ing|ed)\b/gi, replacement: "you're $1$2" },
    { pattern: /\byoure ([a-z]+)\b/gi, replacement: (match, p1) => {
      return /^(car|house|book|idea|opinion|dog|cat|phone|computer)s?$/i.test(p1) ? `your ${p1}` : match;
    }},
    { pattern: /\bits ([a-z]+)(ing|ed)\b/gi, replacement: "it's $1$2" },
    { pattern: /\bits a\b/gi, replacement: "it's a" },
    { pattern: /\birs\b/gi, replacement: "it's" },
    { pattern: /\btheres\b/gi, replacement: "there's" },
    { pattern: /\bwheres\b/gi, replacement: "where's" },
    { pattern: /\bhows\b/gi, replacement: "how's" },
    { pattern: /\bwhats\b/gi, replacement: "what's" },
    { pattern: /\bwhos\b/gi, replacement: "who's" },
    { pattern: /\bwhens\b/gi, replacement: "when's" },
    { pattern: /\bwhys\b/gi, replacement: "why's" },
    { pattern: /\bto few\b/gi, replacement: "too few" },
    { pattern: /\bto many\b/gi, replacement: "too many" },
    { pattern: /\bto much\b/gi, replacement: "too much" },
    { pattern: /\bto late\b/gi, replacement: "too late" },
    { pattern: /\bto early\b/gi, replacement: "too early" },
    { pattern: /\bkown\b/gi, replacement: "known" },
    { pattern: /\bknwo\b/gi, replacement: "know" },
    { pattern: /\bwoudl\b/gi, replacement: "would" },
    { pattern: /\bcoudl\b/gi, replacement: "could" },
    { pattern: /\bshoudl\b/gi, replacement: "should" },
    
    // Sentence-level grammar fixes
    { pattern: /([a-z]+[?!.]) +([a-z])/gi, replacement: (match, p1, p2) => p1 + " " + p2.toUpperCase() },
    { pattern: /\b([a-z]+) and i\b/gi, replacement: (match, p1) => p1 + " and I" },
    { pattern: /([.!?]) +i\b/g, replacement: "$1 I" },
    
    // Spacing fixes
    { pattern: / +([,.!?:;])/g, replacement: "$1" },
    { pattern: /([,.!?:;])([a-zA-Z])/g, replacement: "$1 $2" },
    { pattern: /([a-z])([.!?]) ([a-z])/gi, replacement: (match, p1, p2, p3) => p1 + p2 + " " + p3.toUpperCase() },
    { pattern: / +/g, replacement: " " },  // Remove multiple spaces
    
    // Common misspellings
    { pattern: /\brecieve\b/gi, replacement: "receive" },
    { pattern: /\bwierd\b/gi, replacement: "weird" },
    { pattern: /\bbelive\b/gi, replacement: "believe" },
    { pattern: /\bfreind\b/gi, replacement: "friend" },
    { pattern: /\bfortunatly\b/gi, replacement: "fortunately" },
    { pattern: /\bunfortunatly\b/gi, replacement: "unfortunately" },
    { pattern: /\bseperate\b/gi, replacement: "separate" },
    { pattern: /\bdefinately\b/gi, replacement: "definitely" },
    { pattern: /\bquite([^aeiou])/gi, replacement: "quiet$1" },
    { pattern: /\bquite a([^aeiou])/gi, replacement: "quiet a$1" },
    { pattern: /\balot\b/gi, replacement: "a lot" },
    { pattern: /\balright\b/gi, replacement: "all right" },
    { pattern: /\bthru\b/gi, replacement: "through" },
    { pattern: /\btho\b/gi, replacement: "though" },
  ];
  
  // Apply all corrections
  corrections.forEach(({ pattern, replacement }) => {
    corrected = corrected.replace(pattern, replacement as string);
  });
  
  // Ensure first letter is capitalized
  corrected = corrected.charAt(0).toUpperCase() + corrected.slice(1);
  
  // Ensure proper sentence endings
  if (!/[.!?]$/.test(corrected)) {
    corrected += ".";
  }
  
  return corrected;
};

/**
 * Enhanced text paraphrasing
 * In a production app, this would connect to an API like GPT or similar
 */
export const paraphraseText = (text: string): string => {
  // This is a sophisticated mock implementation
  // In a real app, this would call a proper paraphrasing API
  
  // Comprehensive word replacements (synonyms)
  const replacements = [
    { pattern: /\bgood\b/gi, options: ["excellent", "great", "wonderful", "fantastic", "superb", "outstanding", "remarkable", "exceptional"] },
    { pattern: /\bbad\b/gi, options: ["poor", "terrible", "awful", "unpleasant", "subpar", "unsatisfactory", "inferior", "disappointing"] },
    { pattern: /\bhappy\b/gi, options: ["delighted", "pleased", "joyful", "content", "cheerful", "thrilled", "elated", "overjoyed"] },
    { pattern: /\bsad\b/gi, options: ["unhappy", "melancholy", "downcast", "glum", "sorrowful", "dejected", "disheartened", "despondent"] },
    { pattern: /\bangry\b/gi, options: ["furious", "irate", "annoyed", "irritated", "exasperated", "incensed", "enraged", "infuriated"] },
    { pattern: /\bsmall\b/gi, options: ["tiny", "little", "miniature", "compact", "diminutive", "petite", "minute", "microscopic"] },
    { pattern: /\bbig\b/gi, options: ["large", "enormous", "huge", "substantial", "massive", "gigantic", "colossal", "immense"] },
    { pattern: /\blike\b/gi, options: ["enjoy", "appreciate", "fancy", "favor", "admire", "relish", "cherish", "treasure"] },
    { pattern: /\bdislike\b/gi, options: ["detest", "hate", "loathe", "disapprove of", "abhor", "despise", "scorn", "resent"] },
    { pattern: /\bsay\b/gi, options: ["mention", "state", "declare", "express", "articulate", "pronounce", "assert", "verbalize"] },
    { pattern: /\bshow\b/gi, options: ["display", "exhibit", "present", "demonstrate", "reveal", "showcase", "illustrate", "highlight"] },
    { pattern: /\bfast\b/gi, options: ["swift", "rapid", "quick", "speedy", "expeditious", "brisk", "hasty", "fleet"] },
    { pattern: /\bslow\b/gi, options: ["sluggish", "unhurried", "leisurely", "gradual", "plodding", "deliberate", "languid", "tardy"] },
    { pattern: /\bbeautiful\b/gi, options: ["attractive", "gorgeous", "stunning", "exquisite", "lovely", "magnificent", "elegant", "radiant"] },
    { pattern: /\bugly\b/gi, options: ["unattractive", "unsightly", "hideous", "unpleasant", "grotesque", "repulsive", "revolting", "repugnant"] },
    { pattern: /\bimpressive\b/gi, options: ["remarkable", "striking", "outstanding", "extraordinary", "stunning", "astonishing", "astounding", "formidable"] },
    { pattern: /\bdifficult\b/gi, options: ["challenging", "hard", "tough", "demanding", "arduous", "strenuous", "taxing", "laborious"] },
    { pattern: /\beasy\b/gi, options: ["simple", "straightforward", "effortless", "uncomplicated", "painless", "facile", "smooth", "undemanding"] },
    { pattern: /\bimportant\b/gi, options: ["crucial", "essential", "significant", "vital", "critical", "pivotal", "paramount", "fundamental"] },
    { pattern: /\binteresting\b/gi, options: ["fascinating", "intriguing", "engaging", "compelling", "captivating", "absorbing", "enthralling", "gripping"] },
    { pattern: /\bartificial intelligence\b/gi, options: ["AI", "machine intelligence", "computational intelligence", "machine learning systems", "cognitive computing", "smart algorithms"] },
    { pattern: /\bfor example\b/gi, options: ["for instance", "as an illustration", "such as", "e.g.", "by way of example", "to illustrate", "as a case in point", "as an example"] },
    { pattern: /\bin conclusion\b/gi, options: ["to sum up", "finally", "in summary", "to conclude", "in closing", "to wrap up", "all things considered", "in the final analysis"] },
    { pattern: /\bmoreover\b/gi, options: ["furthermore", "in addition", "additionally", "besides", "what's more", "on top of that", "further", "also"] },
    { pattern: /\bhowever\b/gi, options: ["nevertheless", "nonetheless", "yet", "still", "though", "even so", "all the same", "that said"] },
    { pattern: /\btherefore\b/gi, options: ["thus", "consequently", "as a result", "hence", "accordingly", "for this reason", "ergo", "so"] },
    { pattern: /\bvery\b/gi, options: ["extremely", "exceptionally", "exceedingly", "remarkably", "particularly", "notably", "surprisingly", "tremendously"] },
    { pattern: /\balways\b/gi, options: ["consistently", "invariably", "perpetually", "constantly", "without fail", "unfailingly", "routinely", "habitually"] },
    { pattern: /\bnever\b/gi, options: ["not ever", "at no time", "not once", "on no occasion", "not in any way", "by no means", "under no circumstances", "not at all"] },
    { pattern: /\boften\b/gi, options: ["frequently", "regularly", "repeatedly", "commonly", "routinely", "many times", "on numerous occasions", "habitually"] },
    { pattern: /\bquickly\b/gi, options: ["rapidly", "swiftly", "speedily", "hastily", "promptly", "expeditiously", "briskly", "in no time"] },
    { pattern: /\bslowly\b/gi, options: ["gradually", "unhurriedly", "leisurely", "deliberately", "sluggishly", "tardily", "languidly", "at a snail's pace"] },
    { pattern: /\bbut\b/gi, options: ["however", "nevertheless", "yet", "though", "although", "even so", "on the other hand", "conversely"] },
    { pattern: /\band\b/gi, options: ["plus", "as well as", "in addition to", "furthermore", "moreover", "along with", "together with", "also"] },
    { pattern: /\bif\b/gi, options: ["provided that", "assuming that", "on the condition that", "in the event that", "supposing", "given that", "in case", "should"] },
    { pattern: /\bbecause\b/gi, options: ["since", "as", "for the reason that", "owing to the fact that", "due to the fact that", "in view of the fact that", "on account of", "given that"] },
    { pattern: /\bso\b/gi, options: ["therefore", "consequently", "as a result", "thus", "accordingly", "hence", "for this reason", "ergo"] },
    { pattern: /\bseem\b/gi, options: ["appear", "look", "give the impression of", "come across as", "strike one as", "have the appearance of", "present itself as", "be perceived as"] },
    { pattern: /\btell\b/gi, options: ["inform", "notify", "advise", "let know", "communicate to", "make aware", "apprise", "brief"] },
    { pattern: /\bthink\b/gi, options: ["believe", "consider", "assume", "presume", "suppose", "reckon", "guess", "surmise"] },
    { pattern: /\bunderstand\b/gi, options: ["comprehend", "grasp", "fathom", "apprehend", "perceive", "make sense of", "get the idea of", "catch on to"] },
    { pattern: /\bknow\b/gi, options: ["be aware", "be cognizant", "recognize", "realize", "be conscious", "be informed", "be acquainted with", "be familiar with"] },
    { pattern: /\bwant\b/gi, options: ["desire", "wish for", "long for", "crave", "covet", "fancy", "yearn for", "hanker after"] },
    { pattern: /\bneed\b/gi, options: ["require", "necessitate", "demand", "call for", "have occasion for", "be in want of", "be lacking", "have need of"] },
    { pattern: /\blive\b/gi, options: ["reside", "dwell", "inhabit", "occupy", "stay", "abide", "sojourn", "be domiciled"] },
    { pattern: /\blive\b/gi, options: ["reside", "dwell", "inhabit", "occupy", "stay", "abide", "sojourn", "be domiciled"] },
  ];
  
  // Structural changes (more complex paraphrasing)
  const structures = [
    { pattern: /\bI think that\b/gi, options: ["In my opinion,", "I believe that", "It seems to me that", "From my perspective,", "In my view,", "I would say that", "My feeling is that", "As I see it,"] },
    { pattern: /\bIt is (important|necessary|essential|crucial) to\b/gi, options: ["We should", "One must", "It's vital to", "We need to", "It's imperative to", "It's fundamental to", "There's a need to", "It's key to"] },
    { pattern: /\bThe reason for this is\b/gi, options: ["This is because", "This occurs due to", "The explanation is that", "This can be attributed to", "This stems from", "This results from", "The cause of this is", "This arises from"] },
    { pattern: /\bIn order to\b/gi, options: ["To", "So as to", "With the aim of", "For the purpose of", "With the intention of", "As a means to", "In an effort to", "With a view to"] },
    { pattern: /\bAs a result of\b/gi, options: ["Due to", "Because of", "Thanks to", "Owing to", "On account of", "As a consequence of", "As an outcome of", "Stemming from"] },
    { pattern: /\bIt can be seen that\b/gi, options: ["Evidently,", "Clearly,", "Obviously,", "It is apparent that", "One can observe that", "It is noticeable that", "It is evident that", "It is obvious that"] },
    { pattern: /\bIn spite of\b/gi, options: ["Despite", "Regardless of", "Notwithstanding", "Even with", "Even though", "Although", "Though", "Even considering"] },
    { pattern: /\bWith regard to\b/gi, options: ["Concerning", "Regarding", "Pertaining to", "In relation to", "With reference to", "As for", "In terms of", "In respect to"] },
    { pattern: /\bThere are (many|several|numerous|various) (ways|methods|approaches|techniques|strategies) to\b/gi, options: ["We can", "One can", "People can", "It's possible to", "Various approaches exist to", "Multiple strategies can be employed to", "Different methods allow us to", "Several techniques enable one to"] },
    { pattern: /\bIt is (often|commonly|generally|widely|frequently) (believed|thought|said|claimed|assumed|accepted) that\b/gi, options: ["Many people believe that", "Common wisdom suggests that", "Popular opinion holds that", "It's a widespread belief that", "Most people think that", "The general consensus is that", "Conventional wisdom indicates that", "It's typically understood that"] },
    { pattern: /\bfrom my (point of view|perspective|standpoint|viewpoint)\b/gi, options: ["In my opinion", "As I see it", "I believe", "To my mind", "I would say", "I consider", "In my estimation", "According to my thinking"] },
  ];
  
  let paraphrased = text;
  
  // Apply word replacements
  replacements.forEach(({ pattern, options }) => {
    paraphrased = paraphrased.replace(pattern, () => {
      return options[Math.floor(Math.random() * options.length)];
    });
  });
  
  // Apply structural changes
  structures.forEach(({ pattern, options }) => {
    paraphrased = paraphrased.replace(pattern, () => {
      return options[Math.floor(Math.random() * options.length)];
    });
  });
  
  // Ensure first letter is capitalized
  if (paraphrased.length > 0) {
    paraphrased = paraphrased.charAt(0).toUpperCase() + paraphrased.slice(1);
  }
  
  // Ensure proper sentence endings
  if (!/[.!?]$/.test(paraphrased) && paraphrased.length > 0) {
    paraphrased += ".";
  }
  
  return paraphrased;
};
