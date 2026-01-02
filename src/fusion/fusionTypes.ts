import { SlavkoMessage, SlavkoModule } from '../protocol/types';

export type FusionChannel = 'AI' | 'SIMULATION' | 'KERNEL' | 'UI' | 'AUDIT';

export interface FusionRoute {
  channel: FusionChannel;
  target: SlavkoModule;
}

export interface FusionEvent<T = unknown> {
  message: SlavkoMessage<T>;
  route: FusionRoute;
}
