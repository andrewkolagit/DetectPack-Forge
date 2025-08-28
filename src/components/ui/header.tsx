import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export function Header() {
  return (
    <motion.header 
      className="sticky top-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-sm"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="container mx-auto max-w-5xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">DetectPack Forge</h1>
              <p className="text-sm text-muted-foreground">Natural language → Detection rules</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
              <div className="status-dot status-online" />
              <span>Ready</span>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}