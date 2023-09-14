const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function(app) {
  // may need to modify /api to /api/*
  app.use(
    ["/api", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:5000"
    })
  );
};
