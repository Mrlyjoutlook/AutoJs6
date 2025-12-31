/**
 * Lynx Module Example
 * 
 * The Lynx module provides simple text-based HTTP fetching functionality
 * Similar to the Lynx text-based browser
 */

// Import lynx module
let lynx = require('lynx');

// Example 1: Fetch raw webpage content
console.log('Example 1: Fetch raw webpage content');
try {
    let url = 'https://www.example.com';
    let content = lynx.fetch(url);
    console.log('Content length:', content.length);
    console.log('First 500 characters:');
    console.log(content.substring(0, 500));
} catch (e) {
    console.error('Fetch failed:', e.message);
}

console.log('\n' + '='.repeat(50) + '\n');

// Example 2: Fetch plain text content (HTML tags removed)
console.log('Example 2: Fetch plain text content');
try {
    let url = 'https://www.example.com';
    let text = lynx.fetchText(url);
    console.log('Plain text length:', text.length);
    console.log('Text content:');
    console.log(text.substring(0, 500));
} catch (e) {
    console.error('Fetch failed:', e.message);
}

console.log('\n' + '='.repeat(50) + '\n');

// Example 3: Fetch response headers
console.log('Example 3: Fetch response headers');
try {
    let url = 'https://www.example.com';
    let headers = lynx.fetchHeaders(url);
    console.log('Response headers:');
    for (let key in headers) {
        console.log(`  ${key}: ${headers[key]}`);
    }
} catch (e) {
    console.error('Fetch failed:', e.message);
}

console.log('\n' + '='.repeat(50) + '\n');
console.log('Lynx module version:', lynx.version);

console.show();
