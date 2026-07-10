import { ArrowUpRight, Github, Star } from 'lucide-react';
import { getRecentRepos, type SlimRepo } from '@/lib/github';
import { cn } from '@/lib/utils';

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  Python: 'bg-yellow-500',
  JavaScript: 'bg-amber-500',
};

function languageDotClass(language: string): string {
  return LANGUAGE_COLORS[language] ?? 'bg-gray-400';
}

function formatPushed(iso: string): string {
  const date = new Date(iso);
  return `updated ${date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
}

function SectionHeader() {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">auto-updates every 6h</p>
      <h2 className="flex items-center justify-center gap-3 font-headline text-3xl font-bold md:text-5xl">
        <Github className="h-7 w-7 md:h-9 md:w-9" aria-hidden="true" />
        Live from GitHub
      </h2>
    </div>
  );
}

function RepoCard({ repo }: { repo: SlimRepo }) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${repo.name} on GitHub (opens in new tab)`}
      className="group glass flex h-full flex-col gap-2.5 rounded-xl p-5 transition-colors hover:border-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="break-all font-mono text-sm font-semibold text-foreground/90 group-hover:text-primary">
          {repo.name}
        </h3>
        <ArrowUpRight
          className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
          aria-hidden="true"
        />
      </div>
      <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{repo.description ?? '—'}</p>
      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 font-mono text-xs text-muted-foreground">
        {repo.language ? (
          <span className="flex items-center gap-1.5">
            <span className={cn('h-2.5 w-2.5 rounded-full', languageDotClass(repo.language))} aria-hidden="true" />
            {repo.language}
          </span>
        ) : null}
        {repo.stars > 0 ? (
          <span className="flex items-center gap-1" aria-label={`${repo.stars} stars`}>
            <Star className="h-3 w-3" aria-hidden="true" />
            {repo.stars}
          </span>
        ) : null}
        <span>{formatPushed(repo.pushedAt)}</span>
      </div>
    </a>
  );
}

function FallbackPanel() {
  return (
    <div className="glass mx-auto max-w-xl rounded-xl p-8 text-center">
      <p className="text-sm text-muted-foreground">
        See the latest repositories, activity, and code directly on GitHub.
      </p>
      <a
        href="https://github.com/xmike04"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1.5 font-mono text-sm text-primary transition-colors hover:text-primary/80"
      >
        github.com/xmike04
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </div>
  );
}

export default async function GithubShowcase() {
  let repos: SlimRepo[] = [];
  try {
    repos = await getRecentRepos();
  } catch {
    // API/network failure — fall through to the fallback panel.
  }

  return (
    <section id="github" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <SectionHeader />
        {repos.length > 0 ? (
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        ) : (
          <FallbackPanel />
        )}
      </div>
    </section>
  );
}
