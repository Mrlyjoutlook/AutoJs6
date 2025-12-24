# MLKit OCR - 中英文混合识别支持 (chi_sim_eng)

## 概述 / Overview

AutoJs6 的 MLKit OCR 模块支持同时识别简体中文和英文文本（chi_sim_eng）。

AutoJs6's MLKit OCR module supports simultaneous recognition of Simplified Chinese and English text (chi_sim_eng).

## 技术实现 / Technical Implementation

MLKit 使用 `ChineseTextRecognizerOptions` 配置，该配置原生支持以下脚本：
- 简体中文字符 (Simplified Chinese characters)
- 拉丁文字 (Latin script)，包括英文及其他欧洲语言

MLKit uses `ChineseTextRecognizerOptions` which natively supports:
- Simplified Chinese characters
- Latin script (English and other European languages)

## 使用示例 / Usage Examples

### 方法 1: 使用内置 API / Method 1: Using Built-in API

```javascript
// 切换到 MLKit 模式
ocr.tap('mlkit');

// 识别图片中的中英文文本
let img = images.read('test.png');
let texts = ocr.mlkit(img);
console.log(texts);

// 获取详细识别结果（包括位置和置信度）
let results = ocr.mlkit.detect(img);
results.forEach(result => {
    console.log(`文本: ${result.label}, 置信度: ${result.confidence}`);
});
```

### 方法 2: 使用原始类 / Method 2: Using Original Class

```javascript
importClass(org.autojs.autojs.runtime.api.OcrMLKit);

let ocr = new OcrMLKit();
let img = images.read('test.png');

// 识别文本
let texts = ocr.recognizeText(img);
console.log(texts);

// 获取详细结果
let results = ocr.detect(img);

// 释放资源
ocr.release();
img.recycle();
```

### 方法 3: 截图识别 / Method 3: Screenshot Recognition

```javascript
// 申请截图权限
requestScreenCapture();

// 切换到 MLKit 模式
ocr.tap('mlkit');

// 直接识别屏幕内容
let texts = ocr();
console.log(texts);
```

## 支持的语言 / Supported Languages

- ✅ 简体中文 (Simplified Chinese / zh-Hans)
- ✅ 英文 (English / en)
- ✅ 其他拉丁文字语言 (Other Latin script languages)
  - 法语 (French)
  - 西班牙语 (Spanish)
  - 德语 (German)
  - 意大利语 (Italian)
  - 等等 (etc.)

## 示例文件 / Sample Files

查看以下示例文件了解更多用法：

See the following sample files for more usage:

- `MLKit (内置API).js` - 使用内置 API 的基本示例
- `MLKit (截图识别).js` - 屏幕截图识别示例
- `MLKit (原始类).js` - 使用原始类的示例

## 性能说明 / Performance Notes

- MLKit 的中英文识别是在设备上本地执行的，无需网络连接
- MLKit Chinese-English recognition runs locally on-device, no internet connection required

- 相比 PaddleOCR，MLKit 通常速度更快但准确度可能略低
- Compared to PaddleOCR, MLKit is usually faster but may have slightly lower accuracy

## 参考文档 / References

- [Google MLKit Text Recognition v2](https://developers.google.com/ml-kit/vision/text-recognition/v2)
- [ChineseTextRecognizerOptions API](https://developers.google.com/android/reference/com/google/mlkit/vision/text/chinese/ChineseTextRecognizerOptions)
- [AutoJs6 OCR Documentation](https://docs.autojs6.com/#/ocr)
