import * as React from 'react';

type Props = {
  height?: string;
  className?: string;
};

/**
 * Standardised pulse skeleton for landing sections.
 */
export const SectionSkeleton: React.FC<Props> = ({
  height = 'h-64',
  className = ''
}) =>
<div className={`w-full ${height} rounded-2xl bg-neutral-200/50 dark:bg-neutral-800/10 animate-pulse ${className}`} />;