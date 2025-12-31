# Lynx Module

## Overview

The Lynx module provides simple text-based HTTP fetching functionality for AutoJs6, inspired by the Lynx text-based web browser. It offers a lightweight alternative for fetching web content when you only need simple text extraction.

## Installation

The Lynx module is built-in to AutoJs6. Simply require it in your script:

```javascript
let lynx = require('lynx');
```

## API Reference

### lynx.fetch(url, options)

Fetches a URL and returns its content as a string.

**Parameters:**
- `url` (string): The URL to fetch
- `options` (object, optional): Optional HTTP request options (same as http.get options)

**Returns:**
- (string): The response body as text

**Example:**
```javascript
let lynx = require('lynx');
let content = lynx.fetch('https://www.example.com');
console.log(content);
```

### lynx.fetchText(url, options)

Fetches a URL and returns its content with HTML tags stripped, leaving only plain text.

**Parameters:**
- `url` (string): The URL to fetch
- `options` (object, optional): Optional HTTP request options

**Returns:**
- (string): The response body as plain text (HTML tags removed)

**Example:**
```javascript
let lynx = require('lynx');
let text = lynx.fetchText('https://www.example.com');
console.log(text); // Only text content, no HTML tags
```

### lynx.fetchHeaders(url, options)

Fetches a URL and returns only the response headers.

**Parameters:**
- `url` (string): The URL to fetch
- `options` (object, optional): Optional HTTP request options

**Returns:**
- (object): The response headers

**Example:**
```javascript
let lynx = require('lynx');
let headers = lynx.fetchHeaders('https://www.example.com');
console.log('Content-Type:', headers['Content-Type']);
```

## Usage Examples

### Basic Text Fetching

```javascript
let lynx = require('lynx');

// Fetch raw HTML
let html = lynx.fetch('https://www.example.com');
console.log('HTML length:', html.length);

// Fetch plain text (HTML tags removed)
let text = lynx.fetchText('https://www.example.com');
console.log('Plain text:', text);
```

### With Request Options

```javascript
let lynx = require('lynx');

let options = {
    headers: {
        'User-Agent': 'AutoJs6 Lynx/1.0'
    }
};

let content = lynx.fetch('https://api.example.com/data', options);
console.log(content);
```

### Checking Response Headers

```javascript
let lynx = require('lynx');

let headers = lynx.fetchHeaders('https://www.example.com');
for (let key in headers) {
    console.log(`${key}: ${headers[key]}`);
}
```

## Features

- **Lightweight**: Simple interface for basic HTTP text fetching
- **HTML Stripping**: Built-in HTML tag removal for plain text extraction
- **Header Access**: Easy access to response headers
- **Compatible**: Uses AutoJs6's existing http module under the hood

## Limitations

- Basic HTML entity decoding (supports common entities like &nbsp;, &amp;, etc.)
- No JavaScript execution (fetches static content only)
- No CSS or complex HTML parsing (for that, use the cheerio module)

## Version

Current version: 1.0.0

## Related Modules

- `http` - Full HTTP client functionality
- `axios` - Promise-based HTTP client
- `cheerio` - jQuery-like HTML parsing

## License

Part of AutoJs6 project, licensed under MPL-2.0
