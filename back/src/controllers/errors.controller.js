module.exports = (err, req, res) => {
  res
    .status(err?.status || 500)
    .json({ message: err?.message || "Internal server error." })
}
