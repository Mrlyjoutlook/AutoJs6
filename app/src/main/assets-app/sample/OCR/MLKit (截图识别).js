/**
 * MLKit OCR 截图识别示例
 * MLKit OCR Screenshot Recognition Example
 * 
 * 支持中英文混合识别 (chi_sim_eng)
 * Supports mixed Chinese and English recognition
 */
!function screenshotRecognitionForMLKitOcr() {
    console.show();

    // 申请屏幕截图权限
    // Request screen capture permission
    if (!requestScreenCapture()) {
        toast('请授予屏幕截图权限 / Please grant screen capture permission');
        exit();
    }

    // 切换到 MLKit 模式
    // Switch to MLKit mode
    ocr.tap('mlkit');

    toast('3 秒后进行截图识别 / Screenshot recognition in 3 seconds');
    sleep(3000);

    let start = new Date();
    
    // 直接对屏幕截图进行识别
    // Recognize text from screen capture directly
    let texts = ocr();
    
    let elapsed = new Date() - start;
    
    log(`识别耗时: ${elapsed}ms`);
    log(`Recognition time: ${elapsed}ms`);
    
    log(`识别到的文本 / Recognized texts:`);
    texts.forEach((text, index) => {
        log(`[${index}] ${text}`);
    });

    toast(`识别完成，共识别到 ${texts.length} 个文本块\nRecognized ${texts.length} text blocks`);
}();
