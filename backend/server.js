import http from "node:http";
import { companies, posts, listPostsForCompany } from "./mockData.js";

/**
 * Milestones 1–2:
 * - Milestone 1: health check endpoint for run sanity
 * - Milestone 2: read-only mock endpoints for company gossip browsing
 *
 * No posting, no accounts, no personalization, no moderation logic.
 */

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;

function sendJson(res, statusCode, body) {
  res.writeHead(statusCode, { "content-type": "application/json" });
  res.end(JSON.stringify(body));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url ?? "/", `http://localhost:${PORT}`);

  if (req.method === "GET" && url.pathname === "/health") {
    return sendJson(res, 200, { ok: true, milestone: 2 });
  }

  // Milestone 2 (read-only) endpoints
  if (req.method === "GET" && url.pathname === "/companies") {
    const q = (url.searchParams.get("q") ?? "").trim().toLowerCase();
    const result =
      q.length === 0
        ? companies
        : companies.filter((c) => c.name.toLowerCase().includes(q));
    return sendJson(res, 200, { companies: result });
  }

  // GET /companies/:companyId/posts?category=...&sort=newest|top
  const companyPostsMatch = url.pathname.match(/^\/companies\/([^/]+)\/posts$/);
  if (req.method === "GET" && companyPostsMatch) {
    const companyId = companyPostsMatch[1];
    const category = url.searchParams.get("category");
    const sort = url.searchParams.get("sort") ?? "newest";
    const result = listPostsForCompany({ companyId, category, sort });
    if (result === null) return sendJson(res, 404, { error: "company_not_found" });
    return sendJson(res, 200, { posts: result });
  }

  // GET /posts/:postId
  const postMatch = url.pathname.match(/^\/posts\/([^/]+)$/);
  if (req.method === "GET" && postMatch) {
    const postId = postMatch[1];
    const post = posts.find((p) => p.id === postId);
    if (!post) return sendJson(res, 404, { error: "post_not_found" });
    return sendJson(res, 200, { post });
    return;
  }

  return sendJson(res, 404, { error: "not_found" });
});

server.listen(PORT, () => {
  // Intentionally minimal logging (no request logging, no identifiers).
  // eslint-disable-next-line no-console
  console.log(`backend listening on http://localhost:${PORT} (GET /health)`);
});


