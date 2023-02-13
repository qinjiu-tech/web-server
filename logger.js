const log4js = require("log4js");
const path = require("path");

function getCommonAppender(pathSeg) {
  return {
    // 定义日志出口
    type: "dateFile",
    filename: path.resolve(__dirname, "logs", pathSeg, `logging.log`),
    maxLogSize: 1024 * 1024, // 配置文件的最大字节数
    keepFileExt: true,
    daysToKeep: 3,
    layout: {
      type: "pattern",
      pattern: "%c [%d{yyyy-MM-dd hh:mm:ss}] [%p]: %m%n",
    },
  };
}

log4js.configure({
  appenders: {
    default: {
      type: "stdout",
    },
    api: getCommonAppender("api"),
    proxy: getCommonAppender("proxy"),
  },
  categories: {
    default: {
      appenders: ["default"],
      level: "all",
    },
    api: {
      appenders: ["api"], // 该分类使用出口api的配置写入日志
      level: "all",
    },
    api: {
      appenders: ["proxy"],
      level: "all",
    },
  },
});

process.on("exit", () => {
  log4js.shutdown();
});

exports.apiLogger = log4js.getLogger("api");
exports.proxyLogger = log4js.getLogger("proxy");
