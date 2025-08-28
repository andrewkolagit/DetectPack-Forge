export interface DetectionMeta {
  title: string;
  slug: string;
  attack: string[];
  logsource: {
    product: string;
    service: string;
  };
}

export interface DetectionTests {
  positive: string[];
  negative: string[];
}

export interface DetectionResult {
  meta: DetectionMeta;
  sigma: string;
  kql: string;
  spl: string;
  tests: DetectionTests;
  playbook: string;
}

export interface GenerationRequest {
  mode: 'describe' | 'logs';
  text?: string;
  logs?: string;
}

export type WizardStep = 1 | 2 | 3;

export interface WizardState {
  step: WizardStep;
  mode?: 'describe' | 'logs';
  input: string;
  isLoading: boolean;
  error?: string;
}

export type CodeLanguage = 'sigma' | 'kql' | 'spl' | 'json' | 'markdown';