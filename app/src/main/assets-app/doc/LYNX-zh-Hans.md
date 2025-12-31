# Lynx 模块

## 概述

Lynx 模块为 AutoJs6 提供简单的基于文本的 HTTP 获取功能，其灵感来源于 Lynx 文本浏览器。当您只需要简单的文本提取时，它提供了一个轻量级的网页内容获取方案。

## 安装

Lynx 模块是 AutoJs6 的内置模块。只需在脚本中引用即可：

```javascript
let lynx = require('lynx');
```

## API 参考

### lynx.fetch(url, options)

获取 URL 并将其内容作为字符串返回。

**参数：**
- `url` (字符串)：要获取的 URL
- `options` (对象，可选)：可选的 HTTP 请求选项（与 http.get 选项相同）

**返回：**
- (字符串)：响应正文文本

**示例：**
```javascript
let lynx = require('lynx');
let content = lynx.fetch('https://www.example.com');
console.log(content);
```

### lynx.fetchText(url, options)

获取 URL 并返回去除 HTML 标签后的纯文本内容。

**参数：**
- `url` (字符串)：要获取的 URL
- `options` (对象，可选)：可选的 HTTP 请求选项

**返回：**
- (字符串)：去除 HTML 标签后的纯文本响应正文

**示例：**
```javascript
let lynx = require('lynx');
let text = lynx.fetchText('https://www.example.com');
console.log(text); // 仅文本内容，无 HTML 标签
```

### lynx.fetchHeaders(url, options)

获取 URL 并仅返回响应头。

**参数：**
- `url` (字符串)：要获取的 URL
- `options` (对象，可选)：可选的 HTTP 请求选项

**返回：**
- (对象)：响应头

**示例：**
```javascript
let lynx = require('lynx');
let headers = lynx.fetchHeaders('https://www.example.com');
console.log('Content-Type:', headers['Content-Type']);
```

## 使用示例

### 基本文本获取

```javascript
let lynx = require('lynx');

// 获取原始 HTML
let html = lynx.fetch('https://www.example.com');
console.log('HTML 长度:', html.length);

// 获取纯文本（去除 HTML 标签）
let text = lynx.fetchText('https://www.example.com');
console.log('纯文本:', text);
```

### 使用请求选项

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

### 检查响应头

```javascript
let lynx = require('lynx');

let headers = lynx.fetchHeaders('https://www.example.com');
for (let key in headers) {
    console.log(`${key}: ${headers[key]}`);
}
```

## 功能特点

- **轻量级**：用于基本 HTTP 文本获取的简单接口
- **HTML 标签剥离**：内置 HTML 标签移除功能，可提取纯文本
- **响应头访问**：轻松访问响应头
- **兼容性**：底层使用 AutoJs6 现有的 http 模块

## 限制

- 基本 HTML 实体解码（支持 &nbsp;、&amp; 等常见实体）
- 不执行 JavaScript（仅获取静态内容）
- 无 CSS 或复杂 HTML 解析（如需此功能，请使用 cheerio 模块）

## 版本

当前版本：1.0.0

## 相关模块

- `http` - 完整的 HTTP 客户端功能
- `axios` - 基于 Promise 的 HTTP 客户端
- `cheerio` - 类似 jQuery 的 HTML 解析

## 许可证

AutoJs6 项目的一部分，采用 MPL-2.0 许可证
