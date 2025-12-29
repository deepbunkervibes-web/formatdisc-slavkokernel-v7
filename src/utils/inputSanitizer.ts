/**
 * Input Sanitization & Safety Layer
 *
 * This module provides utilities to sanitize user inputs before processing
 * by the AI agents, mitigating prompt injection and ensuring data integrity.
 */

// Maximum length for an idea description to prevent token exhaustion attacks
const MAX_IDEA_LENGTH = 5000;

// Patterns that might indicate a jailbreak or injection attempt
const INJECTION_PATTERNS = [
    /ignore previous instructions/i,
    /ignore all previous instructions/i,
    /you are now/i,
    /system override/i,
    /simulated mode/i,
    /developer mode/i,
];

export interface ValidationResult {
    isValid: boolean;
    sanitizedInput: string;
    error?: string;
}

/**
 * Sanitizes and validates user input for AI prompts.
 *
 * @param input - The raw user input string.
 * @returns ValidationResult object containing success status and sanitized string.
 */
export function validateAndSanitizeInput(input: string): ValidationResult {
    if (!input || typeof input !== 'string') {
        return { isValid: false, sanitizedInput: '', error: 'Input cannot be empty.' };
    }

    let sanitized = input.trim();

    // 1. Length Check
    if (sanitized.length > MAX_IDEA_LENGTH) {
        // Truncate instead of fail? For security, maybe better to fail or truncate with warning.
        // Let's truncate and allow it, but maybe the UI should restrict it first.
        sanitized = sanitized.substring(0, MAX_IDEA_LENGTH);
    }

    // 2. Control Character Stripping (preserve newlines/tabs)
    // Remove non-printable characters unless they are whitespace
    // eslint-disable-next-line no-control-regex
    sanitized = sanitized.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');

    // 3. Injection Pattern Detection
    for (const pattern of INJECTION_PATTERNS) {
        if (pattern.test(sanitized)) {
            console.warn(`[Security] Potential prompt injection detected: "${pattern}" in input.`);
            // We can fail the request or neutralize it.
            // For now, let's flag it but strictly enforcing structure in the prompt builder is the best defense.
            // We will escape key delimiters if used.
            return {
                isValid: false,
                sanitizedInput: sanitized,
                error: 'Security Alert: Your input contains restricted patterns (e.g., "ignore instructions"). Please rephrase.',
            };
        }
    }

    return { isValid: true, sanitizedInput: sanitized };
}

/**
 * Wraps user input in XML-style delimiters to clearly separate it from system instructions.
 * This is a standard LLM defense technique.
 *
 * @param input - The sanitized user input.
 * @returns The delimited input string.
 */
export function wrapUserPrompt(input: string): string {
    // Escape existing tags to prevent closing the delimiter early
    const escaped = input.replace(/<\/?user_idea>/g, '[TAG_REMOVED]');
    return `<user_idea>\n${escaped}\n</user_idea>`;
}
