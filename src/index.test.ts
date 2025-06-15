import { parseKeyValueString, toKeyValueString } from './index';

describe('Key-Value String Parser - Comprehensive Tests', () => {
  // Test 1-10: Basic parsing
  describe('Basic Parsing (Tests 1-10)', () => {
    test('1. Simple key-value pair', () => {
      expect(parseKeyValueString('a=b;')).toEqual({ a: 'b' });
    });

    test('2. Multiple simple pairs', () => {
      expect(parseKeyValueString('a=b;c=d;')).toEqual({ a: 'b', c: 'd' });
    });

    test('3. Empty input', () => {
      expect(parseKeyValueString('')).toEqual({});
    });

    test('4. Whitespace input', () => {
      expect(parseKeyValueString('   ')).toEqual({});
    });

    test('5. Single character key and value', () => {
      expect(parseKeyValueString('x=y;')).toEqual({ x: 'y' });
    });

    test('6. Long key and value', () => {
      expect(parseKeyValueString('longKeyName=longValueName;')).toEqual({ longKeyName: 'longValueName' });
    });

    test('7. Key with underscore', () => {
      expect(parseKeyValueString('my_key=value;')).toEqual({ my_key: 'value' });
    });

    test('8. Key starting with underscore', () => {
      expect(parseKeyValueString('_private=secret;')).toEqual({ _private: 'secret' });
    });

    test('9. Key with numbers', () => {
      expect(parseKeyValueString('key123=value;')).toEqual({ key123: 'value' });
    });

    test('10. Mixed alphanumeric key', () => {
      expect(parseKeyValueString('test_key_123=data;')).toEqual({ test_key_123: 'data' });
    });
  });

  // Test 11-25: Number values
  describe('Number Values (Tests 11-25)', () => {
    test('11. Positive integer', () => {
      expect(parseKeyValueString('num=42;')).toEqual({ num: 42 });
    });

    test('12. Zero', () => {
      expect(parseKeyValueString('zero=0;')).toEqual({ zero: 0 });
    });

    test('13. Negative integer', () => {
      expect(parseKeyValueString('neg=-42;')).toEqual({ neg: -42 });
    });

    test('14. Positive decimal', () => {
      expect(parseKeyValueString('pi=3.14;')).toEqual({ pi: 3.14 });
    });

    test('15. Negative decimal', () => {
      expect(parseKeyValueString('temp=-15.5;')).toEqual({ temp: -15.5 });
    });

    test('16. Small decimal', () => {
      expect(parseKeyValueString('small=0.001;')).toEqual({ small: 0.001 });
    });

    test('17. Large number', () => {
      expect(parseKeyValueString('big=999999;')).toEqual({ big: 999999 });
    });

    test('18. Very small negative', () => {
      expect(parseKeyValueString('tiny=-0.0001;')).toEqual({ tiny: -0.0001 });
    });

    test('19. Price format', () => {
      expect(parseKeyValueString('price=99.99;')).toEqual({ price: 99.99 });
    });

    test('20. Scientific-like number', () => {
      expect(parseKeyValueString('val=123.456;')).toEqual({ val: 123.456 });
    });

    test('21. Integer with many digits', () => {
      expect(parseKeyValueString('id=1234567890;')).toEqual({ id: 1234567890 });
    });

    test('22. Decimal starting with zero', () => {
      expect(parseKeyValueString('fraction=0.75;')).toEqual({ fraction: 0.75 });
    });

    test('23. Negative zero', () => {
      expect(parseKeyValueString('negzero=-0;')).toEqual({ negzero: -0 });
    });

    test('24. Single digit', () => {
      expect(parseKeyValueString('single=7;')).toEqual({ single: 7 });
    });

    test('25. Multiple decimal places', () => {
      expect(parseKeyValueString('precise=1.23456789;')).toEqual({ precise: 1.23456789 });
    });
  });

  // Test 26-40: Quoted strings
  describe('Quoted Strings (Tests 26-40)', () => {
    test('26. Simple quoted string', () => {
      expect(parseKeyValueString('name="John";')).toEqual({ name: 'John' });
    });

    test('27. Empty quoted string', () => {
      expect(parseKeyValueString('empty="";')).toEqual({ empty: '' });
    });

    test('28. Quoted string with spaces', () => {
      expect(parseKeyValueString('text="hello world";')).toEqual({ text: 'hello world' });
    });

    test('29. Quoted string with punctuation', () => {
      expect(parseKeyValueString('sentence="Hello, world!";')).toEqual({ sentence: 'Hello, world!' });
    });

    test('30. Quoted string with numbers', () => {
      expect(parseKeyValueString('code="123abc";')).toEqual({ code: '123abc' });
    });

    test('31. Quoted path', () => {
      expect(parseKeyValueString('path="/home/user";')).toEqual({ path: '/home/user' });
    });

    test('32. Quoted email', () => {
      expect(parseKeyValueString('email="user@domain.com";')).toEqual({ email: 'user@domain.com' });
    });

    test('33. Quoted URL', () => {
      expect(parseKeyValueString('url="https://example.com";')).toEqual({ url: 'https://example.com' });
    });

    test('34. Quoted symbols', () => {
      expect(parseKeyValueString('symbols="!@#$%^&*()";')).toEqual({ symbols: '!@#$%^&*()' });
    });

    test('35. Quoted math expression', () => {
      expect(parseKeyValueString('math="2 + 2 = 4";')).toEqual({ math: '2 + 2 = 4' });
    });

    test('36. Quoted question', () => {
      expect(parseKeyValueString('question="How are you?";')).toEqual({ question: 'How are you?' });
    });

    test('37. Quoted brackets', () => {
      expect(parseKeyValueString('brackets="[test]";')).toEqual({ brackets: '[test]' });
    });

    test('38. Quoted braces', () => {
      expect(parseKeyValueString('braces="{data}";')).toEqual({ braces: '{data}' });
    });

    test('39. Quoted parentheses', () => {
      expect(parseKeyValueString('parens="(info)";')).toEqual({ parens: '(info)' });
    });

    test('40. Quoted with underscores', () => {
      expect(parseKeyValueString('under="test_value_here";')).toEqual({ under: 'test_value_here' });
    });
  });

  // Test 41-60: Unquoted strings
  describe('Unquoted Strings (Tests 41-60)', () => {
    test('41. Simple unquoted string', () => {
      expect(parseKeyValueString('name=john;')).toEqual({ name: 'john' });
    });

    test('42. Unquoted with dots', () => {
      expect(parseKeyValueString('file=config.txt;')).toEqual({ file: 'config.txt' });
    });

    test('43. Unquoted with hyphens', () => {
      expect(parseKeyValueString('name=hello-world;')).toEqual({ name: 'hello-world' });
    });

    test('44. Unquoted with underscores', () => {
      expect(parseKeyValueString('var=test_value;')).toEqual({ var: 'test_value' });
    });

    test('45. Unquoted starting with @', () => {
      expect(parseKeyValueString('user=@admin;')).toEqual({ user: '@admin' });
    });

    test('46. Unquoted starting with number', () => {
      expect(parseKeyValueString('id=123abc;')).toEqual({ id: '123abc' });
    });

    test('47. Unquoted domain', () => {
      expect(parseKeyValueString('host=example.com;')).toEqual({ host: 'example.com' });
    });

    test('48. Unquoted path-like', () => {
      expect(parseKeyValueString('path=/var/log;')).toEqual({ path: '/var/log' });
    });

    test('49. Unquoted with plus', () => {
      expect(parseKeyValueString('phone=+1234567890;')).toEqual({ phone: '+1234567890' });
    });

    test('50. Unquoted version', () => {
      expect(parseKeyValueString('version=v1.2.3;')).toEqual({ version: 'v1.2.3' });
    });

    test('51. Unquoted hash', () => {
      expect(parseKeyValueString('hash=#abc123;')).toEqual({ hash: '#abc123' });
    });

    test('52. Unquoted percentage', () => {
      expect(parseKeyValueString('percent=50%;')).toEqual({ percent: '50%' });
    });

    test('53. Unquoted mixed chars', () => {
      expect(parseKeyValueString('mixed=abc123xyz;')).toEqual({ mixed: 'abc123xyz' });
    });

    test('54. Unquoted with ampersand', () => {
      expect(parseKeyValueString('ref=A&B;')).toEqual({ ref: 'A&B' });
    });

    test('55. Unquoted with asterisk', () => {
      expect(parseKeyValueString('glob=*.txt;')).toEqual({ glob: '*.txt' });
    });

    test('56. Unquoted with question mark', () => {
      expect(parseKeyValueString('wildcard=test?;')).toEqual({ wildcard: 'test?' });
    });

    test('57. Unquoted with exclamation', () => {
      expect(parseKeyValueString('cmd=ls!;')).toEqual({ cmd: 'ls!' });
    });

    test('58. Unquoted with tilde', () => {
      expect(parseKeyValueString('home=~/docs;')).toEqual({ home: '~/docs' });
    });

    test('59. Unquoted with colon', () => {
      expect(parseKeyValueString('time=12:30;')).toEqual({ time: '12:30' });
    });

    test('60. Unquoted very long', () => {
      const longValue = 'a'.repeat(100);
      expect(parseKeyValueString(`long=${longValue};`)).toEqual({ long: longValue });
    });
  });

  // Test 61-80: Arrays/Lists
  describe('Arrays and Lists (Tests 61-80)', () => {
    test('61. Simple string array', () => {
      expect(parseKeyValueString('list=a,b,c;')).toEqual({ list: ['a', 'b', 'c'] });
    });

    test('62. Number array', () => {
      expect(parseKeyValueString('nums=1,2,3;')).toEqual({ nums: [1, 2, 3] });
    });

    test('63. Mixed array', () => {
      expect(parseKeyValueString('mixed=abc,123,def;')).toEqual({ mixed: ['abc', 123, 'def'] });
    });

    test('64. Quoted string array', () => {
      expect(parseKeyValueString('names="John","Jane","Bob";')).toEqual({ names: ['John', 'Jane', 'Bob'] });
    });

    test('65. Array with decimals', () => {
      expect(parseKeyValueString('decimals=1.1,2.2,3.3;')).toEqual({ decimals: [1.1, 2.2, 3.3] });
    });

    test('66. Array with negative numbers', () => {
      expect(parseKeyValueString('temps=-5,-10,15;')).toEqual({ temps: [-5, -10, 15] });
    });

    test('67. Array with special chars', () => {
      expect(parseKeyValueString('files=a.txt,b.pdf,c.doc;')).toEqual({ files: ['a.txt', 'b.pdf', 'c.doc'] });
    });

    test('68. Array with emails', () => {
      expect(parseKeyValueString('emails=a@test.com,b@site.org;')).toEqual({ emails: ['a@test.com', 'b@site.org'] });
    });

    test('69. Single item array', () => {
      expect(parseKeyValueString('single=alone;')).toEqual({ single: 'alone' });
    });

    test('70. Empty values in array', () => {
      expect(parseKeyValueString('sparse=a,,c;')).toEqual({ sparse: ['a', null, 'c'] });
    });

    test('71. Trailing comma', () => {
      expect(parseKeyValueString('trailing=a,b,;')).toEqual({ trailing: ['a', 'b', null] });
    });

    test('72. Multiple empty values', () => {
      expect(parseKeyValueString('gaps=a,,,d;')).toEqual({ gaps: ['a', null, null, 'd'] });
    });

    test('73. Long array', () => {
      const items = Array.from({length: 10}, (_, i) => `item${i}`).join(',');
      const expected = Array.from({length: 10}, (_, i) => `item${i}`);
      expect(parseKeyValueString(`long=${items};`)).toEqual({ long: expected });
    });

    test('74. Array with quoted spaces', () => {
      expect(parseKeyValueString('phrases="hello world","good bye";')).toEqual({ phrases: ['hello world', 'good bye'] });
    });

    test('75. Array with mixed quotes', () => {
      expect(parseKeyValueString('mixed="quoted",unquoted,"another";')).toEqual({ mixed: ['quoted', 'unquoted', 'another'] });
    });

    test('76. Array with numbers and strings', () => {
      expect(parseKeyValueString('data=1,text,3.14,"quoted";')).toEqual({ data: [1, 'text', 3.14, 'quoted'] });
    });

    test('77. Array with special unquoted strings', () => {
      expect(parseKeyValueString('codes=ABC-123,XYZ_789,test@domain;')).toEqual({ codes: ['ABC-123', 'XYZ_789', 'test@domain'] });
    });

    test('78. Array with paths', () => {
      expect(parseKeyValueString('paths="/home","/var","/tmp";')).toEqual({ paths: ['/home', '/var', '/tmp'] });
    });

    test('79. Array with mixed data types', () => {
      expect(parseKeyValueString('mixed=text,42,3.14,"hello world",123abc;')).toEqual({ mixed: ['text', 42, 3.14, 'hello world', '123abc'] });
    });

    test('80. Array with version numbers', () => {
      expect(parseKeyValueString('versions=v1.0,v2.1.3,v3.0.0-beta;')).toEqual({ versions: ['v1.0', 'v2.1.3', 'v3.0.0-beta'] });
    });
  });

  // Test 81-95: Special cases and edge cases
  describe('Special and Edge Cases (Tests 81-95)', () => {
    test('81. Null value', () => {
      expect(parseKeyValueString('empty=;')).toEqual({ empty: null });
    });

    test('82. Multiple null values', () => {
      expect(parseKeyValueString('a=;b=;c=;')).toEqual({ a: null, b: null, c: null });
    });

    test('83. Mixed null and values', () => {
      expect(parseKeyValueString('a=value;b=;c=123;')).toEqual({ a: 'value', b: null, c: 123 });
    });

    test('84. Keys with special characters', () => {
      expect(parseKeyValueString('file.name=test.txt;')).toEqual({ 'file.name': 'test.txt' });
    });

    test('85. Keys starting with numbers', () => {
      expect(parseKeyValueString('123key=value;')).toEqual({ '123key': 'value' });
    });

    test('86. Complex key characters', () => {
      expect(parseKeyValueString('key@domain.com=email;')).toEqual({ 'key@domain.com': 'email' });
    });

    test('87. Whitespace handling', () => {
      expect(parseKeyValueString(' a = b ; ')).toEqual({ a: 'b' });
    });

    test('88. Tabs and newlines', () => {
      expect(parseKeyValueString('\ta\t=\tb\t;\n')).toEqual({ a: 'b' });
    });

    test('89. Mixed whitespace', () => {
      expect(parseKeyValueString('  \n\t a=b;\r\nc=d; \t')).toEqual({ a: 'b', c: 'd' });
    });

    test('90. Very long key', () => {
      const longKey = 'k' + 'e'.repeat(50) + 'y';
      expect(parseKeyValueString(`${longKey}=value;`)).toEqual({ [longKey]: 'value' });
    });

    test('91. URL as unquoted value', () => {
      expect(parseKeyValueString('url=https://example.com:8080/path;')).toEqual({
        url: 'https://example.com:8080/path'
      });
    });

    test('92. Complex configuration', () => {
      const input = 'host=localhost;port=3000;ssl=false;timeout=30.5;';
      expect(parseKeyValueString(input)).toEqual({
        host: 'localhost',
        port: 3000,
        ssl: 'false',
        timeout: 30.5
      });
    });

    test('93. Real-world like data', () => {
      const input = 'name="John Doe";age=30;active=true;scores=95,87,92;email=john@test.com;';
      expect(parseKeyValueString(input)).toEqual({
        name: 'John Doe',
        age: 30,
        active: 'true',
        scores: [95, 87, 92],
        email: 'john@test.com'
      });
    });

    test('94. All data types combined', () => {
      const input = 'str=text;num=42;dec=3.14;quote="hello";array=a,1,b;null=;';
      expect(parseKeyValueString(input)).toEqual({
        str: 'text',
        num: 42,
        dec: 3.14,
        quote: 'hello',
        array: ['a', 1, 'b'],
        null: null
      });
    });

    test('95. Large complex example', () => {
      const input = 'config="production";servers=web1,web2,db1;ports=80,443,3306;active=true;version=2.1.3;debug=false;';
      expect(parseKeyValueString(input)).toEqual({
        config: 'production',
        servers: ['web1', 'web2', 'db1'],
        ports: [80, 443, 3306],
        active: 'true',
        version: '2.1.3',
        debug: 'false'
      });
    });
  });

  // Test 96-110: Serialization tests
  describe('Serialization Tests (Tests 96-110)', () => {
    test('96. Serialize simple object', () => {
      expect(toKeyValueString({ a: 'b' })).toBe('a=b;');
    });

    test('97. Serialize number', () => {
      expect(toKeyValueString({ num: 42 })).toBe('num=42;');
    });

    test('98. Serialize negative number', () => {
      expect(toKeyValueString({ neg: -15 })).toBe('neg=-15;');
    });

    test('99. Serialize decimal', () => {
      expect(toKeyValueString({ pi: 3.14 })).toBe('pi=3.14;');
    });

    test('100. Serialize quoted string (with spaces)', () => {
      expect(toKeyValueString({ text: 'hello world' })).toBe('text="hello world";');
    });

    test('101. Serialize quoted string (with special chars)', () => {
      expect(toKeyValueString({ email: 'user@domain.com' })).toBe('email=user@domain.com;');
    });

    test('102. Serialize array', () => {
      expect(toKeyValueString({ list: ['a', 'b', 'c'] })).toBe('list=a,b,c;');
    });

    test('103. Serialize mixed array', () => {
      expect(toKeyValueString({ mixed: ['text', 42, 'hello world'] })).toBe('mixed=text,42,"hello world";');
    });

    test('104. Serialize null', () => {
      expect(toKeyValueString({ empty: null })).toBe('empty=;');
    });

    test('105. Serialize array with nulls', () => {
      expect(toKeyValueString({ sparse: ['a', null, 'c'] })).toBe('sparse=a,,c;');
    });

    test('106. Serialize empty object', () => {
      expect(toKeyValueString({})).toBe('');
    });

    test('107. Round-trip simple', () => {
      const original = { name: 'john', age: 30 };
      const serialized = toKeyValueString(original);
      const parsed = parseKeyValueString(serialized);
      expect(parsed).toEqual(original);
    });

    test('108. Round-trip complex', () => {
      const original = { 
        text: 'hello world', 
        nums: [1, 2, 3], 
        empty: null,
        special: 'user@domain.com'
      };
      const serialized = toKeyValueString(original);
      const parsed = parseKeyValueString(serialized);
      expect(parsed).toEqual(original);
    });

    test('109. Round-trip with special keys', () => {
      const original = { 'file.name': 'test.txt', 'simple': 'value' };
      const serialized = toKeyValueString(original);
      const parsed = parseKeyValueString(serialized);
      expect(parsed).toEqual(original);
    });

    test('110. Round-trip large example', () => {
      const original = {
        config: 'production',
        servers: ['web1', 'web2', 'db1'],
        ports: [80, 443, 3306],
        active: 'true',
        version: '2.1.3',
        debug: 'false',
        timeout: 30.5,
        empty: null,
        sparse: ['a', null, 'c']
      };
      const serialized = toKeyValueString(original);
      const parsed = parseKeyValueString(serialized);
      expect(parsed).toEqual(original);
    });
  });

  // Error cases
  describe('Error Handling', () => {
    test('Should throw on malformed input - no semicolon', () => {
      expect(() => parseKeyValueString('key=value')).toThrow();
    });

    test('Should throw on malformed input - no equals', () => {
      expect(() => parseKeyValueString('keyvalue;')).toThrow();
    });

    test('Should throw on malformed input - no key', () => {
      expect(() => parseKeyValueString('=value;')).toThrow();
    });

    test('Should throw on malformed input - incomplete', () => {
      expect(() => parseKeyValueString('key=')).toThrow();
    });
  });

  describe('Base64 and Encoded Content (Tests 115-135)', () => {
    test('115. Simple base64 string', () => {
      expect(parseKeyValueString('data="dGVzdA==";')).toEqual({ data: 'dGVzdA==' });
    });

    test('116. Long base64 string', () => {
      const base64 = 'SGVsbG8gV29ybGQhIFRoaXMgaXMgYSBsb25nIGJhc2U2NCBzdHJpbmcgZm9yIHRlc3RpbmcgcHVycG9zZXM=';
      expect(parseKeyValueString(`token="${base64}";`)).toEqual({ token: base64 });
    });

    test('117. Base64 with single padding', () => {
      expect(parseKeyValueString('encoded="dGVzdGluZw=";')).toEqual({ encoded: 'dGVzdGluZw=' });
    });

    test('118. Base64 with double padding', () => {
      expect(parseKeyValueString('data="dGVzdA==";')).toEqual({ data: 'dGVzdA==' });
    });

    test('119. Base64 with triple padding', () => {
      expect(parseKeyValueString('value="dA===";')).toEqual({ value: 'dA===' });
    });

    test('120. Base64 without padding', () => {
      expect(parseKeyValueString('hash=dGVzdGluZ3Rlc3Q;')).toEqual({ hash: 'dGVzdGluZ3Rlc3Q' });
    });

    test('121. Base64 with all valid characters', () => {
      const base64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/==';
      expect(parseKeyValueString(`alphabet="${base64}";`)).toEqual({ alphabet: base64 });
    });

    test('122. Base64 URL-safe variant', () => {
      const base64url = 'dGVzdC1zdHJpbmctd2l0aC1oeXBoZW5zLWFuZF91bmRlcnNjb3Jlcw==';
      expect(parseKeyValueString(`urlsafe="${base64url}";`)).toEqual({ urlsafe: base64url });
    });

    test('123. JWT-like token', () => {
      const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      expect(parseKeyValueString(`jwt=${jwt};`)).toEqual({ jwt });
    });

    test('124. Multiple base64 values', () => {
      expect(parseKeyValueString('key1="dGVzdA==";key2="aGVsbG8=";key3="d29ybGQ=";')).toEqual({
        key1: 'dGVzdA==',
        key2: 'aGVsbG8=',
        key3: 'd29ybGQ='
      });
    });

    test('125. Base64 in array', () => {
      expect(parseKeyValueString('tokens="dGVzdA==","aGVsbG8=","d29ybGQ=";')).toEqual({
        tokens: ['dGVzdA==', 'aGVsbG8=', 'd29ybGQ=']
      });
    });

    test('126. Mixed base64 and regular values', () => {
      expect(parseKeyValueString('data="dGVzdA==";count=5;name=test;')).toEqual({
        data: 'dGVzdA==',
        count: 5,
        name: 'test'
      });
    });

    test('127. Quoted base64', () => {
      expect(parseKeyValueString('data="dGVzdA==";')).toEqual({ data: 'dGVzdA==' });
    });

    test('128. Very long base64 (image-like)', () => {
      const longBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
      expect(parseKeyValueString(`image="${longBase64}";`)).toEqual({ image: longBase64 });
    });

    test('129. Base64 with special characters in original', () => {
      const base64 = 'eyJtZXNzYWdlIjoi8J+YgSBIZWxsbyBXb3JsZCEg8J+YgSJ9'; // Contains emoji in original
      expect(parseKeyValueString(`message=${base64};`)).toEqual({ message: base64 });
    });

    test('130. Certificate-like base64', () => {
      const cert = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4f5wg5l2hKsTeNem/V41fGnJm6gOdrj8ym3rFkEjWT2btYAfBfFN7vbRqFDNfzBQgPQ==';
      expect(parseKeyValueString(`cert="${cert}";`)).toEqual({ cert });
    });

    test('131. Hash with base64-like characters', () => {
      expect(parseKeyValueString('sha256="abc123DEF456+/7890XYZ+/==";')).toEqual({ 
        sha256: 'abc123DEF456+/7890XYZ+/==' 
      });
    });

    test('132. Base64 with line breaks (quoted)', () => {
      const multilineBase64 = `"dGVzdGluZyBhIHZlcnkgbG9uZyBiYXNlNjQgc3RyaW5nIHRoYXQgd291bGQgbm9ybWFsbHkgYmUgc3BsaXQKYWNyb3NzIG11bHRpcGxlIGxpbmVzIGluIGEgcmVhbCBmaWxl"`;
      expect(parseKeyValueString(`data=${multilineBase64};`)).toEqual({ 
        data: 'dGVzdGluZyBhIHZlcnkgbG9uZyBiYXNlNjQgc3RyaW5nIHRoYXQgd291bGQgbm9ybWFsbHkgYmUgc3BsaXQKYWNyb3NzIG11bHRpcGxlIGxpbmVzIGluIGEgcmVhbCBmaWxl' 
      });
    });

    test('133. API key with base64-like format', () => {
      expect(parseKeyValueString('apikey="sk_test_51H7qABC123def456GHI789jkl+/MNO==";')).toEqual({ 
        apikey: 'sk_test_51H7qABC123def456GHI789jkl+/MNO==' 
      });
    });

    test('134. Base64 serialization', () => {
      const data = { token: 'dGVzdA==', hash: 'YWJjMTIz' };
      expect(toKeyValueString(data)).toBe('token="dGVzdA==";hash=YWJjMTIz;');
    });

    test('135. Round-trip base64', () => {
      const original = 'data=SGVsbG8gV29ybGQh;token="dGVzdA==";hash=YWJjMTIz;';
      const parsed = parseKeyValueString(original);
      const serialized = toKeyValueString(parsed);
      expect(parseKeyValueString(serialized)).toEqual(parsed);
    });
  });

  describe('URLs and Web Content (Tests 136-165)', () => {
    test('136. Simple HTTP URL', () => {
      expect(parseKeyValueString('url=http://example.com;')).toEqual({ url: 'http://example.com' });
    });

    test('137. HTTPS URL', () => {
      expect(parseKeyValueString('url=https://example.com;')).toEqual({ url: 'https://example.com' });
    });

    test('138. URL with port', () => {
      expect(parseKeyValueString('server=https://example.com:8080;')).toEqual({ server: 'https://example.com:8080' });
    });

    test('139. URL with path', () => {
      expect(parseKeyValueString('endpoint=https://api.example.com/v1/users;')).toEqual({ 
        endpoint: 'https://api.example.com/v1/users' 
      });
    });

    test('140. URL with query parameters', () => {
      expect(parseKeyValueString('url="https://example.com/search?q=test&limit=10";')).toEqual({ 
        url: 'https://example.com/search?q=test&limit=10' 
      });
    });

    test('141. URL with fragment', () => {
      expect(parseKeyValueString('page="https://example.com/docs#section1";')).toEqual({ 
        page: 'https://example.com/docs#section1' 
      });
    });

    test('142. URL with encoded characters', () => {
      expect(parseKeyValueString('search="https://example.com/search?q=hello%20world&category=test%26demo";')).toEqual({ 
        search: 'https://example.com/search?q=hello%20world&category=test%26demo' 
      });
    });

    test('143. URL with credentials', () => {
      expect(parseKeyValueString('db="https://user:pass@database.example.com:5432/mydb";')).toEqual({ 
        db: 'https://user:pass@database.example.com:5432/mydb' 
      });
    });

    test('144. FTP URL', () => {
      expect(parseKeyValueString('ftp=ftp://files.example.com/path/file.txt;')).toEqual({ 
        ftp: 'ftp://files.example.com/path/file.txt' 
      });
    });

    test('145. File URL', () => {
      expect(parseKeyValueString('local=file:///home/user/document.pdf;')).toEqual({ 
        local: 'file:///home/user/document.pdf' 
      });
    });

    test('146. Data URL', () => {
      expect(parseKeyValueString('image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";')).toEqual({ 
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==' 
      });
    });

    test('147. Blob URL', () => {
      expect(parseKeyValueString('blob=blob:https://example.com/550e8400-e29b-41d4-a716-446655440000;')).toEqual({ 
        blob: 'blob:https://example.com/550e8400-e29b-41d4-a716-446655440000' 
      });
    });

    test('148. Multiple URLs', () => {
      expect(parseKeyValueString('primary=https://api.example.com;fallback=https://backup.example.com;local=http://localhost:3000;')).toEqual({
        primary: 'https://api.example.com',
        fallback: 'https://backup.example.com',
        local: 'http://localhost:3000'
      });
    });

    test('149. URL array', () => {
      expect(parseKeyValueString('mirrors=https://cdn1.example.com,https://cdn2.example.com,https://cdn3.example.com;')).toEqual({
        mirrors: ['https://cdn1.example.com', 'https://cdn2.example.com', 'https://cdn3.example.com']
      });
    });

    test('150. URL with complex query string', () => {
      expect(parseKeyValueString('webhook="https://webhook.site/unique-id?source=app&timestamp=2023-01-01T00:00:00Z&signature=abc123";')).toEqual({ 
        webhook: 'https://webhook.site/unique-id?source=app&timestamp=2023-01-01T00:00:00Z&signature=abc123' 
      });
    });

    test('151. localhost variations', () => {
      expect(parseKeyValueString('dev=http://localhost:3000;staging=http://127.0.0.1:8080;prod=https://example.com;')).toEqual({
        dev: 'http://localhost:3000',
        staging: 'http://127.0.0.1:8080',
        prod: 'https://example.com'
      });
    });

    test('152. URL with international domain', () => {
      expect(parseKeyValueString('site="https://測試.例子.測試";')).toEqual({ 
        site: 'https://測試.例子.測試' 
      });
    });

    test('153. WebSocket URLs', () => {
      expect(parseKeyValueString('ws=ws://localhost:8080/socket;wss=wss://secure.example.com/ws;')).toEqual({
        ws: 'ws://localhost:8080/socket',
        wss: 'wss://secure.example.com/ws'
      });
    });

    test('154. Git URLs', () => {
      expect(parseKeyValueString('repo=git://github.com/user/repo.git;ssh=git@github.com:user/repo.git;')).toEqual({
        repo: 'git://github.com/user/repo.git',
        ssh: 'git@github.com:user/repo.git'
      });
    });

    test('155. URL with spaces (encoded)', () => {
      expect(parseKeyValueString('search="https://example.com/search?q=hello%20world%20test";')).toEqual({ 
        search: 'https://example.com/search?q=hello%20world%20test' 
      });
    });

    test('156. URL with special characters', () => {
      expect(parseKeyValueString('api="https://example.com/api/v1/test?filter=name!=null&sort=created_at";')).toEqual({ 
        api: 'https://example.com/api/v1/test?filter=name!=null&sort=created_at' 
      });
    });

    test('157. CDN URLs', () => {
      expect(parseKeyValueString('css=https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css;js=https://unpkg.com/react@17/umd/react.production.min.js;')).toEqual({
        css: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
        js: 'https://unpkg.com/react@17/umd/react.production.min.js'
      });
    });

    test('158. URL with hash and query', () => {
      expect(parseKeyValueString('docs="https://example.com/docs?version=v2&lang=en#installation";')).toEqual({ 
        docs: 'https://example.com/docs?version=v2&lang=en#installation' 
      });
    });

    test('159. API endpoints with versions', () => {
      expect(parseKeyValueString('v1=https://api.example.com/v1;v2=https://api.example.com/v2;beta=https://beta-api.example.com/v3;')).toEqual({
        v1: 'https://api.example.com/v1',
        v2: 'https://api.example.com/v2',
        beta: 'https://beta-api.example.com/v3'
      });
    });

    test('160. URL with deeply nested path', () => {
      expect(parseKeyValueString('resource=https://api.example.com/v1/users/123/posts/456/comments/789/replies;')).toEqual({ 
        resource: 'https://api.example.com/v1/users/123/posts/456/comments/789/replies' 
      });
    });

    test('161. URL serialization', () => {
      const data = { 
        url: 'https://example.com', 
        api: 'https://api.example.com/v1/test' 
      };
      expect(toKeyValueString(data)).toBe('url=https://example.com;api=https://api.example.com/v1/test;');
    });

    test('162. URL with query requiring quotes', () => {
      const data = { search: 'https://example.com/search?q=hello world' };
      expect(toKeyValueString(data)).toBe('search="https://example.com/search?q=hello world";');
    });

    test('163. Complex URL round-trip', () => {
      const original = 'api="https://example.com/api?key=123&value=hello world";';
      const parsed = parseKeyValueString(original);
      const serialized = toKeyValueString(parsed);
      expect(parseKeyValueString(serialized)).toEqual(parsed);
    });

    test('164. Multiple complex URLs', () => {
      const input = 'primary="https://api.example.com/v1?key=abc";secondary="https://backup.example.com/v2?key=def&timeout=30";';
      const parsed = parseKeyValueString(input);
      expect(parsed).toEqual({
        primary: 'https://api.example.com/v1?key=abc',
        secondary: 'https://backup.example.com/v2?key=def&timeout=30'
      });
    });

    test('165. URL array with mixed protocols', () => {
      expect(parseKeyValueString('endpoints=https://secure.example.com,http://legacy.example.com,ws://realtime.example.com;')).toEqual({
        endpoints: ['https://secure.example.com', 'http://legacy.example.com', 'ws://realtime.example.com']
      });
    });
  });

  describe('File Extensions and Paths (Tests 166-185)', () => {
    test('166. Simple file extension', () => {
      expect(parseKeyValueString('file=document.pdf;')).toEqual({ file: 'document.pdf' });
    });

    test('167. Multiple extensions', () => {
      expect(parseKeyValueString('archive=backup.tar.gz;')).toEqual({ archive: 'backup.tar.gz' });
    });

    test('168. Hidden files', () => {
      expect(parseKeyValueString('config=.env;git=.gitignore;')).toEqual({ 
        config: '.env', 
        git: '.gitignore' 
      });
    });

    test('169. Complex file names', () => {
      expect(parseKeyValueString('report=monthly-report_2023-12.xlsx;')).toEqual({ 
        report: 'monthly-report_2023-12.xlsx' 
      });
    });

    test('170. File paths', () => {
      expect(parseKeyValueString('path=src/components/Button.tsx;')).toEqual({ 
        path: 'src/components/Button.tsx' 
      });
    });

    test('171. Absolute paths', () => {
      expect(parseKeyValueString('log=/var/log/application.log;')).toEqual({ 
        log: '/var/log/application.log' 
      });
    });

    test('172. Windows paths', () => {
      expect(parseKeyValueString('exe="C:\\Program Files\\MyApp\\app.exe";')).toEqual({ 
        exe: 'C:\\Program Files\\MyApp\\app.exe' 
      });
    });

    test('173. Network paths', () => {
      expect(parseKeyValueString('share="\\\\server\\share\\folder\\file.txt";')).toEqual({ 
        share: '\\\\server\\share\\folder\\file.txt' 
      });
    });

    test('174. File extensions array', () => {
      expect(parseKeyValueString('images=photo.jpg,screenshot.png,diagram.svg,icon.webp;')).toEqual({
        images: ['photo.jpg', 'screenshot.png', 'diagram.svg', 'icon.webp']
      });
    });

    test('175. Mixed file types', () => {
      expect(parseKeyValueString('docs=readme.md,license.txt,changelog.rst;code=main.py,utils.js,styles.css;')).toEqual({
        docs: ['readme.md', 'license.txt', 'changelog.rst'],
        code: ['main.py', 'utils.js', 'styles.css']
      });
    });

    test('176. Files with spaces', () => {
      expect(parseKeyValueString('document="My Important Document.docx";')).toEqual({ 
        document: 'My Important Document.docx' 
      });
    });

    test('177. Special characters in filenames', () => {
      expect(parseKeyValueString('file="report(final)_v2.1[updated].xlsx";')).toEqual({ 
        file: 'report(final)_v2.1[updated].xlsx' 
      });
    });

    test('178. Version suffixed files', () => {
      expect(parseKeyValueString('app=myapp-v1.2.3.tar.gz;lib=libtest.so.1.0.0;')).toEqual({
        app: 'myapp-v1.2.3.tar.gz',
        lib: 'libtest.so.1.0.0'
      });
    });

    test('179. Temporary files', () => {
      expect(parseKeyValueString('temp=tmpfile.tmp;backup=data.bak;swap=file.swp;')).toEqual({
        temp: 'tmpfile.tmp',
        backup: 'data.bak',
        swap: 'file.swp'
      });
    });

    test('180. Long file paths', () => {
      expect(parseKeyValueString('deep=very/deep/nested/folder/structure/with/many/levels/final-file.txt;')).toEqual({ 
        deep: 'very/deep/nested/folder/structure/with/many/levels/final-file.txt' 
      });
    });

    test('181. File URLs', () => {
      expect(parseKeyValueString('local=file:///home/user/Documents/file.pdf;')).toEqual({ 
        local: 'file:///home/user/Documents/file.pdf' 
      });
    });

    test('182. Executable files', () => {
      expect(parseKeyValueString('binary=app;script=script.sh;batch=setup.bat;')).toEqual({
        binary: 'app',
        script: 'script.sh',
        batch: 'setup.bat'
      });
    });

    test('183. Archive formats', () => {
      expect(parseKeyValueString('zip=archive.zip;tar=data.tar;gz=compressed.gz;rar=backup.rar;')).toEqual({
        zip: 'archive.zip',
        tar: 'data.tar',
        gz: 'compressed.gz',
        rar: 'backup.rar'
      });
    });

    test('184. Media file extensions', () => {
      expect(parseKeyValueString('video=movie.mp4,clip.avi,presentation.mov;audio=song.mp3,podcast.wav,sound.flac;')).toEqual({
        video: ['movie.mp4', 'clip.avi', 'presentation.mov'],
        audio: ['song.mp3', 'podcast.wav', 'sound.flac']
      });
    });

    test('185. File path serialization', () => {
      const data = { 
        config: '.env', 
        main: 'src/index.ts', 
        output: 'dist/bundle.js' 
      };
      expect(toKeyValueString(data)).toBe('config=.env;main=src/index.ts;output=dist/bundle.js;');
    });
  });

  describe('Spaces and Special Whitespace (Tests 186-200)', () => {
    test('186. Values with leading spaces', () => {
      expect(parseKeyValueString('text=" leading space";')).toEqual({ text: ' leading space' });
    });

    test('187. Values with trailing spaces', () => {
      expect(parseKeyValueString('text="trailing space ";')).toEqual({ text: 'trailing space ' });
    });

    test('188. Values with both leading and trailing spaces', () => {
      expect(parseKeyValueString('text=" both sides ";')).toEqual({ text: ' both sides ' });
    });

    test('189. Values with multiple spaces', () => {
      expect(parseKeyValueString('text="multiple     spaces     here";')).toEqual({ text: 'multiple     spaces     here' });
    });

    test('190. Values with tabs', () => {
      expect(parseKeyValueString('text="tab\there";')).toEqual({ text: 'tab\there' });
    });

    test('191. Values with newlines', () => {
      expect(parseKeyValueString('text="line1\nline2\nline3";')).toEqual({ text: 'line1\nline2\nline3' });
    });

    test('192. Values with carriage returns', () => {
      expect(parseKeyValueString('text="line1\rline2";')).toEqual({ text: 'line1\rline2' });
    });

    test('193. Values with mixed whitespace', () => {
      expect(parseKeyValueString('text="  \t\n  mixed  \t\n  ";')).toEqual({ text: '  \t\n  mixed  \t\n  ' });
    });

    test('194. Array with spaced values', () => {
      expect(parseKeyValueString('list="  first  ","  second  ","  third  ";')).toEqual({
        list: ['  first  ', '  second  ', '  third  ']
      });
    });

    test('195. Values requiring quotes due to special chars', () => {
      expect(parseKeyValueString('value1="contains=equals";value2="has,comma";value3="has;semicolon";')).toEqual({
        value1: 'contains=equals',
        value2: 'has,comma',
        value3: 'has;semicolon'
      });
    });

    test('196. Only spaces as value', () => {
      expect(parseKeyValueString('spaces="     ";')).toEqual({ spaces: '     ' });
    });

    test('197. Empty quoted string vs spaces', () => {
      expect(parseKeyValueString('empty="";spaces="   ";')).toEqual({ 
        empty: '', 
        spaces: '   ' 
      });
    });

    test('198. Unicode spaces', () => {
      expect(parseKeyValueString('unicode=" \u00A0\u2000\u2001\u2002 ";')).toEqual({ 
        unicode: ' \u00A0\u2000\u2001\u2002 ' 
      });
    });

    test('199. Serialization preserves spaces', () => {
      const data = { 
        leading: ' space', 
        trailing: 'space ', 
        both: ' both ', 
        multiple: 'a   b   c' 
      };
      const serialized = toKeyValueString(data);
      expect(serialized).toBe('leading=" space";trailing="space ";both=" both ";multiple="a   b   c";');
      expect(parseKeyValueString(serialized)).toEqual(data);
    });

    test('200. Complex whitespace round-trip', () => {
      const original = 'text="  multi\nline\tstring  ";spaces="     ";mixed="a\tb\nc";';
      const parsed = parseKeyValueString(original);
      const serialized = toKeyValueString(parsed);
      expect(parseKeyValueString(serialized)).toEqual(parsed);
    });
  });

  describe('Error Handling', () => {
    test('Should throw on malformed input - no semicolon', () => {
      expect(() => parseKeyValueString('key=value')).toThrow();
    });

    test('Should throw on malformed input - no equals', () => {
      expect(() => parseKeyValueString('keyvalue;')).toThrow();
    });

    test('Should throw on malformed input - no key', () => {
      expect(() => parseKeyValueString('=value;')).toThrow();
    });

    test('Should throw on malformed input - incomplete', () => {
      expect(() => parseKeyValueString('key=')).toThrow();
    });
  });
}); 