# key-value-string

A simple key-value string parser with zero dependencies. Designed for single-line key-value strings with support for numbers, quoted strings, and arrays. Perfect for configuration strings, URL parameters, and command-line arguments.

Thoroughly tested with 200+ unit tests to ensure reliability and edge case handling.

## Installation

### For Library Usage

```bash
npm install key-value-string
```

### For CLI Usage (Global Installation)

```bash
npm install -g key-value-string
```

After global installation, the `kvs` command will be available in your terminal.

## Usage

### Node.js (CommonJS)

```javascript
const { parseKeyValueString, toKeyValueString } = require('key-value-string');

// Parse key-value string
const result = parseKeyValueString('name=John;age=30;tags=frontend,backend;');
console.log(result);
// { name: 'John', age: 30, tags: ['frontend', 'backend'] }

// Convert object to key-value string
const kvString = toKeyValueString({ name: 'John', age: 30, active: true });
console.log(kvString);
// name=John;age=30;active=true;
```

### Node.js (ES Modules)

```javascript
import { parseKeyValueString, toKeyValueString } from 'key-value-string';

const parsed = parseKeyValueString('server=localhost;port=3000;debug=true;');
console.log(parsed);
// { server: 'localhost', port: 3000, debug: true }
```

### Browser (UMD)

```html
<script src="https://unpkg.com/key-value-string/dist/index.umd.js"></script>
<script>
  const { parseKeyValueString, toKeyValueString } = KeyValueString;
  
  const config = parseKeyValueString('theme=dark;fontSize=14;showLineNumbers=true;');
  console.log(config);
</script>
```

### Browser (ES Modules)

```html
<script type="module">
  import { parseKeyValueString } from 'https://unpkg.com/key-value-string/dist/index.esm.js';
  
  const settings = parseKeyValueString('width=800;height=600;fullscreen=false;');
  console.log(settings);
</script>
```

## CLI Usage

**Note**: Install globally first with `npm install -g key-value-string`

```bash
# Parse key-value string to JSON
kvs parse "name=John;age=30;tags=frontend,backend;"

# Convert JSON to key-value string
kvs stringify '{"name":"John","age":30,"tags":["frontend","backend"]}'

# Validate key-value string syntax
kvs validate "name=John;age=30;"

# Parse from file
kvs parse -f config.kvs

# Convert JSON file to key-value string
kvs stringify -f data.json

# Show help
kvs --help
```

## Syntax

The parser is designed for **single-line key-value strings** (though multiline works, comments are not supported):

- **Key-value pairs**: `key=value;`
- **Numbers**: Automatically parsed (`age=30` → `{ age: 30 }`)
- **Quoted strings**: `name="John Doe";` for values with spaces or special characters
- **Arrays**: `tags=frontend,backend;` → `{ tags: ['frontend', 'backend'] }`
- **Null values**: `optional=;` → `{ optional: null }`
- **Empty arrays**: `tags=,;` → `{ tags: [null] }`

**Note**: Comments (`#` or `//`) are not supported. Use for single-line configuration strings, URL parameters, or command-line arguments.

## API

### `parseKeyValueString(input: string): KeyValueObject`

Parses a key-value string into an object.

- **input**: The key-value string to parse
- **Returns**: Parsed object
- **Throws**: Error if the string is malformed

### `toKeyValueString(obj: KeyValueObject): string`

Converts an object to a key-value string.

- **obj**: The object to convert
- **Returns**: Key-value string representation

### Types

```typescript
interface KeyValueObject {
  [key: string]: string | number | null | Array<string | number | null>;
}
```

## Examples

### Configuration Strings

```javascript
// Parse application config string
const configString = 'host=localhost;port=3000;database="my_app_db";timeout=5000;features=auth,logging,cache;debug=true;';
const config = parseKeyValueString(configString);

// Use the config
console.log(`Server running on ${config.host}:${config.port}`);
// Output: Server running on localhost:3000
```

### URL Parameters Style

```javascript
// Parse URL-like parameters
const params = parseKeyValueString('user=123;action=edit;theme=dark;');
console.log(params); // { user: 123, action: 'edit', theme: 'dark' }
```

### Environment Variables Style

```javascript
// Convert environment-like variables
const env = {
  NODE_ENV: 'production',
  PORT: 8080,
  FEATURES: ['auth', 'ssl', 'cache']
};

const envString = toKeyValueString(env);
console.log(envString); // NODE_ENV=production;PORT=8080;FEATURES=auth,ssl,cache;
```

## Browser Compatibility

- **UMD build**: Supports ES2015+ (IE11+ with polyfills)
- **ESM build**: Supports ES2020+ (modern browsers)
- **CommonJS build**: Node.js 14+

## License

MIT

---

*Built with ❤️ and way too much coffee in a single night of pure vibecoding.*