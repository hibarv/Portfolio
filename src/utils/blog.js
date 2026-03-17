// Load all markdown posts at build time via Vite's import.meta.glob.
// Files live in src/posts/*.md
const modules = import.meta.glob("../posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

function slugFromPath(path) {
  // path looks like "../posts/firstblog.md"
  return path.replace(/^.*[\\/]/, "").replace(/\.md$/, "");
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const data = Object.fromEntries(
    match[1].split(/\r?\n/).flatMap((line) => {
      const idx = line.indexOf(":");
      if (idx === -1) return [];
      const key = line.slice(0, idx).trim();
      const value = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
      return [[key, value]];
    })
  );
  return { data, content: match[2] };
}

function parsePost(rawContent, slug) {
  const { data, content } = parseFrontmatter(rawContent);
  return { ...data, slug, content };
}

export function getAllPosts(fields = []) {
  const posts = Object.entries(modules)
    .map(([path, raw]) => {
      const slug = slugFromPath(path);
      const post = parsePost(raw, slug);
      if (fields.length === 0) return post;
      const filtered = {};
      for (const field of fields) {
        if (field in post) filtered[field] = post[field];
      }
      return filtered;
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return posts;
}

export function getPostBySlug(slug, fields = []) {
  const entry = Object.entries(modules).find(
    ([path]) => slugFromPath(path) === slug
  );
  if (!entry) return null;
  const [, raw] = entry;
  const post = parsePost(raw, slug);
  if (fields.length === 0) return post;
  const filtered = {};
  for (const field of fields) {
    if (field in post) filtered[field] = post[field];
  }
  return filtered;
}
