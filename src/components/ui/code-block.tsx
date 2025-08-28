import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';
import { cn } from '@/lib/utils';
import type { CodeLanguage } from '@/types/detection';

interface CodeBlockProps {
  code: string;
  language: CodeLanguage;
  title?: string;
}

export function CodeBlock({ code, language, title }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-code-border bg-code-bg">
      {title && (
        <div className="flex items-center justify-between border-b border-code-border px-4 py-3">
          <h4 className="text-sm font-medium text-foreground">{title}</h4>
          <span className="text-xs text-muted-foreground uppercase tracking-wide">
            {language}
          </span>
        </div>
      )}
      
      <div className="relative">
        <pre className={cn(
          "overflow-x-auto p-4 text-sm font-mono leading-relaxed",
          "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border"
        )}>
          <code className={`language-${language} text-foreground`}>
            {code}
          </code>
        </pre>
        
        <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleCopy}
            className={cn(
              "h-8 w-8 p-0 transition-all duration-200",
              isCopied && "bg-success/20 text-success"
            )}
            aria-label={`Copy ${language.toUpperCase()}`}
          >
            <AnimatePresence mode="wait">
              {isCopied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Check className="h-4 w-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Copy className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function CodeBlockSkeleton({ title }: { title?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-code-border bg-code-bg">
      {title && (
        <div className="border-b border-code-border px-4 py-3">
          <div className="h-4 w-20 skeleton rounded" />
        </div>
      )}
      <div className="p-4 space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "h-4 skeleton rounded",
              i % 3 === 0 ? "w-3/4" : i % 3 === 1 ? "w-full" : "w-5/6"
            )} 
          />
        ))}
      </div>
    </div>
  );
}