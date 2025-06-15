// import only what we need - esbuild will tree-shake unused exports
import { parser } from './parser.js';

export interface KeyValueObject {
  [key: string]: string | number | null | Array<string | number | null>;
}

/**
 * Parses a key-value string into an object
 * @param input The key-value string to parse
 * @returns Parsed object
 */
export function parseKeyValueString(input: string): KeyValueObject {
  try {
    return parser.parse(input);
  } catch (error) {
    throw new Error(`Parse error: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Converts an object to a key-value string
 * @param obj The object to convert
 * @returns Key-value string representation
 */
export function toKeyValueString(obj: KeyValueObject): string {
  const pairs: string[] = [];
  
  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) {
      pairs.push(`${key}=;`);
    } else if (Array.isArray(value)) {
      const valueStr = value.map(v => formatValue(v)).join(',');
      pairs.push(`${key}=${valueStr};`);
    } else {
      pairs.push(`${key}=${formatValue(value)};`);
    }
  }
  
  return pairs.join('');
}

function formatValue(value: string | number | null): string {
  if (value === null || value === undefined) {
    return '';
  }
  
  if (typeof value === 'number') {
    return value.toString();
  }
  
  const str = String(value);
  
  // If the string contains special characters or spaces, quote it
  if (/[=,;"\s]/.test(str) || str === '') {
    return `"${str}"`;
  }
  
  return str;
} 