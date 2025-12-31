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
     */
    function fetch(url, options) {
        options = options || {};
        const response = http.get(url, options);
        return response.body.string();
    }
    
    /**
     * Fetch a URL and return its text content with stripped HTML tags
     * @param {string} url - The URL to fetch
     * @param {object} options - Optional request options
     * @returns {string} The response body as plain text (HTML tags removed)
     */
    function fetchText(url, options) {
        const content = fetch(url, options);
        // Simple HTML tag removal (for basic text extraction)
        return content.replace(/<[^>]*>/g, '')
                     .replace(/&nbsp;/g, ' ')
                     .replace(/&amp;/g, '&')
                     .replace(/&lt;/g, '<')
                     .replace(/&gt;/g, '>')
                     .replace(/&quot;/g, '"')
                     .replace(/&#39;/g, "'")
                     .trim();
    }
    
    /**
     * Fetch a URL and return response headers
     * @param {string} url - The URL to fetch
     * @param {object} options - Optional request options
     * @returns {object} The response headers
     */
    function fetchHeaders(url, options) {
        options = options || {};
        const response = http.get(url, options);
        return response.headers;
    }
    
    module.exports = {
        fetch: fetch,
        fetchText: fetchText,
        fetchHeaders: fetchHeaders,
        version: '1.0.0'
    };
}();
