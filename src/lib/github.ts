import 'server-only';
/**
 * Slim GitHub REST client for the homepage showcase.
 * Server-only: called from the GithubShowcase server component with 6h ISR.
 */

interface GitHubRepoResponse {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
}

export interface SlimRepo {
  id: number;
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  pushedAt: string;
}

/** Explicit editorial shortlist: no empty, private, client, or unfinished repositories. */
const FEATURED_REPOS = ['RAG_OPS', 'SIMLYFE', 'xmike04.github.io'] as const;
const FEATURED_SET = new Set<string>(FEATURED_REPOS);

/**
 * Curated original, public repos for github.com/xmike04.
 * Revalidates metadata every 6 hours; throws on network/API failure so callers
 * can render a graceful fallback.
 */
export async function getRecentRepos(): Promise<SlimRepo[]> {
  const res = await fetch('https://api.github.com/users/xmike04/repos?sort=pushed&per_page=100', {
    next: { revalidate: 21600 },
    headers: process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {},
  });

  if (!res.ok) {
    throw new Error(`GitHub API responded with ${res.status}`);
  }

  const repos = (await res.json()) as GitHubRepoResponse[];

  return repos
    .filter((repo) => !repo.fork && FEATURED_SET.has(repo.name))
    .sort((a, b) => FEATURED_REPOS.indexOf(a.name as typeof FEATURED_REPOS[number]) - FEATURED_REPOS.indexOf(b.name as typeof FEATURED_REPOS[number]))
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      pushedAt: repo.pushed_at,
    }));
}
