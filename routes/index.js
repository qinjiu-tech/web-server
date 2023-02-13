const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");

// 延时中间件
app.use(require("./delayMiddleware"));

// 跨域中间件
app.use(require("./corsMidderware"));

// 静态资源中间件
// 静态资源目录
const staticRoot = path.resolve(__dirname, "../public");
app.use(
  express.static(staticRoot, {
    // 客户端缓存
    setHeaders(res, path) {
      if (!path.endsWith(".html")) {
        res.header("Cache-Control", `max-age=${3600 * 24 * 365 * 100}`);
      }
    },
  })
);

// 解析请求的中间件
// cookie：在req对象中注入cookies属性
app.use(cookieParser());
// application/json ---> raw: json
app.use(express.json());
// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// // application/octet-stream
// app.use(express.raw())
// // text/plain ---> raw: text
// app.use(express.text())

app.use(require("./printMid"));

// api日志中间件
app.use(require("./apiLoggerMid"));

// 权限中间件
app.use(require("./tokenMiddleware"));

// 使用代理
app.use(...require("./proxyMidderware"));

// 基础路由
app.use("/api/admin", require("./api/admin"));

// 学生路由
app.use("/api/student", require("./api/student"));

// 文件路由
app.use("/api/file", require("./api/file"));

// 错误中间件
app.use(require("./errorMiddleware"));

const port = 5008;
app.listen(port, () => {
  console.log(`server listen on ${port}`);
});
