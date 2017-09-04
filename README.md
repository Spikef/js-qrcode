# js-qrcode

web端基于纯js实现的二维码生成模块

## Feature

* 支持中文  
* 使用简单
* 无外部依赖
* umd加载

## Install

```bash
$ npm i js-qrcode --save
```

## Usage

### 引用

方式一：

```html
<script src="./node_modules/js-qrcode/dist/qrcode.js"></script>
```

方式二：

```javascript
var QRCode = require('js-qrcode');
```

### 生成二维码

```javascript
var text = document.querySelector('#text').value;
var container = document.querySelector('#container');
var qr = new QRCode(container, {
    width          : 256,
    height         : 256,
    typeNumber     : -1,
    correctLevel   : 2,
    background     : "#ffffff",
    foreground     : "#000000"
});

qr.make(text);
```