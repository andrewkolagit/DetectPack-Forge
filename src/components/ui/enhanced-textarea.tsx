import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface EnhancedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isMonospace?: boolean;
}

export const EnhancedTextarea = forwardRef<HTMLTextAreaElement, EnhancedTextareaProps>(
  ({ className, isMonospace = false, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-xl border border-input bg-input px-4 py-3 text-sm transition-colors",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "resize-none",
          isMonospace && "font-mono text-xs leading-relaxed",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

EnhancedTextarea.displayName = "EnhancedTextarea";