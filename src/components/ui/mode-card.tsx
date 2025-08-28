import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ModeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

export function ModeCard({ icon: Icon, title, description, isSelected, onClick }: ModeCardProps) {
  return (
    <motion.button
      className={cn(
        "group relative flex w-full flex-col gap-4 rounded-2xl border-2 p-6 text-left transition-all duration-200 hover-lift focus-ring",
        isSelected
          ? "border-primary bg-primary/5 shadow-glow"
          : "border-card-border bg-card hover:border-primary/50 hover:bg-surface-hover"
      )}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className={cn(
        "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
        isSelected 
          ? "bg-primary text-primary-foreground" 
          : "bg-primary/10 text-primary group-hover:bg-primary/20"
      )}>
        <Icon className="h-6 w-6" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
      
      {isSelected && (
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
        />
      )}
    </motion.button>
  );
}