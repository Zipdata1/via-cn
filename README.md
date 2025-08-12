# VIA 中文适配版（via-cn）

> **TL;DR**：这是基于 [VIA](https://www.caniusevia.com/) 的中文适配与本地化项目。**强制中文界面**，面向国内用户的使用习惯做了优化。当前处于**半成品**阶段：主要路径已汉化，但仍有缺失与若干已知问题。欢迎提交 PR 共同完善。

---

## 功能特性（当前状态）
- ✅ 默认中文 UI（不依赖浏览器语言）
- ✅ 面向国内网络环境的基础优化建议
- ⚠️ 汉化覆盖度：核心页面为主，部分文案与边缘功能尚未处理
- ⚠️ 仍存在若干 bug & 待优化交互

> **面向企业的落地建议**：构建后为纯静态资源，建议托管于 **Nginx/内网静态服务器/对象存储（CDN）**，便于内网访问与版本管控。

---

## 快速开始

### 1) 获取代码
```bash
git clone https://github.com/Zipdata1/via-cn.git
cd via-cn
```

### 2) 安装依赖（推荐 Node.js 18+ 与 npm）
> 在国内网络环境下，建议先切换镜像源以提升安装成功率与稳定性。
```bash
# 可选：切换到国内镜像
npm config set registry https://registry.npmmirror.com

# 安装依赖
npm install
```

> **遇到 via-keyboards 相关依赖异常？**  
> 可按下述「Bun（可选）方案」处理，通常用于 Windows/国内网络下的拉取失败场景。

**Bun（可选）方案**
```powershell
# 1) 安装 Bun（Windows PowerShell）
powershell -c "irm bun.sh/install.ps1 | iex"

# 2) 使用 Bun 安装依赖
bun install

# 3) 若 via-keyboards 依赖异常，执行修复（仅在报错时使用）
bun uninstall --force via-keyboards
bun install --force github:the-via/keyboards
```

### 3) 本地开发
```bash
npm run dev
# 默认地址：http://localhost:5173
# 端口占用时可临时指定：npm run dev -- --port 5174
```

### 4) 构建生产版本
```bash
npm run build
# 产物输出目录：dist/
```

### 5) 本地预览（生产模式）
```bash
npm run start
# 访问：http://localhost:8080
```

---

## 目录结构（示例）
> 以 Vite 项目为参考，实际以仓库为准。
```
via-cn/
├─ src/                 # 源码（含中文文案与适配逻辑）
├─ public/              # 静态资源
├─ dist/                # 生产构建输出（执行 build 后生成）
├─ package.json
└─ vite.config.*        # 构建与本地服务配置
```

---

## 常见问题（FAQ）

**Q1：如何切换回英文？**  
当前默认强制中文显示。若需英文，可在源码中关闭/调整语言强制逻辑并重新构建（后续将评估引入运行时语言开关）。

**Q2：开发环境启动报端口占用？**  
使用 `npm run dev -- --port 5174` 指定新端口，或调整 `vite.config.*` 中的 `server.port`。

**Q3：安装依赖卡顿或失败？**  
- 先切换 `npm` 镜像到 `https://registry.npmmirror.com`
- 触发 `npm cache clean --force` 后重试
- Windows/内网环境可参考上文「Bun（可选）方案」

**Q4：浏览器无法识别键盘或加载布局？**  
请确认键盘固件与 VIA 版本兼容；部分第三方/定制固件需要导入对应 `JSON` 布局文件，或更新到兼容的固件版本。

---

## 已知问题与路线图
- [ ] 还在测试

---

## 贡献指南（PR 欢迎）
1. Fork 本仓库并创建特性分支（`feat/i18n-xxx`、`fix/xxx`）
2. 保持提交信息清晰（`type(scope): message`），建议遵循 Conventional Commits
3. 尽量附带截图或复现步骤，便于代码评审与质量把控
4. 提交 PR 前执行：`npm run build` 与必要的本地自测

> 贡献建议：在 `src/` 内统一维护中文词汇表与上下文注释，减少重复劳动与术语偏差。

---

## 兼容性与环境要求
- **Node.js**：18+（建议 LTS）
- **包管理器**：npm（默认）/ Bun（可选）
- **浏览器**：最新版 Chrome/Edge（需 WebHID 支持的功能请使用桌面端）

---

## 许可证
本项目遵循上游 VIA 的开源许可协议，详情见仓库内 `LICENSE`。上游项目及相关依赖的许可以其各自仓库为准。

---

## 致谢
- 上游项目：VIA / the-via/keyboards
- 社区贡献者与中文用户反馈

> **期待你的 PR**：持续优化中文体验与企业级交付能力，一起把它打磨到「可生产可运维」标准。 
