# 弹幕动漫 (Danmaku Bangumi) - 后端服务

基于 Node.js (Express) + MongoDB 的流媒体资源聚合与弹弹play弹幕中继服务。

## ✨ 特性

- **多源异构采集**：兼容苹果CMS（MacCMS）规范，支持 XML / JSON 采集与解析，自动清洗切片直链。
- **弹幕代理与签名加密**：基于 SHA-256 算法实现与弹弹play开放平台鉴权中继，解密反解十进制弹幕颜色与类型。
- **轻量无状态中继**：不存储任何音视频大文件，仅保存影视元数据与 M3U8 切片直链，单机低内存运行。

## 🛠️ 技术栈

- **运行时**：Node.js
- **Web 框架**：Express
- **数据库**：MongoDB
- **XML 解析**：x2js
- **HTTP 客户端**：Axios

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env`：

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017
DANDAN_APP_ID=your_dandanplay_app_id
DANDAN_APP_SECRET=your_dandanplay_app_secret
```

### 3. 启动服务

```bash
node serve.js
```

## ⚠️ 免责声明

本项目仅供数据采集算法、API 代理签名与 Node.js 后端学习交流使用。所有视频切片与影视信息均来源于网络公开接口，弹幕数据来源于第三方开放平台。
