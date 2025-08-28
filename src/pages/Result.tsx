import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, ArrowLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HintChips } from '@/components/ui/hint-chips';
import { CodeBlock, CodeBlockSkeleton } from '@/components/ui/code-block';
import { MarkdownView } from '@/components/ui/markdown-view';
import { EmptyState } from '@/components/ui/empty-state';
import { useToast } from '@/hooks/use-toast';
import { SAMPLE_DETECTION } from '@/lib/sample-data';
import type { DetectionResult } from '@/types/detection';

export default function Result() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadResult = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // In a real app, this would fetch from an API
        if (id === 'sample') {
          setResult(SAMPLE_DETECTION);
        } else {
          // For demo purposes, use sample data for any ID
          setResult(SAMPLE_DETECTION);
        }
      } catch (err) {
        setError('Failed to load detection pack');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadResult();
  }, [id]);

  const handleDownload = () => {
    if (!result) return;

    const dataStr = JSON.stringify(result, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${result.meta.slug}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded!",
      description: "Detection pack saved to your downloads folder.",
    });
  };

  const copyToast = (format: string) => {
    toast({
      title: `Copied ${format}!`,
      description: "Detection rule copied to clipboard.",
    });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-5xl px-6 py-12">
          <Card className="border-destructive bg-destructive/5 p-8">
            <EmptyState
              icon={FileText}
              title="Failed to Load"
              description={error}
            />
            <div className="mt-6 flex justify-center">
              <Button variant="secondary" onClick={() => navigate('/')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl px-6 py-12">
        {/* Header */}
        <motion.div
          className="mb-8 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <Button 
              variant="secondary" 
              onClick={() => navigate('/')}
              className="hover-lift"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            
            {result && (
              <Button onClick={handleDownload} className="hover-lift">
                <Download className="mr-2 h-4 w-4" />
                Download JSON
              </Button>
            )}
          </div>

          {isLoading ? (
            <div className="space-y-4">
              <div className="h-8 w-3/4 skeleton rounded-lg" />
              <div className="flex gap-2">
                <div className="h-7 w-24 skeleton rounded-lg" />
                <div className="h-7 w-32 skeleton rounded-lg" />
              </div>
            </div>
          ) : result ? (
            <div className="space-y-4">
              <motion.h1
                className="text-4xl font-bold text-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {result.meta.title}
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <HintChips meta={result.meta} />
              </motion.div>
            </div>
          ) : null}
        </motion.div>

        {/* Content */}
        {isLoading ? (
          <Card className="p-8">
            <div className="space-y-6">
              <div className="flex gap-4 border-b border-border pb-4">
                {['Sigma', 'KQL', 'SPL', 'Tests', 'Playbook'].map((tab) => (
                  <div key={tab} className="h-10 w-16 skeleton rounded-lg" />
                ))}
              </div>
              <CodeBlockSkeleton />
            </div>
          </Card>
        ) : result ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <Tabs defaultValue="sigma" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 bg-surface rounded-xl p-1">
                <TabsTrigger value="sigma" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">
                  Sigma
                </TabsTrigger>
                <TabsTrigger value="kql" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">
                  KQL
                </TabsTrigger>
                <TabsTrigger value="spl" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">
                  SPL
                </TabsTrigger>
                <TabsTrigger value="tests" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">
                  Tests
                </TabsTrigger>
                <TabsTrigger value="playbook" className="data-[state=active]:bg-card data-[state=active]:shadow-sm">
                  Playbook
                </TabsTrigger>
              </TabsList>

              <TabsContent value="sigma">
                <CodeBlock
                  code={result.sigma}
                  language="sigma"
                  title="Sigma Detection Rule"
                />
              </TabsContent>

              <TabsContent value="kql">
                <CodeBlock
                  code={result.kql}
                  language="kql"
                  title="Kusto Query Language (KQL)"
                />
              </TabsContent>

              <TabsContent value="spl">
                <CodeBlock
                  code={result.spl}
                  language="spl"
                  title="Splunk Processing Language (SPL)"
                />
              </TabsContent>

              <TabsContent value="tests">
                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="mb-4 text-lg font-semibold text-foreground flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-success" />
                      Positive Test Cases
                    </h3>
                    <div className="space-y-3">
                      {result.tests.positive.map((test, index) => (
                        <motion.div
                          key={index}
                          className="rounded-lg bg-code-bg border border-code-border p-4"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <p className="text-sm text-foreground font-mono">{test}</p>
                        </motion.div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="mb-4 text-lg font-semibold text-foreground flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-muted-foreground" />
                      Negative Test Cases
                    </h3>
                    <div className="space-y-3">
                      {result.tests.negative.map((test, index) => (
                        <motion.div
                          key={index}
                          className="rounded-lg bg-code-bg border border-code-border p-4"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (result.tests.positive.length + index) * 0.1 }}
                        >
                          <p className="text-sm text-foreground font-mono">{test}</p>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="playbook">
                <Card className="p-8">
                  <MarkdownView content={result.playbook} />
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}