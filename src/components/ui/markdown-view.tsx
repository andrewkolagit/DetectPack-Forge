import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

interface MarkdownViewProps {
  content: string;
  className?: string;
}

export function MarkdownView({ content, className }: MarkdownViewProps) {
  return (
    <div className={cn("prose prose-invert max-w-none", className)}>
      <ReactMarkdown
        components={{
          h1: ({ className, ...props }) => (
            <h1 className={cn("text-2xl font-bold text-foreground mb-4", className)} {...props} />
          ),
          h2: ({ className, ...props }) => (
            <h2 className={cn("text-xl font-semibold text-foreground mb-3 mt-6", className)} {...props} />
          ),
          h3: ({ className, ...props }) => (
            <h3 className={cn("text-lg font-medium text-foreground mb-2 mt-4", className)} {...props} />
          ),
          p: ({ className, ...props }) => (
            <p className={cn("text-foreground mb-4 leading-relaxed", className)} {...props} />
          ),
          ul: ({ className, ...props }) => (
            <ul className={cn("list-disc pl-6 mb-4 space-y-2", className)} {...props} />
          ),
          ol: ({ className, ...props }) => (
            <ol className={cn("list-decimal pl-6 mb-4 space-y-2", className)} {...props} />
          ),
          li: ({ className, ...props }) => (
            <li className={cn("text-foreground", className)} {...props} />
          ),
          code: ({ className, ...props }) => (
            <code className={cn("font-mono text-sm bg-code-bg px-1.5 py-0.5 rounded border", className)} {...props} />
          ),
          pre: ({ className, ...props }) => (
            <pre className={cn("font-mono text-sm bg-code-bg p-4 rounded-xl border border-code-border overflow-x-auto", className)} {...props} />
          ),
          blockquote: ({ className, ...props }) => (
            <blockquote className={cn("border-l-4 border-primary pl-4 italic text-muted-foreground", className)} {...props} />
          ),
          strong: ({ className, ...props }) => (
            <strong className={cn("font-semibold text-foreground", className)} {...props} />
          ),
          em: ({ className, ...props }) => (
            <em className={cn("italic text-foreground", className)} {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}