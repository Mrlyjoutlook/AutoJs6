/**
 * MLKit OCR 示例 - 支持中英文混合识别
 * MLKit OCR Example - Supports mixed Chinese and English recognition (chi_sim_eng)
 * 
 * MLKit 使用 ChineseTextRecognizerOptions，可以同时识别：
 * - 简体中文 (Simplified Chinese)
 * - 英文及其他拉丁文字 (English and other Latin scripts)
 */
!function internalApiForMLKitOcr() {
    console.show();

    // 切换到 MLKit 模式
    // Switch to MLKit mode
    ocr.tap('mlkit');

    let start = new Date();
    let img = images.read('test.png');
    let results = ocr.mlkit.detect(img);

    toastLog(`识别结束, 耗时: ${new Date() - start}ms`);
    toastLog(`Recognition completed, time: ${new Date() - start}ms`);

    log(`识别结果: ${JSON.stringify(
        Array.from(results).map((result) => {
            return { label: result.label, confidence: result.confidence, bounds: result.bounds };
        }))}`);

    // 仅获取文本内容
    // Get text content only
    let texts = ocr.mlkit(img);
    log(`文本内容: ${texts.join(', ')}`);
    log(`Text content: ${texts.join(', ')}`);

    // 回收图片
    // Recycle image
    img.recycle();
}();
