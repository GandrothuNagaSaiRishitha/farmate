// Simulates real inference latency (400-900ms) so the frontend's loading states
// behave the way they will once real AI/ML endpoints are wired in.
export function simulateLatency(req, res, next) {
  const delay = 400 + Math.random() * 500;
  setTimeout(next, delay);
}

// Centralized error handler — every route's errors funnel through here so the
// frontend always gets the same { error, message, status } shape.
export function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: true,
    message: err.message || "Something went wrong.",
    status,
  });
}

export function notFoundHandler(req, res) {
  res.status(404).json({ error: true, message: `No route for ${req.method} ${req.originalUrl}`, status: 404 });
}
