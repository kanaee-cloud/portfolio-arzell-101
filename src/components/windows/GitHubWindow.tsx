import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, ExternalLink, Code2, Users, BookOpen } from 'lucide-react';

const GITHUB_USERNAME = 'kanaee-cloud';

const langColors: Record<string, string> = {
  JavaScript: '#F7DF1E', TypeScript: '#3178C6', Python: '#3572A5',
  PHP: '#777BB4', HTML: '#E34F26', CSS: '#563D7C', Dart: '#00B4AB',
  Go: '#00ADD8', Java: '#B07219', Vue: '#42B883', Blade: '#F7523F',
};

const STAT_META = [
  { key: 'public_repos', label: 'Repos',     color: '#007AFF',  icon: BookOpen },
  { key: 'followers',    label: 'Followers',  color: '#BF5AF2',  icon: Users },
  { key: 'stars',        label: 'Stars',      color: '#FFD60A',  icon: Star },
  { key: 'forks',        label: 'Forks',      color: '#FF9F0A',  icon: GitFork },
  { key: 'langs',        label: 'Languages',  color: '#30D158',  icon: Code2 },
  { key: 'following',    label: 'Following',  color: '#64D2FF',  icon: Users },
];

export const GitHubWindow = () => {
  const [profile, setProfile] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, rRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
        ]);
        setProfile(await pRes.json());
        const r = await rRes.json();
        setRepos(Array.isArray(r) ? r : []);
      } catch {
        // fail silently
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-white/10" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#007AFF] animate-spin" />
          </div>
          <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.4)' }}>Loading GitHub data…</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.4)' }}>Failed to load GitHub data.</p>
      </div>
    );
  }

  const totalStars = repos.reduce((s: number, r: any) => s + (r.stargazers_count || 0), 0);
  const totalForks = repos.reduce((s: number, r: any) => s + (r.forks_count || 0), 0);
  const languages = [...new Set(repos.map((r: any) => r.language).filter(Boolean))];
  const topRepos = [...repos]
    .sort((a, b) => (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count))
    .slice(0, 4);

  const langCount: Record<string, number> = {};
  repos.forEach((r: any) => { if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1; });
  const sortedLangs = Object.entries(langCount).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const maxLangCount = sortedLangs[0]?.[1] || 1;
  const reposWithLang = repos.filter((r: any) => r.language).length;

  const statsValues: Record<string, number> = {
    public_repos: profile.public_repos,
    followers: profile.followers,
    stars: totalStars,
    forks: totalForks,
    langs: languages.length,
    following: profile.following,
  };

  return (
    <div className="overflow-y-auto h-full">
      {/* Profile header */}
      <div
        className="relative px-5 py-5 overflow-hidden flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, rgba(0,122,255,0.1) 0%, rgba(175,82,222,0.08) 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,122,255,0.18) 0%, transparent 70%)', filter: 'blur(30px)' }} />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-4 relative"
        >
          <div className="relative flex-shrink-0">
            <img
              src={profile.avatar_url}
              alt={profile.login}
              className="w-[60px] h-[60px] rounded-2xl object-cover"
              style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.4), 0 0 0 2px rgba(255,255,255,0.1)' }}
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#14141e] flex items-center justify-center"
              style={{ background: '#30D158' }} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h2 className="text-[16px] font-bold text-white">{profile.name || profile.login}</h2>
              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded-lg transition-all hover:bg-white/10"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                <ExternalLink size={11} />
              </a>
            </div>
            <p className="text-[11px] mb-1" style={{ color: '#007AFF' }}>@{profile.login}</p>
            {profile.bio && (
              <p className="text-[11px] line-clamp-2 leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {profile.bio}
              </p>
            )}
          </div>
        </motion.div>
      </div>

      <div className="p-4 space-y-5">
        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2">
          {STAT_META.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="rounded-xl p-3 text-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${s.color}10 0%, ${s.color}06 100%)`,
                  border: `1px solid ${s.color}1e`,
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1px]"
                  style={{ background: `linear-gradient(90deg, transparent, ${s.color}50, transparent)` }} />
                <Icon size={12} className="mx-auto mb-1" style={{ color: `${s.color}80` }} />
                <div className="text-[18px] font-bold tabular-nums" style={{ color: s.color }}>
                  {statsValues[s.key]}
                </div>
                <div className="text-[9px] uppercase tracking-widest font-medium mt-0.5"
                  style={{ color: 'rgba(255,255,255,0.3)' }}>
                  {s.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Contribution Graph */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
            <span className="text-[10px] uppercase tracking-widest font-medium" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Contributions
            </span>
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
          </div>
          <div
            className="rounded-xl overflow-hidden p-3"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <img
              src={`https://ghchart.rshah.org/007AFF/${GITHUB_USERNAME}`}
              alt="GitHub Contributions"
              className="w-full rounded opacity-75"
            />
          </div>
        </div>

        {/* Language breakdown */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
            <span className="text-[10px] uppercase tracking-widest font-medium" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Languages
            </span>
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
          </div>
          <div
            className="p-4 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            {/* Color bar */}
            <div className="flex w-full h-2.5 rounded-full overflow-hidden mb-3">
              {sortedLangs.map(([lang, count]) => (
                <motion.div
                  key={lang}
                  initial={{ width: 0 }}
                  animate={{ width: `${(count / reposWithLang) * 100}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{ background: langColors[lang] || '#8E8E93' }}
                />
              ))}
            </div>
            <div className="space-y-2">
              {sortedLangs.map(([lang, count], i) => {
                const pct = Math.round((count / reposWithLang) * 100);
                const color = langColors[lang] || '#8E8E93';
                return (
                  <div key={lang} className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                    <span className="text-[12px] font-medium text-white flex-1">{lang}</span>
                    <div className="w-24 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(count / maxLangCount) * 100}%` }}
                        transition={{ duration: 0.7, delay: i * 0.06 }}
                      />
                    </div>
                    <span className="text-[10px] w-7 text-right" style={{ color: 'rgba(255,255,255,0.35)' }}>{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Repos */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
            <span className="text-[10px] uppercase tracking-widest font-medium" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Top Repositories
            </span>
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {topRepos.map((repo: any, i) => {
              const color = langColors[repo.language] || '#8E8E93';
              return (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                  whileHover={{ y: -2, scale: 1.01 }}
                  className="p-3 rounded-xl block relative overflow-hidden group"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
                  <h4 className="text-[12px] font-semibold text-white truncate mb-1 group-hover:text-[#007AFF] transition-colors">
                    {repo.name}
                  </h4>
                  {repo.description && (
                    <p className="text-[10px] line-clamp-2 mb-2" style={{ color: 'rgba(255,255,255,0.38)' }}>
                      {repo.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2.5 text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-0.5"><Star size={9} /> {repo.stargazers_count}</span>
                    <span className="flex items-center gap-0.5"><GitFork size={9} /> {repo.forks_count}</span>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
