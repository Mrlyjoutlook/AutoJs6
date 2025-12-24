/**
 * MLKit OCR 原始类示例
 * MLKit OCR Original Class Example
 * 
 * 使用原始 OcrMLKit 类进行文本识别
 * Use the original OcrMLKit class for text recognition
 * 
 * 支持中英文混合识别 (chi_sim_eng)
 * Supports mixed Chinese and English recognition
 */
!function originalClassForMLKitOcr() {
    console.show();

    // 导入 OcrMLKit 类
    // Import OcrMLKit class
    importClass(org.autojs.autojs.runtime.api.OcrMLKit);

    let ocr = new OcrMLKit();

    let start = new Date();
    let img = images.read('test.png');

    // 检测文本并获取详细结果
    // Detect text and get detailed results
    let results = ocr.detect(img);
    
    log(`识别到 ${results.size()} 个文本块`);
    log(`Detected ${results.size()} text blocks`);

    for (let i = 0; i < results.size(); i++) {
        let result = results.get(i);
        log(`[${i}] 文本: ${result.label}, 置信度: ${result.confidence}`);
        log(`[${i}] Text: ${result.label}, Confidence: ${result.confidence}`);
    }

    // 仅获取文本内容
    // Get text content only
    let texts = ocr.recognizeText(img);
    log(`所有文本 / All texts: ${texts}`);

    let elapsed = new Date() - start;
    toastLog(`识别完成，耗时: ${elapsed}ms / Recognition completed, time: ${elapsed}ms`);

    // 释放资源
    // Release resources
    ocr.release();
    img.recycle();
}();
