import * as fs from 'fs';
import * as path from 'path';
import { parseKeyValueString, toKeyValueString, KeyValueObject } from './index';

function showHelp() {
  console.log(`
Key-Value String Parser CLI

Usage:
  kvs parse <input>                Parse key-value string to JSON
  kvs parse -f <file>              Parse key-value string from file to JSON
  kvs stringify <json>             Convert JSON to key-value string
  kvs stringify -f <file>          Convert JSON from file to key-value string
  kvs validate <input>             Validate key-value string syntax
  kvs validate -f <file>           Validate key-value string from file
  kvs help                         Show this help message

Examples:
  kvs parse "name=John;age=30;tags=frontend,backend;"
  kvs stringify '{"name":"John","age":30,"tags":["frontend","backend"]}'
  kvs validate "name=John;age=30;"
  kvs parse -f input.kvs
  kvs stringify -f data.json

Options:
  -f, --file    Read input from file
  -h, --help    Show help message
`);
}

function readFromFile(filepath: string): string {
  try {
    return fs.readFileSync(path.resolve(filepath), 'utf8').trim();
  } catch (error) {
    console.error(`Error reading file ${filepath}:`, error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

function parseCommand(args: string[]) {
  const isFile = args[0] === '-f' || args[0] === '--file';
  const input = isFile ? readFromFile(args[1]) : args[0];

  if (!input) {
    console.error('Error: No input provided');
    process.exit(1);
  }

  try {
    const result = parseKeyValueString(input);
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Parse error:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

function stringifyCommand(args: string[]) {
  const isFile = args[0] === '-f' || args[0] === '--file';
  const input = isFile ? readFromFile(args[1]) : args[0];

  if (!input) {
    console.error('Error: No input provided');
    process.exit(1);
  }

  try {
    const obj: KeyValueObject = JSON.parse(input);
    const result = toKeyValueString(obj);
    console.log(result);
  } catch (error) {
    console.error('Stringify error:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

function validateCommand(args: string[]) {
  const isFile = args[0] === '-f' || args[0] === '--file';
  const input = isFile ? readFromFile(args[1]) : args[0];

  if (!input) {
    console.error('Error: No input provided');
    process.exit(1);
  }

  try {
    parseKeyValueString(input);
    console.log('✓ Valid key-value string');
    process.exit(0);
  } catch (error) {
    console.error('✗ Invalid key-value string:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === 'help' || args[0] === '-h' || args[0] === '--help') {
    showHelp();
    return;
  }

  const command = args[0];
  const commandArgs = args.slice(1);

  switch (command) {
    case 'parse':
      parseCommand(commandArgs);
      break;
    case 'stringify':
      stringifyCommand(commandArgs);
      break;
    case 'validate':
      validateCommand(commandArgs);
      break;
    default:
      console.error(`Unknown command: ${command}`);
      console.error('Run "kvs help" for usage information');
      process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { main }; 