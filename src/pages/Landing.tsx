import { ArrowRight, Zap, Shield, Eye, FileCode, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
      title: "Natural Language Input",
      description: "Describe suspicious behavior in plain English or paste raw logs"
    },
    {
      icon: FileCode,
      title: "Multi-Format Output",
      description: "Get detection rules in Sigma, KQL, SPL with tests and playbooks"
    },
    {
      icon: Shield,
      title: "Production Ready",
      description: "MITRE ATT&CK mapped rules with validation tests included"
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Describe or Paste",
      description: "Tell us about suspicious behavior or provide sample logs"
    },
    {
      step: 2,
      title: "AI Processing",
      description: "Our engine analyzes patterns and generates detection logic"
    },
    {
      step: 3,
      title: "Get Results",
      description: "Receive ready-to-use detection rules across multiple SIEM platforms"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto max-w-5xl px-6 py-24">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Shield className="h-10 w-10 text-primary" />
            </motion.div>
            
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              DetectPack {" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Forge
              </span>
            </h1>
            
            <p className="mx-auto mb-12 max-w-2xl text-xl text-muted-foreground leading-relaxed">
              Turn ideas into detections your SIEM understands. Generate Sigma, KQL, and SPL rules 
              with tests and playbooks in seconds.
            </p>
            
            <motion.div
              className="flex flex-col gap-4 sm:flex-row sm:justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Button
                size="lg"
                onClick={() => navigate('/new')}
                className="group h-12 px-8 text-base font-medium hover-lift"
              >
                Create Detection Pack
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/result/sample')}
                className="h-12 px-8 text-base font-medium hover-lift"
              >
                View Example
                <Eye className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto max-w-5xl px-6">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              Purpose-Built for Security Teams
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Generate comprehensive detection packages that work across your security stack
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="group h-full p-8 hover-lift transition-all duration-200">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 group-hover:bg-primary/20">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-surface/50">
        <div className="container mx-auto max-w-5xl px-6">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              How It Works
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              From concept to deployment in three simple steps
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
              >
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {index < howItWorks.length - 1 && (
                  <div className="absolute right-0 top-8 hidden translate-x-1/2 md:block">
                    <ChevronRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto max-w-5xl px-6">
          <motion.div
            className="rounded-3xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-12 text-center ring-1 ring-primary/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              Ready to Build Better Detections?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Start generating production-ready detection rules in seconds
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/new')}
              className="group h-12 px-8 text-base font-medium hover-lift"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm text-muted-foreground">
            Experimental. Tune rules before production use.
          </p>
        </div>
      </footer>
    </div>
  );
}