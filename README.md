本项目是 VIA 的汉化版本，强制中文显示，适配国内用户使用习惯。由chatgpt汉化，只是一个半成品，只汉化了主要部分，仍有许多bug和需要优化的地方，如果你继续完善了汉化欢迎pull

使用方法
1. 克隆项目
git clone https://github.com/Zipdata1/via-cn.git
cd via-cn

2. 安装依赖
   建议使用 Node.js 18+ 和 npm。
   执行以下命令安装依赖：
   npm install

3. 开发模式运行
  如果需要调试或开发，可使用：
  npm run dev
  默认启动地址：http://localhost:5173

4. 打包生产版本
  npm run build
  打包完成后，生成的文件位于：
  dist/

5. 启动生产版本预览
   npm run start
   启动后访问：http://localhost:8080
