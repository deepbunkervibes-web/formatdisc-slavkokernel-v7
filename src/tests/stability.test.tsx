import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StabilityAudit } from '../routes/StabilityAudit';
import * as React from 'react';

// Mock KernelProvider
const mockUseKernel = {
  getHealth: vi.fn(() => ({
    driftMs: 0.005,
    auditEvents: 10,
    uptime: 1000,
    tickRate: 60,
    providerLatency: 20,
    memoryUsage: 50
  })),
  emit: vi.fn(),
  state: 'ready',
  tick: 0,
  audit: [],
  currentSessionId: 'test-session',
  resetAudit: vi.fn(),
  startNewSession: vi.fn(),
};

vi.mock('../kernel/KernelProvider', () => ({
  useKernel: () => mockUseKernel,
}));

// Mock Logger
vi.mock('../utils/logger', () => ({
  logger: {
    warn: vi.fn(),
    info: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock Lucide Icons (to avoid rendering issues)
vi.mock('lucide-react', () => ({
  AlertCircle: () => <div data-testid="icon-alert" />,
  RefreshCw: () => <div data-testid="icon-refresh" />,
  Radio: () => <div data-testid="icon-radio" />,
  Zap: () => <div data-testid="icon-zap" />,
}));

describe('StabilityAudit Component', () => {
  it('renders correctly and displays healthy status initially', () => {
    render(<StabilityAudit />);
    expect(screen.getByText('Stability Audit & Panic Laboratory')).toBeDefined();
    expect(screen.getByText('HEALTHY')).toBeDefined();
  });

  it('triggers panic state when button is clicked', () => {
    render(<StabilityAudit />);
    const panicButton = screen.getByText('Inject Kernel Panic');
    fireEvent.click(panicButton);

    expect(mockUseKernel.emit).toHaveBeenCalledWith('kernel', 'stability:panic_simulation');
    expect(screen.getByText('PANIC')).toBeDefined();
    expect(screen.getByText(/SYSTEM_PANIC/i)).toBeDefined();
  });

  it('recovers from panic state when reset button is clicked', () => {
    render(<StabilityAudit />);
    
    // Trigger panic
    fireEvent.click(screen.getByText('Inject Kernel Panic'));
    expect(screen.getByText('PANIC')).toBeDefined();

    // Trigger recovery
    const recoverButton = screen.getByText('Clear Audit Logs & Recovery');
    fireEvent.click(recoverButton);

    expect(mockUseKernel.emit).toHaveBeenCalledWith('kernel', 'stability:recovery_complete');
    expect(screen.getByText('HEALTHY')).toBeDefined();
  });

  it('displays telemetry metrics correctly', () => {
    render(<StabilityAudit />);
    expect(screen.getByText(/Clock Drift/i)).toBeDefined();
    // 0.005 toFixed(3) is "0.005"
    expect(screen.getByText('0.005ms')).toBeDefined();
  });
});
