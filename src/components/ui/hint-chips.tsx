import { Shield, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import type { DetectionMeta } from '@/types/detection';

interface HintChipsProps {
  meta?: DetectionMeta;
}

export function HintChips({ meta }: HintChipsProps) {
  if (!meta) return null;

  return (
    <motion.div
      className="flex flex-wrap gap-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, staggerChildren: 0.05 }}
    >
      {/* MITRE ATT&CK Tags */}
      {meta.attack.map((technique, index) => (
        <motion.div
          key={technique}
          className="inline-flex items-center gap-1.5 rounded-lg bg-warning-bg px-3 py-1.5 text-sm font-medium text-warning ring-1 ring-warning-border"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          <Shield className="h-3.5 w-3.5" />
          ATT&CK: {technique}
        </motion.div>
      ))}
      
      {/* Log Source */}
      <motion.div
        className="inline-flex items-center gap-1.5 rounded-lg bg-info/10 px-3 py-1.5 text-sm font-medium text-foreground ring-1 ring-info/20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: meta.attack.length * 0.05 }}
      >
        <Eye className="h-3.5 w-3.5" />
        {meta.logsource.product} / {meta.logsource.service}
      </motion.div>
    </motion.div>
  );
}