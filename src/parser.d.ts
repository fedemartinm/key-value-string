interface Parser {
  parse(input: string): any;
}

export const parser: Parser;
export function parse(input: string): any;
export function main(args: string[]): any; 