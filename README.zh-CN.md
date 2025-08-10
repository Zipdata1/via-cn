# VIA Web 应用（usevia.app）— 你键盘的好帮手

VIA 是一个开源的 **Web** 界面，用于配置你的 **QMK** 键盘。无需重新编译固件，就可以随时自定义按键映射、创建宏、调整 RGB（若键盘支持）。这让个性化变得更简单、更易用。

## 让 VIA 支持你的键盘（面向厂商 / 开发者）
1. 将你的键盘源码合入 **QMK Firmware** 主分支。  
2. 将你的 `keymaps/via` 键位图合入 **VIA 的 QMK Userspace** 主分支。  
3. 为你的键盘编写 **JSON 定义文件** 并向 **VIA Keyboards** 仓库提交 PR。  
请严格遵循 **Specification** 规范文档，以便顺利审核与合并。

## 本地开发
- `npm run start` / `npm run dev`：开发模式启动（Vite 会打印本地地址，如 `http://localhost:5173`）  
- `npm run build`：构建静态站点到 `build/` 目录  
- `npm run test`：运行测试（可加 `--watch` 进入交互模式）

> 本项目使用 BrowserStack 进行测试。

## 离线客户端
社区维护了桌面封装（electron wrapper），与官方无隶属关系，官方不提供支持。

## 反馈问题
如遇问题，请在本仓库 **Issues** 区提报。提之前请先搜索是否已有相同问题。

## 许可证
本项目使用 GPL-3.0 许可。
