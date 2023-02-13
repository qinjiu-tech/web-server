/**
 * 代理中间件
 */
const { createProxyMiddleware } = require("http-proxy-middleware");
const { proxyLogger } = require("../logger");

// 彩云天气
const CY_TOKEN = "jw91PTeblBpdpawI";
const caiyunProxy = createProxyMiddleware("/cy-weather", {
  target: `https://api.caiyunapp.com/v2.6/${CY_TOKEN}`,
  logger: proxyLogger,
  changeOrigin: true, // 是否需要改变原始主机头为目标URL
  ws: true, // 是否代理websockets
  pathRewrite: {
    "^/cy-weather": "",
  },
});

// 和风天气
const HF_KEY = "f6299db56d944839a8c8cef041ccc329";
// 天气-api
const hfWeatherProxy = createProxyMiddleware("/hf-weather", {
  target: `https://devapi.qweather.com`,
  logger: proxyLogger,
  pathRewrite: function (path, req) {
    if (Object.keys(req.query).length === 0) {
      path += `?key=${HF_KEY}`;
    } else {
      path += `&key=${HF_KEY}`;
    }
    return path.replace(/^\/hf-weather/, "");
  },
});
// geo-api
const hfGeoProxy = createProxyMiddleware("/hf-geo", {
  target: `https://geoapi.qweather.com`,
  logger: proxyLogger,
  pathRewrite: function (path, req) {
    if (Object.keys(req.query).length === 0) {
      path += `?key=${HF_KEY}`;
    } else {
      path += `&key=${HF_KEY}`;
    }
    return path.replace(/^\/hf-geo/, "");
  },
});

module.exports = [caiyunProxy, hfWeatherProxy, hfGeoProxy];

// module.exports = function(req, res, next) {
//   // 彩云天气实时天气数据
//   // https://api.caiyunapp.com/v2.5/{Token}/{经度, 纬度}/realtime.json
//   // https://api.caiyunapp.com/v2.5/jw91PTeblBpdpawI/121.6544,25.1552/realtime.json
//   // /caiyun
//   // Real-time weather
//   // /caiyun
//   cre

//   next();
// }
