module.exports = (err, req, res, next) => {
  console.error("❌ Error:", err);
  const status = err.status || 500;
  res.status(status).json({
    msg: err.message || "Server error",
    ...(process.env.NODE_ENV !== "production" ? { stack: err.stack } : {})
  });
};
