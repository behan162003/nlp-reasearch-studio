
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const ChatMessage = ({ message, isBot, sentiment }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex w-full",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      <div className={cn(
        "rounded-lg px-4 py-3 text-sm shadow-sm max-w-[85%]",
        isBot 
          ? "chat-bubble-ai bg-blue-50 text-gray-800 rounded-tl-sm" 
          : "chat-bubble-human bg-blue-500 text-white rounded-tr-sm"
      )}>
        <p className="whitespace-pre-line leading-relaxed">{message}</p>
        
        {isBot && sentiment && (
          <div className="mt-2 pt-2 border-t border-blue-100 text-xs text-gray-500 flex items-center">
            <span className="mr-2">Sentiment:</span>
            <span className={cn(
              "px-1.5 py-0.5 rounded transition-colors",
              sentiment.label === "positive" ? "bg-green-100 text-green-700" :
              sentiment.label === "negative" ? "bg-red-100 text-red-700" :
              "bg-gray-100 text-gray-700"
            )}>
              {sentiment.label} ({Math.round(sentiment.score * 100)}%)
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export { ChatMessage };
