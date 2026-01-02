
import { z } from "zod";

export const ProjectManifestSchema = z.object({
  framework: z.string(),
  services: z.number().int().nonnegative(),
  riskFlags: z.array(z.string()),
  modules: z.array(z.string()),
  entryPoints: z.array(z.string()),
  configFiles: z.array(z.string()),
  parsedAt: z.string(),
});

export const ChatMessageSchema = z.object({
  role: z.enum(['system', 'user']),
  content: z.string(),
  timestamp: z.number().int(),
  level: z.enum(['INFO', 'WARN', 'CRITICAL']).optional(),
});

export const TeamMemberSchema = z.object({
  name: z.string(),
  role: z.string(),
  achievement: z.string(),
  type: z.enum(['executive', 'advisor']),
});

export const MarketDataSchema = z.object({
  tam: z.string(),
  sam: z.string(),
  som: z.string(),
  drivers: z.array(z.string()),
});

export const ArchitecturePointSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  impact: z.string(),
});

export const SummaryPointSchema = z.object({
  label: z.string(),
  value: z.string(),
  icon: z.string().optional(),
});

export const ComparisonPointSchema = z.object({
  feature: z.string(),
  advantage: z.string(),
  competitorWeakness: z.string(),
  quantifiedImpact: z.string(),
});

const BaseSlide = z.object({
  id: z.number(),
  title: z.string(),
  subtitle: z.string().optional(),
});

export const SlideSchema = z.discriminatedUnion('type', [
  BaseSlide.extend({
    type: z.literal('title'),
  }),
  BaseSlide.extend({
    type: z.literal('content'),
    content: z.union([z.string(), z.array(z.string())]),
  }),
  BaseSlide.extend({
    type: z.literal('team'),
    team: z.array(TeamMemberSchema),
  }),
  BaseSlide.extend({
    type: z.literal('market'),
    marketData: MarketDataSchema,
  }),
  BaseSlide.extend({
    type: z.literal('architecture'),
    architecturePoints: z.array(ArchitecturePointSchema),
  }),
  BaseSlide.extend({
    type: z.literal('summary'),
    summaryPoints: z.array(SummaryPointSchema),
  }),
  BaseSlide.extend({
    type: z.literal('competitive'),
    comparisonPoints: z.array(ComparisonPointSchema),
  }),
  BaseSlide.extend({
    type: z.literal('cta'),
    content: z.string(),
  }),
]);

export type ProjectManifest = z.infer<typeof ProjectManifestSchema>;
export type ChatMessage = z.infer<typeof ChatMessageSchema>;
export type TeamMember = z.infer<typeof TeamMemberSchema>;
export type MarketData = z.infer<typeof MarketDataSchema>;
export type ArchitecturePoint = z.infer<typeof ArchitecturePointSchema>;
export type SummaryPoint = z.infer<typeof SummaryPointSchema>;
export type ComparisonPoint = z.infer<typeof ComparisonPointSchema>;
export type Slide = z.infer<typeof SlideSchema>;

export type ChatState =
  | 'idle'
  | 'project_loaded'
  | 'structure_parsed'
  | 'analysis_mode';
