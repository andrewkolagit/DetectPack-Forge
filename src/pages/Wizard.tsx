import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, FileText, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { StepIndicator } from '@/components/ui/step-indicator';
import { ModeCard } from '@/components/ui/mode-card';
import { EnhancedTextarea } from '@/components/ui/enhanced-textarea';
import { ProgressStages } from '@/components/ui/progress-stages';
import { useToast } from '@/hooks/use-toast';
import { EXAMPLES } from '@/lib/sample-data';
import type { WizardState } from '@/types/detection';

const GENERATION_STAGES = [
  "Understanding behavior",
  "Generating detections", 
  "Finalizing output"
];

export default function Wizard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [state, setState] = useState<WizardState>({
    step: 1,
    input: '',
    isLoading: false
  });

  const [generationStage, setGenerationStage] = useState(0);

  const handleModeSelect = (mode: 'describe' | 'logs') => {
    setState(prev => ({ ...prev, mode, step: 2 }));
  };

  const handleInputChange = (value: string) => {
    setState(prev => ({ ...prev, input: value, error: undefined }));
  };

  const handleNext = () => {
    if (!state.input.trim()) {
      setState(prev => ({ ...prev, error: 'Please provide some input' }));
      return;
    }
    setState(prev => ({ ...prev, step: 3, error: undefined }));
  };

  const handleGenerate = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: undefined }));
    setGenerationStage(0);

    try {
      // Simulate staged progress
      for (let stage = 0; stage < GENERATION_STAGES.length; stage++) {
        setGenerationStage(stage);
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      // In a real app, this would POST to N8N_WEBHOOK_URL
      const requestPayload = {
        mode: state.mode,
        [state.mode === 'describe' ? 'text' : 'logs']: state.input
      };

      console.log('Would send to webhook:', requestPayload);

      // Navigate to results with a sample ID
      navigate('/result/sample');
      
      toast({
        title: "Detection pack generated!",
        description: "Your detection rules are ready to review.",
      });

    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to generate detection pack. Please try again.',
        isLoading: false 
      }));
      
      toast({
        title: "Generation failed",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    }
  };

  const handleBack = () => {
    if (state.step === 2) {
      setState(prev => ({ ...prev, step: 1, mode: undefined }));
    } else if (state.step === 3) {
      setState(prev => ({ ...prev, step: 2 }));
    }
  };

  const getPlaceholder = () => {
    if (state.mode === 'describe') {
      return "Describe suspicious behavior, for example:\n\n" + EXAMPLES.describe;
    }
    return "Paste your log samples here:\n\n" + EXAMPLES.logs;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-6 py-12">
        <StepIndicator currentStep={state.step} totalSteps={3} />

        <AnimatePresence mode="wait">
          {/* Step 1: Mode Selection */}
          {state.step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h1 className="mb-4 text-3xl font-bold text-foreground">
                  Create Detection Pack
                </h1>
                <p className="text-lg text-muted-foreground">
                  Choose how you'd like to provide input
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <ModeCard
                  icon={MessageSquare}
                  title="Describe Behavior"
                  description="Tell us about suspicious activity in natural language"
                  isSelected={state.mode === 'describe'}
                  onClick={() => handleModeSelect('describe')}
                />
                
                <ModeCard
                  icon={FileText}
                  title="Paste Logs"
                  description="Provide sample log entries that show the suspicious behavior"
                  isSelected={state.mode === 'logs'}
                  onClick={() => handleModeSelect('logs')}
                />
              </div>
            </motion.div>
          )}

          {/* Step 2: Input Details */}
          {state.step === 2 && state.mode && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h1 className="mb-4 text-3xl font-bold text-foreground">
                  {state.mode === 'describe' ? 'Describe the Behavior' : 'Provide Log Samples'}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {state.mode === 'describe' 
                    ? 'Describe the suspicious activity you want to detect'
                    : 'Paste log entries that demonstrate the suspicious behavior'
                  }
                </p>
              </div>

              <Card className="p-8">
                <div className="space-y-4">
                  <Label htmlFor="input" className="text-base font-medium">
                    {state.mode === 'describe' ? 'Behavior Description' : 'Log Samples'}
                  </Label>
                  
                  <EnhancedTextarea
                    id="input"
                    value={state.input}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder={getPlaceholder()}
                    isMonospace={state.mode === 'logs'}
                    className="min-h-[200px]"
                  />
                  
                  {state.error && (
                    <motion.p
                      className="text-sm text-destructive"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {state.error}
                    </motion.p>
                  )}
                </div>
              </Card>

              <div className="flex justify-between">
                <Button variant="secondary" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                
                <Button onClick={handleNext}>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Review & Generate */}
          {state.step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h1 className="mb-4 text-3xl font-bold text-foreground">
                  Review & Generate
                </h1>
                <p className="text-lg text-muted-foreground">
                  Ready to generate your detection pack
                </p>
              </div>

              {state.isLoading ? (
                <Card className="p-8">
                  <div className="text-center space-y-6">
                    <div className="mx-auto w-fit">
                      <ProgressStages 
                        currentStage={generationStage} 
                        stages={GENERATION_STAGES} 
                      />
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      Working… (Step {generationStage + 1} of {GENERATION_STAGES.length}: {GENERATION_STAGES[generationStage]})
                    </p>
                  </div>
                </Card>
              ) : (
                <>
                  <Card className="p-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        {state.mode === 'describe' ? (
                          <MessageSquare className="h-5 w-5 text-primary" />
                        ) : (
                          <FileText className="h-5 w-5 text-primary" />
                        )}
                        <h3 className="text-lg font-semibold text-foreground">
                          {state.mode === 'describe' ? 'Behavior Description' : 'Log Samples'}
                        </h3>
                      </div>
                      
                      <div className="rounded-xl border border-border bg-muted/50 p-4">
                        <pre className={`text-sm text-foreground whitespace-pre-wrap ${
                          state.mode === 'logs' ? 'font-mono' : ''
                        }`}>
                          {state.input}
                        </pre>
                      </div>
                    </div>
                  </Card>

                  <div className="flex justify-between">
                    <Button variant="secondary" onClick={handleBack}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    
                    <Button onClick={handleGenerate} className="hover-lift">
                      Generate Detection Pack
                      <Loader2 className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}

              {state.error && (
                <Card className="border-destructive bg-destructive/5 p-6">
                  <motion.div
                    className="flex items-center gap-3"
                    animate={{ x: [0, -6, 6, -4, 4, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm text-destructive">{state.error}</p>
                  </motion.div>
                </Card>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}