# 八金官网

这是八金 iOS 记账应用的官方网站，托管在 GitHub Pages 上。

## 网站结构

```
website/
├── index.html          # 首页
├── privacy.html        # 隐私政策页面
├── support.html        # 支持页面
├── styles.css          # 样式表
├── .nojekyll          # GitHub Pages 配置
└── README.md          # 本文档
```

## 部署到 GitHub Pages

### 方法 1: 通过仓库设置部署

1. 将 `website` 目录推送到 GitHub 仓库
2. 进入仓库的 Settings → Pages
3. 在 "Build and deployment" 部分：
   - Source: Deploy from a branch
   - Branch: 选择 `main` 分支
   - Folder: 选择 `/website` 文件夹
4. 点击 Save，等待几分钟后网站即可访问

### 方法 2: 使用 GitHub Actions（推荐）

创建 `.github/workflows/deploy-website.yml` 文件：

```yaml
name: Deploy Website

on:
  push:
    branches:
      - main
    paths:
      - 'website/**'

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: 'website'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 自定义域名（可选）

如果您有自定义域名：

1. 在 `website` 目录下创建 `CNAME` 文件
2. 文件内容为您的域名，例如：`bajin.app`
3. 在您的域名提供商处添加 DNS 记录：
   ```
   Type: CNAME
   Name: www (或 @)
   Value: yourusername.github.io
   ```

## 本地测试

使用 Python 的简单 HTTP 服务器：

```bash
cd website
python3 -m http.server 8000
```

然后在浏览器访问 `http://localhost:8000`

## 技术栈

- 纯静态 HTML/CSS
- 响应式设计，支持移动端和桌面端
- 无需构建工具
- 快速加载，SEO 友好

## App Store 合规

本网站符合 App Store 的要求：

- ✅ 包含隐私政策页面
- ✅ 包含支持/联系方式页面
- ✅ 清晰说明应用功能
- ✅ 提供用户帮助文档

## 许可

© 2025 八金. All rights reserved.
