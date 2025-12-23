// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols

/**
 * @module ocr
 * @description OCR (Optical Character Recognition) utility module
 * Provides convenience methods for text recognition and detection
 */

module.exports = function (scriptRuntime, scope) {

    /**
     * Find text in screen or image
     * @param {string|RegExp} pattern - Text or regex pattern to find
     * @param {ImageWrapper|OmniRegion} [imgOrRegion] - Image or region to search in
     * @param {OcrOptions} [options] - OCR options
     * @returns {OcrResult|null} First matching result or null
     */
    function findText(pattern, imgOrRegion, options) {
        let results;
        if (arguments.length === 1) {
            results = ocr.detect();
        } else if (arguments.length === 2) {
            results = ocr.detect(imgOrRegion);
        } else {
            results = ocr.detect(imgOrRegion, options);
        }

        if (!results || results.length === 0) {
            return null;
        }

        for (let i = 0; i < results.length; i++) {
            let result = results[i];
            if (pattern instanceof RegExp) {
                if (pattern.test(result.label)) {
                    return result;
                }
            } else if (typeof pattern === 'string') {
                if (result.label.includes(pattern)) {
                    return result;
                }
            }
        }
        return null;
    }

    /**
     * Find all text matching pattern
     * @param {string|RegExp} pattern - Text or regex pattern to find
     * @param {ImageWrapper|OmniRegion} [imgOrRegion] - Image or region to search in
     * @param {OcrOptions} [options] - OCR options
     * @returns {OcrResult[]} All matching results
     */
    function findAllText(pattern, imgOrRegion, options) {
        let results;
        if (arguments.length === 1) {
            results = ocr.detect();
        } else if (arguments.length === 2) {
            results = ocr.detect(imgOrRegion);
        } else {
            results = ocr.detect(imgOrRegion, options);
        }

        if (!results || results.length === 0) {
            return [];
        }

        let matched = [];
        for (let i = 0; i < results.length; i++) {
            let result = results[i];
            if (pattern instanceof RegExp) {
                if (pattern.test(result.label)) {
                    matched.push(result);
                }
            } else if (typeof pattern === 'string') {
                if (result.label.includes(pattern)) {
                    matched.push(result);
                }
            }
        }
        return matched;
    }

    /**
     * Check if text exists in screen or image
     * @param {string|RegExp} pattern - Text or regex pattern to find
     * @param {ImageWrapper|OmniRegion} [imgOrRegion] - Image or region to search in
     * @param {OcrOptions} [options] - OCR options
     * @returns {boolean} True if text exists
     */
    function hasText(pattern, imgOrRegion, options) {
        return findText(pattern, imgOrRegion, options) !== null;
    }

    /**
     * Wait for text to appear
     * @param {string|RegExp} pattern - Text or regex pattern to wait for
     * @param {number} [timeout=10000] - Timeout in milliseconds
     * @param {number} [interval=1000] - Check interval in milliseconds
     * @returns {OcrResult|null} Found result or null if timeout
     */
    function waitForText(pattern, timeout, interval) {
        timeout = timeout || 10000;
        interval = interval || 1000;

        let startTime = Date.now();
        while (Date.now() - startTime < timeout) {
            let result = findText(pattern);
            if (result !== null) {
                return result;
            }
            sleep(interval);
        }
        return null;
    }

    /**
     * Click on text if found
     * @param {string|RegExp} pattern - Text or regex pattern to find and click
     * @param {ImageWrapper|OmniRegion} [imgOrRegion] - Image or region to search in
     * @param {OcrOptions} [options] - OCR options
     * @returns {boolean} True if clicked, false if not found
     */
    function clickText(pattern, imgOrRegion, options) {
        let result = findText(pattern, imgOrRegion, options);
        if (result === null) {
            return false;
        }

        let bounds = result.bounds;
        let centerX = bounds.centerX();
        let centerY = bounds.centerY();
        click(centerX, centerY);
        return true;
    }

    /**
     * Get all recognized text as a single string
     * @param {ImageWrapper|OmniRegion} [imgOrRegion] - Image or region to search in
     * @param {OcrOptions} [options] - OCR options
     * @param {string} [separator='\n'] - Separator between lines
     * @returns {string} Concatenated text
     */
    function getAllText(imgOrRegion, options, separator) {
        let results;
        if (arguments.length === 0) {
            results = ocr.recognizeText();
        } else if (arguments.length === 1) {
            if (typeof imgOrRegion === 'string') {
                separator = imgOrRegion;
                results = ocr.recognizeText();
            } else {
                results = ocr.recognizeText(imgOrRegion);
            }
        } else if (arguments.length === 2) {
            if (typeof options === 'string') {
                separator = options;
                results = ocr.recognizeText(imgOrRegion);
            } else {
                results = ocr.recognizeText(imgOrRegion, options);
            }
        } else {
            results = ocr.recognizeText(imgOrRegion, options);
        }

        separator = separator || '\n';
        return results.join(separator);
    }

    /**
     * Extract numbers from text
     * @param {ImageWrapper|OmniRegion} [imgOrRegion] - Image or region to search in
     * @param {OcrOptions} [options] - OCR options
     * @returns {number[]} Array of numbers found
     */
    function extractNumbers(imgOrRegion, options) {
        let text;
        if (arguments.length === 0) {
            text = getAllText();
        } else if (arguments.length === 1) {
            text = getAllText(imgOrRegion);
        } else {
            text = getAllText(imgOrRegion, options);
        }

        let numberPattern = /-?\d+\.?\d*/g;
        let matches = text.match(numberPattern);
        if (!matches) {
            return [];
        }

        return matches.map(function (match) {
            return parseFloat(match);
        }).filter(function (num) {
            return !isNaN(num);
        });
    }

    /**
     * Filter OCR results by confidence threshold
     * @param {OcrResult[]} results - OCR results to filter
     * @param {number} minConfidence - Minimum confidence (0-1)
     * @returns {OcrResult[]} Filtered results
     */
    function filterByConfidence(results, minConfidence) {
        if (!results || results.length === 0) {
            return [];
        }

        return results.filter(function (result) {
            return result.confidence >= minConfidence;
        });
    }

    /**
     * Sort OCR results by position (top to bottom, left to right)
     * @param {OcrResult[]} results - OCR results to sort
     * @returns {OcrResult[]} Sorted results
     */
    function sortByPosition(results) {
        if (!results || results.length === 0) {
            return [];
        }

        return results.sort(function (a, b) {
            let aTop = a.bounds.top;
            let bTop = b.bounds.top;
            let aLeft = a.bounds.left;
            let bLeft = b.bounds.left;

            // Sort by top position first (with tolerance for same line)
            let tolerance = 20;
            if (Math.abs(aTop - bTop) > tolerance) {
                return aTop - bTop;
            }
            // If on same line, sort by left position
            return aLeft - bLeft;
        });
    }

    return {
        findText: findText,
        findAllText: findAllText,
        hasText: hasText,
        waitForText: waitForText,
        clickText: clickText,
        getAllText: getAllText,
        extractNumbers: extractNumbers,
        filterByConfidence: filterByConfidence,
        sortByPosition: sortByPosition,
    };

};
