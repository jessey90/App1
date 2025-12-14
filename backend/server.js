import http from "node:http";

/**
 * Milestone 1 ONLY:
 * - Infrastructure & skeleton (no business logic)
 * - Health check endpoint for run sanity
 */

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ ok: true, milestone: 1 }));
    return;
  }

  res.writeHead(404, { "content-type": "application/json" });
  res.end(JSON.stringify({ error: "not_found" }));
});

server.listen(PORT, () => {
  // Intentionally minimal logging (no request logging, no identifiers).
  // eslint-disable-next-line no-console
  console.log(`backend listening on http://localhost:${PORT} (GET /health)`);
});


