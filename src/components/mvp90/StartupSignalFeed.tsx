"use client";

import React, { useEffect, useState } from "react";
import StartupProfileView from "./StartupProfileView";

interface StartupSignal {
  id: number;
  name: string;
  pitch: string;
  noveltyScore: number;
  cloneabilityScore: number;
  indiaMarketFit: number;
  estimatedBuildCost: number;
  industry: string;
  region: string;
  source: string;
  team: string;
  founderBackground: string;
  tractionSignals: {
    githubStars: number;
    twitterFollowers: number;
    substackPosts: number;
  };
  actionTag: "Build" | "Scout" | "Store";
  lastUpdated: string;
}

const dummySignals: StartupSignal[] = [
  {
    id: 1,
    name: "NeuroLink AI",
    pitch: "Brain-computer interface for productivity enhancement",
    noveltyScore: 9,
    cloneabilityScore: 2,
    indiaMarketFit: 6,
    estimatedBuildCost: 250000,
    industry: "AI/ML",
    region: "North America",
    source: "GitHub",
    team: "Ex-Neuralink engineers",
    founderBackground: "PhD in Neuroscience, Stanford",
    tractionSignals: { githubStars: 1250, twitterFollowers: 5600, substackPosts: 12 },
    actionTag: "Build",
    lastUpdated: "2 min ago"
  },
  {
    id: 2,
    name: "CropSense",
    pitch: "IoT sensors for precision agriculture in emerging markets",
    noveltyScore: 7,
    cloneabilityScore: 6,
    indiaMarketFit: 9,
    estimatedBuildCost: 75000,
    industry: "AgTech",
    region: "Asia",
    source: "ProductHunt",
    team: "IIT Delhi alumni",
    founderBackground: "Agricultural Engineering, 10+ years farming",
    tractionSignals: { githubStars: 340, twitterFollowers: 2100, substackPosts: 8 },
    actionTag: "Scout",
    lastUpdated: "5 min ago"
  },
  {
    id: 3,
    name: "QuantumSecure",
    pitch: "Quantum-resistant encryption for financial institutions",
    noveltyScore: 8,
    cloneabilityScore: 1,
    indiaMarketFit: 7,
    estimatedBuildCost: 500000,
    industry: "FinTech",
    region: "Europe",
    source: "Reddit",
    team: "Ex-IBM Quantum team",
    founderBackground: "PhD Quantum Computing, MIT",
    tractionSignals: { githubStars: 890, twitterFollowers: 3400, substackPosts: 15 },
    actionTag: "Store",
    lastUpdated: "8 min ago"
  },
  {
    id: 4,
    name: "MediChain",
    pitch: "Blockchain-based medical records for rural healthcare",
    noveltyScore: 6,
    cloneabilityScore: 7,
    indiaMarketFit: 8,
    estimatedBuildCost: 120000,
    industry: "HealthTech",
    region: "Asia",
    source: "Twitter",
    team: "Healthcare + Blockchain experts",
    founderBackground: "MD + Computer Science, AIIMS",
    tractionSignals: { githubStars: 567, twitterFollowers: 1800, substackPosts: 6 },
    actionTag: "Build",
    lastUpdated: "12 min ago"
  },
  {
    id: 5,
    name: "EcoLogistics",
    pitch: "Carbon-neutral last-mile delivery optimization",
    noveltyScore: 5,
    cloneabilityScore: 8,
    indiaMarketFit: 7,
    estimatedBuildCost: 90000,
    industry: "Logistics",
    region: "Global",
    source: "GitHub",
    team: "Ex-Amazon logistics team",
    founderBackground: "Operations Research, Wharton MBA",
    tractionSignals: { githubStars: 234, twitterFollowers: 950, substackPosts: 4 },
    actionTag: "Scout",
    lastUpdated: "15 min ago"
  }
];

interface StartupSignalFeedProps {
  userRole: string;
}

const StartupSignalFeed: React.FC<StartupSignalFeedProps> = ({ userRole }) => {
  const [signals, setSignals] = useState<StartupSignal[]>(dummySignals);
  const [selectedSignal, setSelectedSignal] = useState<StartupSignal | null>(null);
  const [filters, setFilters] = useState({
    industry: "",
    region: "",
    source: "",
    minNoveltyScore: 0,
    actionTag: ""
  });
  const [sortBy, setSortBy] = useState<"noveltyScore" | "indiaMarketFit" | "estimatedBuildCost">("noveltyScore");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Simulate data refresh every 30 seconds
    const interval = setInterval(() => {
      setIsRefreshing(true);
      setTimeout(() => {
        // Simulate minor updates to signals
        setSignals(prev => prev.map(signal => ({
          ...signal,
          lastUpdated: `${Math.floor(Math.random() * 20) + 1} min ago`
        })));
        setIsRefreshing(false);
      }, 1000);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const filteredAndSortedSignals = signals
    .filter(signal => 
      (!filters.industry || signal.industry === filters.industry) &&
      (!filters.region || signal.region === filters.region) &&
      (!filters.source || signal.source === filters.source) &&
      (!filters.actionTag || signal.actionTag === filters.actionTag) &&
      (signal.noveltyScore >= filters.minNoveltyScore)
    )
    .sort((a, b) => b[sortBy] - a[sortBy]);

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-400";
    if (score >= 6) return "text-yellow-400";
    return "text-red-400";
  };

  const getActionTagColor = (tag: string) => {
    switch (tag) {
      case "Build": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Scout": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Store": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Startup Signal Feed</h2>
          <p className="text-muted-foreground">Live intelligence on emerging startups</p>
        </div>
        <div className="flex items-center space-x-2">
          {isRefreshing && (
            <div className="text-sm text-muted-foreground">Refreshing...</div>
          )}
          <div className="text-sm text-muted-foreground">
            {filteredAndSortedSignals.length} signals
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Industry</label>
            <select
              value={filters.industry}
              onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
              className="w-full p-2 rounded border border-border bg-input text-foreground text-sm"
            >
              <option value="">All Industries</option>
              <option value="AI/ML">AI/ML</option>
              <option value="AgTech">AgTech</option>
              <option value="FinTech">FinTech</option>
              <option value="HealthTech">HealthTech</option>
              <option value="Logistics">Logistics</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Region</label>
            <select
              value={filters.region}
              onChange={(e) => setFilters({ ...filters, region: e.target.value })}
              className="w-full p-2 rounded border border-border bg-input text-foreground text-sm"
            >
              <option value="">All Regions</option>
              <option value="North America">North America</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Global">Global</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Source</label>
            <select
              value={filters.source}
              onChange={(e) => setFilters({ ...filters, source: e.target.value })}
              className="w-full p-2 rounded border border-border bg-input text-foreground text-sm"
            >
              <option value="">All Sources</option>
              <option value="GitHub">GitHub</option>
              <option value="ProductHunt">ProductHunt</option>
              <option value="Reddit">Reddit</option>
              <option value="Twitter">Twitter</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Action Tag</label>
            <select
              value={filters.actionTag}
              onChange={(e) => setFilters({ ...filters, actionTag: e.target.value })}
              className="w-full p-2 rounded border border-border bg-input text-foreground text-sm"
            >
              <option value="">All Actions</option>
              <option value="Build">Build</option>
              <option value="Scout">Scout</option>
              <option value="Store">Store</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Min Novelty</label>
            <input
              type="range"
              min="0"
              max="10"
              value={filters.minNoveltyScore}
              onChange={(e) => setFilters({ ...filters, minNoveltyScore: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="text-xs text-muted-foreground mt-1">{filters.minNoveltyScore}/10</div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full p-2 rounded border border-border bg-input text-foreground text-sm"
            >
              <option value="noveltyScore">Novelty Score</option>
              <option value="indiaMarketFit">India Market Fit</option>
              <option value="estimatedBuildCost">Build Cost</option>
            </select>
          </div>
        </div>
      </div>

      {/* Signal List */}
      <div className="space-y-3">
        {filteredAndSortedSignals.map((signal) => (
          <div
            key={signal.id}
            className="bg-card border border-border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors"
            onClick={() => setSelectedSignal(signal)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-semibold text-lg">{signal.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs border ${getActionTagColor(signal.actionTag)}`}>
                    {signal.actionTag}
                  </span>
                  <span className="text-xs text-muted-foreground">{signal.source}</span>
                </div>
                <p className="text-muted-foreground mb-2">{signal.pitch}</p>
                <div className="text-sm text-muted-foreground">
                  Team: {signal.team} • {signal.lastUpdated}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">Novelty</div>
                <div className={`font-semibold ${getScoreColor(signal.noveltyScore)}`}>
                  {signal.noveltyScore}/10
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">Cloneability</div>
                <div className={`font-semibold ${getScoreColor(10 - signal.cloneabilityScore)}`}>
                  {signal.cloneabilityScore}/10
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">India Fit</div>
                <div className={`font-semibold ${getScoreColor(signal.indiaMarketFit)}`}>
                  {signal.indiaMarketFit}/10
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">Build Cost</div>
                <div className="font-semibold">
                  ${(signal.estimatedBuildCost / 1000).toFixed(0)}K
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedSignals.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">No signals match your current filters</div>
          <button
            onClick={() => setFilters({ industry: "", region: "", source: "", minNoveltyScore: 0, actionTag: "" })}
            className="mt-2 text-primary hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Startup Profile Modal */}
      {selectedSignal && (
        <StartupProfileView 
          startup={selectedSignal} 
          onClose={() => setSelectedSignal(null)}
          userRole={userRole}
        />
      )}
    </div>
  );
};

export default StartupSignalFeed;
