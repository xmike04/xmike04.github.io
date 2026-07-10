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

/** Repos that add no signal for visitors (empty or placeholder). */
const EXCLUDED_REPOS = new Set(['AI-Assistant']);

/**
 * Six most recently pushed original repos for github.com/xmike04.
 * Revalidates every 6 hours; throws on network/API failure so callers
 * can render a graceful fallback.
 */
export async function getRecentRepos(): Promise<SlimRepo[]> {
  const res = await fetch('https://api.github.com/users/xmike04/repos?sort=pushed&per_page=10', {
    next: { revalidate: 21600 },
    headers: process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {},
  });

  if (!res.ok) {
    throw new Error(`GitHub API responded with ${res.status}`);
  }

  const repos = (await res.json()) as GitHubRepoResponse[];

  return repos
    .filter((repo) => !repo.fork && !EXCLUDED_REPOS.has(repo.name))
    .slice(0, 6)
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
