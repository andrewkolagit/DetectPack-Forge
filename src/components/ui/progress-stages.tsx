import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ProgressStagesProps {
  currentStage: number;
  stages: string[];
}

export function ProgressStages({ currentStage, stages }: ProgressStagesProps) {
  return (
    <div className="space-y-4">
      {stages.map((stage, index) => {
        const isActive = index === currentStage;
        const isCompleted = index < currentStage;
        const isPending = index > currentStage;
        
        return (
          <motion.div
            key={stage}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex-shrink-0">
              {isCompleted ? (
                <div className="h-6 w-6 rounded-full bg-success flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
              ) : isActive ? (
                <motion.div
                  className="h-6 w-6 rounded-full bg-primary flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="h-3 w-3 text-primary-foreground" />
                </motion.div>
              ) : (
                <div className="h-6 w-6 rounded-full bg-muted" />
              )}
            </div>
            
            <p className={`text-sm font-medium transition-colors ${
              isActive ? 'text-foreground' : 
              isCompleted ? 'text-success' : 
              'text-muted-foreground'
            }`}>
              {stage}
            </p>
            
            {isActive && (
              <motion.div
                className="flex gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {[0, 1, 2].map((dot) => (
                  <motion.div
                    key={dot}
                    className="h-1 w-1 rounded-full bg-primary"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: dot * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}