/**
 * Lynx 模块示例
 * 
 * Lynx 模块提供简单的文本式 HTTP 获取功能
 * 类似于 Lynx 文本浏览器的功能
 */

// 引入 lynx 模块
let lynx = require('lynx');

// 示例 1: 获取网页原始内容
console.log('示例 1: 获取网页原始内容');
try {
    let url = 'https://www.example.com';
    let content = lynx.fetch(url);
    console.log('网页内容长度:', content.length);
    console.log('前 500 字符:');
    console.log(content.substring(0, 500));
} catch (e) {
    console.error('获取失败:', e.message);
}

console.log('\n' + '='.repeat(50) + '\n');

// 示例 2: 获取纯文本内容 (去除 HTML 标签)
console.log('示例 2: 获取纯文本内容');
try {
    let url = 'https://www.example.com';
    let text = lynx.fetchText(url);
    console.log('纯文本长度:', text.length);
    console.log('文本内容:');
    console.log(text.substring(0, 500));
} catch (e) {
    console.error('获取失败:', e.message);
}

console.log('\n' + '='.repeat(50) + '\n');

// 示例 3: 获取响应头
console.log('示例 3: 获取响应头');
try {
    let url = 'https://www.example.com';
    let headers = lynx.fetchHeaders(url);
    console.log('响应头:');
    for (let key in headers) {
        console.log(`  ${key}: ${headers[key]}`);
    }
} catch (e) {
    console.error('获取失败:', e.message);
}

console.log('\n' + '='.repeat(50) + '\n');
console.log('Lynx 模块版本:', lynx.version);

console.show();
