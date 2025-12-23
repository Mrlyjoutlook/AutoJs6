/**
 * @author AutoJs6 Contributors
 * @description Sample demonstrating the OCR module utility functions
 */
!function sampleOcrModuleFunctions() {
    console.show();

    // Read test image
    let img = images.read('test.png');

    console.log('=== OCR Module Utility Functions Demo ===\n');

    // Example 1: Find specific text
    console.log('1. Finding text "app":');
    let result = ocr.findText('app', img);
    if (result) {
        console.log(`   Found: "${result.label}" at (${result.bounds.left}, ${result.bounds.top})`);
        console.log(`   Confidence: ${result.confidence}`);
    } else {
        console.log('   Not found');
    }

    // Example 2: Find all matching text
    console.log('\n2. Finding all text containing "a":');
    let allResults = ocr.findAllText('a', img);
    console.log(`   Found ${allResults.length} results:`);
    allResults.forEach((r, i) => {
        console.log(`   [${i}] "${r.label}"`);
    });

    // Example 3: Check if text exists
    console.log('\n3. Checking if "app" exists:');
    let hasApp = ocr.hasText('app', img);
    console.log(`   Result: ${hasApp}`);

    // Example 4: Get all text as single string
    console.log('\n4. Getting all text:');
    let allText = ocr.getAllText(img);
    console.log(`   All text:\n   ${allText.replace(/\n/g, '\n   ')}`);

    // Example 5: Extract numbers
    console.log('\n5. Extracting numbers:');
    let numbers = ocr.extractNumbers(img);
    console.log(`   Found numbers: ${numbers.join(', ')}`);

    // Example 6: Filter by confidence
    console.log('\n6. Filtering by confidence > 0.8:');
    let detections = ocr.detect(img);
    let highConfidence = ocr.filterByConfidence(detections, 0.8);
    console.log(`   ${highConfidence.length}/${detections.length} results with confidence > 0.8`);

    // Example 7: Sort by position
    console.log('\n7. Sorting results by position (top to bottom, left to right):');
    let sorted = ocr.sortByPosition(detections);
    console.log('   Order:');
    sorted.forEach((r, i) => {
        console.log(`   [${i}] "${r.label}" at (${r.bounds.left}, ${r.bounds.top})`);
    });

    // Example 8: Using regex pattern
    console.log('\n8. Finding text matching regex /\\d+/:');
    let numberPattern = /\d+/;
    let numberResult = ocr.findText(numberPattern, img);
    if (numberResult) {
        console.log(`   Found: "${numberResult.label}"`);
    } else {
        console.log('   Not found');
    }

    // Clean up
    img.recycle();

    console.log('\n=== Demo Complete ===');
}();
