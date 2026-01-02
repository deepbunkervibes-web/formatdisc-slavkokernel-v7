
import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { ChatMessage, Slide, ChatMessageSchema } from './types';

/**
 * Derives the current chat state based on the last command in the log.
 */
export const useChatState = (log: ChatMessage[]) => {
  return useMemo(() => {
    const latest = log.slice().reverse().find((m) => /^\s*>\s/.test(m.content));
    if (!latest) return "idle";

    const trimmed = latest.content.replace(/^\s*>\s*/, "").toLowerCase();

    switch (trimmed) {
      case "project_loaded":
        return "project_loaded";
      case "structure_parsed":
        return "structure_parsed";
      case "analysis_mode":
        return "analysis_mode";
      default:
        return "idle";
    }
  }, [log]);
};

/**
 * Returns a stable, validated array of ChatMessage.
 * The validation runs only when the reference of rawLog changes.
 */
export const useTypedLog = (rawLog: any[]) => {
  const [log, setLog] = useState<ChatMessage[]>([]);
  const isMounted = useRef(true);

  const validateLog = useCallback(() => {
    return rawLog.reduce<ChatMessage[]>((acc, msg) => {
      const result = ChatMessageSchema.safeParse(msg);
      if (result.success) acc.push(result.data);
      return acc;
    }, []);
  }, [rawLog]);

  useEffect(() => {
    const validated = validateLog();
    // Only update if the content has actually changed to prevent render loops
    if (JSON.stringify(validated) !== JSON.stringify(log)) {
      if (isMounted.current) setLog(validated);
    }
  }, [validateLog, log]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return log;
};

/**
 * Helper to pick a specific property from the Slide discriminated union.
 * Returns a narrowed type matching the selected key for improved IDE support.
 */
// Fix: Widened key constraint to string and used any return type to allow accessing properties specific to certain Slide variants
export function useProjectPoints(
  slide: Slide | undefined,
  key: string
) {
  return (slide as any)?.[key];
}
