# Fengcreative Portfolio 部署指南

## 一、Cloudflare Pages 部署（推荐）

### 1. 注册 Cloudflare 账号
访问 https://dash.cloudflare.com/sign-up 注册。

### 2. 连接 GitHub 仓库
1. 登录 Cloudflare Dashboard → **Workers & Pages** → **Create**
2. 选择 **Pages** → **Connect to Git**
3. 授权并选择你的 GitHub 仓库 `Paker-kk/avabbbb`（或改名后的仓库）
4. 配置构建设置：
   - **Framework preset**: 无（手动配置）
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`（默认）
5. 点击 **Save and Deploy**

### 3. 自定义域名
1. 在 Cloudflare Pages 项目 → **Custom domains** → **Set up a custom domain**
2. 输入你购买的域名（推荐在 Cloudflare Registrar 购买，.com 约 $9/年零加价）
3. 如果域名不在 Cloudflare，需要修改 DNS 的 CNAME 记录指向 `<project>.pages.dev`

### 4. SPA 路由
`public/_redirects` 文件已配置 `/* /index.html 200`，Cloudflare Pages 会自动识别，BrowserRouter 无需额外处理。

---

## 二、GitHub Pages 部署（备选）

### 前提条件
- 仓库名需要是 `avabbbb`（与 vite.config.ts 中 base 路径一致）
- 或修改 vite.config.ts 中的 base 为你的实际仓库名

### 步骤
1. 在 GitHub 仓库 → **Settings** → **Pages**
2. Source 选择 **GitHub Actions**
3. `.github/workflows/deploy.yml` 已配置好，push 到 `main` 分支即自动部署
4. 部署完成后访问: `https://paker-kk.github.io/avabbbb/`

### 注意事项
- GitHub Pages 使用子路径部署，需要设置环境变量 `DEPLOY_TARGET=github`
- workflow 已配置此环境变量
- **GitHub Pages 不原生支持 BrowserRouter**，如果用 GH Pages 且需要 BrowserRouter，需要在 `public/404.html` 添加重定向脚本（进阶方案）

---

## 三、域名购买建议

### 推荐域名
- `fengcreative.com` — 清晰表达「创意」定位
- `fengcreative.dev` — 强调技术身份
- `feng.design` — 如果做设计方向

### 购买渠道
1. **Cloudflare Registrar**（推荐）: https://dash.cloudflare.com/domains — 零加价，直接连 Pages
2. **Namecheap**: https://www.namecheap.com/ — 价格透明
3. **Google Domains**: 已转移到 Squarespace

---

## 四、环境变量说明

| 变量 | 用途 | 平台 |
|---|---|---|
| `DEPLOY_TARGET` | 设为 `github` 时 base 路径变为 `/avabbbb/` | GitHub Actions |
| `GEMINI_API_KEY` | Gemini API（如使用） | 构建时注入 |

---

## 五、本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
# 访问 http://localhost:3000

# 构建（Cloudflare Pages / 自定义域名）
npm run build

# 构建（GitHub Pages）
DEPLOY_TARGET=github npm run build

# 本地预览构建产物
npm run preview
```

---

## 六、AI 聊天功能

API Key 已从代码中移除。用户需要在 AI 聊天窗口中点击⚙️图标，自行输入 DeepSeek API Key。
Key 仅保存在用户浏览器的 localStorage 中，不会上传到任何服务器。

### 后续优化（可选）
如果需要让访客无需输入 Key 就能使用 AI 聊天：
1. 创建 Cloudflare Worker 作为 API 代理
2. 将 DeepSeek API Key 存储在 Worker 的环境变量中
3. 前端改为调用 Worker 端点而非直接调用 DeepSeek API
