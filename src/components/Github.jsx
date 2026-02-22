import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { staggerContainer, scaleIn, fadeIn } from "../variants";
import { FaGithub, FaStar, FaUsers, FaBook, FaExternalLinkAlt, FaCode } from "react-icons/fa";
import { GoRepoForked, GoRepo, GoGitPullRequest } from "react-icons/go";
import { BsActivity, BsCalendar3 } from "react-icons/bs";

const GITHUB_USERNAME = "kanaee-cloud";

const Github = () => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
        ]);
        const profileData = await profileRes.json();
        const reposData = await reposRes.json();

        setProfile(profileData);
        setRepos(Array.isArray(reposData) ? reposData : []);
      } catch (err) {
        console.error("Failed to fetch GitHub data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-ios-blue/30 border-t-ios-blue rounded-full animate-spin" />
          <p className="text-[13px] text-label-tertiary">Loading GitHub data...</p>
        </div>
      </section>
    );
  }

  if (!profile) {
    return (
      <section className="flex items-center justify-center min-h-[60vh]">
        <p className="text-[14px] text-label-secondary">Failed to load GitHub data.</p>
      </section>
    );
  }

  // Computed stats
  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0);
  const languages = [...new Set(repos.map((r) => r.language).filter(Boolean))];
  const topRepos = [...repos]
    .sort((a, b) => (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count))
    .slice(0, 6);

  // Language distribution
  const langCount = {};
  repos.forEach((r) => {
    if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1;
  });
  const sortedLangs = Object.entries(langCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);
  const maxLangCount = sortedLangs.length > 0 ? sortedLangs[0][1] : 1;

  // Recent repos (last 5 updated)
  const recentRepos = [...repos].slice(0, 5);

  // Account age
  const createdDate = new Date(profile.created_at);
  const accountAge = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24 * 365));

  const stats = [
    { label: "Repositories", value: profile.public_repos, icon: <GoRepo size={18} />, color: "text-ios-blue" },
    { label: "Followers", value: profile.followers, icon: <FaUsers size={18} />, color: "text-ios-purple" },
    { label: "Following", value: profile.following, icon: <FaUsers size={18} />, color: "text-ios-teal" },
    { label: "Total Stars", value: totalStars, icon: <FaStar size={18} />, color: "text-ios-yellow" },
    { label: "Total Forks", value: totalForks, icon: <GoRepoForked size={18} />, color: "text-ios-orange" },
    { label: "Languages", value: languages.length, icon: <FaBook size={18} />, color: "text-ios-green" },
  ];

  // Language color map
  const langColors = {
    JavaScript: "#F7DF1E",
    TypeScript: "#3178C6",
    Python: "#3572A5",
    PHP: "#777BB4",
    HTML: "#E34F26",
    CSS: "#563D7C",
    Java: "#B07219",
    Dart: "#00B4AB",
    Vue: "#42B883",
    Blade: "#F7523F",
    "C#": "#178600",
    Shell: "#89E051",
    Go: "#00ADD8",
    Kotlin: "#A97BFF",
    Swift: "#F05138",
    Ruby: "#CC342D",
    Rust: "#DEA584",
    C: "#555555",
    "C++": "#f34b7d",
  };

  return (
    <section id="github">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <h1 className="text-2xl mb-4 font-bold tracking-tight flex items-center gap-3">
          <div className="p-2 rounded-ios bg-white/10">
            <FaGithub size={22} className="text-white" />
          </div>
          GitHub
        </h1>
        <p className="text-[15px] text-label-secondary leading-relaxed">
          Live statistics from my GitHub profile.
        </p>
        <div className="ios-separator" />
      </motion.div>

      {/* Profile Card */}
      <motion.div
        variants={fadeIn("up", 0.1)}
        initial="hidden"
        animate="show"
        className="ios-card p-5 flex items-center gap-4 mb-8"
      >
        <img
          src={profile.avatar_url}
          alt={profile.login}
          className="w-16 h-16 rounded-full ring-2 ring-white/10"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-[17px] font-semibold text-white">{profile.name || profile.login}</h2>
            <a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-label-tertiary hover:text-ios-blue transition-colors"
            >
              <FaExternalLinkAlt size={11} />
            </a>
          </div>
          <p className="text-[13px] text-label-tertiary">@{profile.login}</p>
          {profile.bio && (
            <p className="text-[13px] text-label-secondary mt-1 line-clamp-2">{profile.bio}</p>
          )}
          <div className="flex items-center gap-1.5 mt-1.5">
            <BsCalendar3 size={10} className="text-label-quaternary" />
            <p className="text-[11px] text-label-quaternary">
              Joined {createdDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })} · {accountAge}+ years on GitHub
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8"
      >
        {stats.map((s, i) => (
          <motion.div key={i} variants={scaleIn(i * 0.05)} className="ios-stat-card text-center">
            <div className={`flex justify-center mb-2 ${s.color}`}>{s.icon}</div>
            <div className="text-xl font-bold text-white">{s.value}</div>
            <div className="text-[11px] text-label-tertiary font-medium uppercase tracking-wider mt-0.5">
              {s.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Contribution Graph */}
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="ios-section-header flex items-center gap-3 mb-4">
          <div className="p-1.5 rounded-lg bg-ios-green/15">
            <BsActivity size={16} className="text-ios-green" />
          </div>
          <span className="text-[15px] font-semibold tracking-tight">Contribution Activity</span>
        </div>
        <div className="ios-card p-4 overflow-hidden">
          <img
            src={`https://ghchart.rshah.org/0A84FF/${GITHUB_USERNAME}`}
            alt="GitHub Contribution Graph"
            className="w-full rounded-lg opacity-90"
          />
        </div>
      </motion.div>

      {/* Language Breakdown */}
      <motion.div
        variants={fadeIn("up", 0.25)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="ios-section-header flex items-center gap-3 mb-4">
          <div className="p-1.5 rounded-lg bg-ios-blue/15">
            <FaCode size={16} className="text-ios-blue" />
          </div>
          <span className="text-[15px] font-semibold tracking-tight">Language Breakdown</span>
        </div>

        {/* Language color bar */}
        <div className="ios-card p-5">
          <div className="flex w-full h-3 rounded-full overflow-hidden mb-5">
            {sortedLangs.map(([lang, count], i) => (
              <div
                key={lang}
                className="h-full transition-all duration-500"
                style={{
                  width: `${(count / repos.filter((r) => r.language).length) * 100}%`,
                  background: langColors[lang] || "#8E8E93",
                  opacity: 0.85,
                }}
                title={`${lang}: ${count} repos`}
              />
            ))}
          </div>

          <div className="space-y-3">
            {sortedLangs.map(([lang, count], i) => {
              const percentage = Math.round((count / repos.filter((r) => r.language).length) * 100);
              return (
                <div key={lang} className="group">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ background: langColors[lang] || "#8E8E93" }}
                      />
                      <span className="text-[13px] font-medium text-white">{lang}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[12px] text-label-tertiary">{count} repos</span>
                      <span className="text-[12px] font-semibold text-label-secondary w-10 text-right">{percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: langColors[lang] || "#8E8E93" }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(count / maxLangCount) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Recently Updated */}
      <motion.div
        variants={fadeIn("up", 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="ios-section-header flex items-center gap-3 mb-4">
          <div className="p-1.5 rounded-lg bg-ios-orange/15">
            <GoGitPullRequest size={16} className="text-ios-orange" />
          </div>
          <span className="text-[15px] font-semibold tracking-tight">Recently Updated</span>
        </div>

        <div className="ios-card divide-y divide-white/[0.04] overflow-hidden">
          {recentRepos.map((repo) => {
            const updatedAt = new Date(repo.updated_at);
            const daysAgo = Math.floor((Date.now() - updatedAt.getTime()) / (1000 * 60 * 60 * 24));
            const timeLabel = daysAgo === 0 ? "today" : daysAgo === 1 ? "yesterday" : `${daysAgo}d ago`;
            return (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors group"
              >
                <GoRepo size={14} className="text-ios-blue flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-[13px] font-medium text-white group-hover:text-ios-blue transition-colors truncate block">
                    {repo.name}
                  </span>
                </div>
                {repo.language && (
                  <span className="flex items-center gap-1.5 text-[11px] text-label-tertiary flex-shrink-0">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: langColors[repo.language] || "#8E8E93" }}
                    />
                    {repo.language}
                  </span>
                )}
                <span className="text-[11px] text-label-quaternary flex-shrink-0">{timeLabel}</span>
              </a>
            );
          })}
        </div>
      </motion.div>

      {/* Top Repositories */}
      <motion.div
        variants={fadeIn("up", 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="ios-section-header flex items-center gap-3 mb-4">
          <div className="p-1.5 rounded-lg bg-ios-purple/15">
            <FaStar size={14} className="text-ios-purple" />
          </div>
          <span className="text-[15px] font-semibold tracking-tight">Top Repositories</span>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-3"
        >
          {topRepos.map((repo, i) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              variants={scaleIn(i * 0.05)}
              className="ios-card p-4 group block"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <GoRepo size={14} className="text-ios-blue flex-shrink-0" />
                  <h4 className="text-[14px] font-semibold text-white truncate group-hover:text-ios-blue transition-colors">
                    {repo.name}
                  </h4>
                </div>
                <FaExternalLinkAlt size={10} className="text-label-quaternary group-hover:text-ios-blue transition-colors flex-shrink-0 mt-1" />
              </div>

              {repo.description && (
                <p className="text-[12px] text-label-secondary leading-relaxed line-clamp-2 mb-3">
                  {repo.description}
                </p>
              )}

              <div className="flex items-center gap-4">
                {repo.language && (
                  <span className="flex items-center gap-1.5 text-[11px] text-label-tertiary">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: langColors[repo.language] || "#8E8E93" }}
                    />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1 text-[11px] text-label-tertiary">
                  <FaStar size={10} className="text-ios-yellow" />
                  {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-label-tertiary">
                  <GoRepoForked size={10} />
                  {repo.forks_count}
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Github;
