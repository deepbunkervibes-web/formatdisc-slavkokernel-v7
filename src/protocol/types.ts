export type SlavkoModule =
  | 'KERNEL'
  | 'FUSION'
  | 'UI'
  | 'SIMULATOR'
  | 'AGENT'
  | 'AUDIT';

export interface SlavkoAuditMeta {
  signature: string;
  lineage: string[];
}

export interface SlavkoMessage<TPayload = unknown> {
  id: string; // UUIDv7
  origin: SlavkoModule;
  intent: string;
  payload: TPayload;
  timestamp: string; // ISO-8601
  audit: SlavkoAuditMeta;
}
