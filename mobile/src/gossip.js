import { CATEGORIES } from "./mockData";

export function getCategoryLabel(categoryKey) {
  return CATEGORIES.find((c) => c.key === categoryKey)?.label ?? categoryKey;
}

export function listPostsForCompany({ posts, companyId, category, sort }) {
  const filtered = posts.filter((p) => {
    const visible = (p.status ?? "visible") === "visible";
    return visible && p.companyId === companyId && p.category === category;
  });

  if (sort === "top") {
    return [...filtered].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  }

  // newest (YYYY-MM-DD lexicographic is OK)
  return [...filtered].sort((a, b) => (a.createdDate < b.createdDate ? 1 : -1));
}

export function getPostById(posts, postId) {
  return posts.find((p) => p.id === postId && (p.status ?? "visible") !== "removed");
}


