const parser = require('./src/keyvalue-parser.js');

const testCases = [
    'a=9f939;',
    'name=john;',
    'key=value,another;'
];

testCases.forEach((testCase, i) => {
    try {
        console.log(`Test ${i + 1}: "${testCase}"`);
        const result = parser.parse(testCase);
        console.log('Result:', JSON.stringify(result, null, 2));
    } catch (error) {
        console.log('Error:', error.message);
    }
    console.log('---');
}); 