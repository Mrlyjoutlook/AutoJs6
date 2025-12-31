/**
 * Lynx - Simple text-based HTTP fetching module
 * Provides a simple interface for fetching web content as text
 */
!function () {
    const http = require('http');
    
    /**
     * Fetch a URL and return its text content
     * @param {string} url - The URL to fetch
     * @param {object} options - Optional request options
     * @returns {string} The response body as text
     * @throws {Error} If URL is invalid or request fails
     */
    function fetch(url, options) {
        if (!url || typeof url !== 'string') {
            throw new Error('Invalid URL: URL must be a non-empty string');
        }
        options = options || {};
        const response = http.get(url, options);
        if (!response || !response.body) {
            throw new Error('Failed to fetch URL: ' + url);
        }
        return response.body.string();
    }
    
    /**
     * Decode HTML entities (basic implementation)
     * Note: This handles common entities. For comprehensive decoding, use cheerio module.
     * @param {string} text - Text with HTML entities
     * @returns {string} Text with decoded entities
     */
    function decodeHtmlEntities(text) {
        // Decode numeric entities first, then named entities
        // &amp; is decoded last to avoid double-unescaping
        return text
            .replace(/&#(\d+);/g, function(match, dec) {
                return String.fromCharCode(dec);
            })
            .replace(/&#x([0-9a-f]+);/gi, function(match, hex) {
                return String.fromCharCode(parseInt(hex, 16));
            })
            .replace(/&nbsp;/g, ' ')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&amp;/g, '&');  // Must be last to avoid double-unescaping
    }
    
    /**
     * Fetch a URL and return its text content with stripped HTML tags
     * @param {string} url - The URL to fetch
     * @param {object} options - Optional request options
     * @returns {string} The response body as plain text (HTML tags removed)
     * @throws {Error} If URL is invalid or request fails
     * @note This function removes ALL HTML tags including <script> tags.
     *       For security-critical applications, use a proper HTML sanitizer.
     */
    function fetchText(url, options) {
        if (!url || typeof url !== 'string') {
            throw new Error('Invalid URL: URL must be a non-empty string');
        }
        options = options || {};
        // Fetch response directly to avoid duplicate HTTP request
        const response = http.get(url, options);
        if (!response || !response.body) {
            throw new Error('Failed to fetch URL: ' + url);
        }
        const content = response.body.string();
        
        // Remove HTML tags completely (including script tags and attributes)
        // This regex removes all tags but doesn't protect against XSS if output is used in HTML context
        const textOnly = content.replace(/<[^>]*>/g, '');
        return decodeHtmlEntities(textOnly).trim();
    }
    
    /**
     * Fetch a URL and return response headers
     * @param {string} url - The URL to fetch
     * @param {object} options - Optional request options
     * @returns {object} The response headers
     * @throws {Error} If URL is invalid or request fails
     */
    function fetchHeaders(url, options) {
        if (!url || typeof url !== 'string') {
            throw new Error('Invalid URL: URL must be a non-empty string');
        }
        options = options || {};
        const response = http.get(url, options);
        if (!response) {
            throw new Error('Failed to fetch URL: ' + url);
        }
        return response.headers;
    }
    
    module.exports = {
        fetch: fetch,
        fetchText: fetchText,
        fetchHeaders: fetchHeaders,
        version: '1.0.0'
    };
}();
