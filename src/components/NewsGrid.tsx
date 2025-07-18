import { useState, useEffect } from "react";
import { NewsCard } from "./NewsCard";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsGridProps {
  category: string;
  searchQuery: string;
  className?: string;
}

// Mock news data
const generateMockNews = (category: string, count: number = 12) => {
  const categories = ["technology", "business", "world", "health", "sports"];
  const sources = ["TechCrunch", "Reuters", "BBC", "CNN", "Forbes", "Bloomberg"];
  const techTitles = [
    "AI Revolution: New Language Model Breaks Performance Records",
    "Quantum Computing Breakthrough Achieved by Tech Giants",
    "Cybersecurity Alert: New Vulnerability Discovered",
    "Blockchain Technology Transforms Supply Chain Management"
  ];
  const businessTitles = [
    "Global Markets Rally on Economic Recovery Signs",
    "Major Tech Merger Creates Industry Giant",
    "Cryptocurrency Regulation Framework Announced",
    "Inflation Data Shows Encouraging Trends"
  ];
  const worldTitles = [
    "International Climate Summit Reaches Key Agreements",
    "Diplomatic Breakthrough in Regional Conflict",
    "Global Health Initiative Launches New Program",
    "Space Exploration Mission Achieves Historic Milestone"
  ];

  const getTitles = (cat: string) => {
    switch (cat) {
      case "technology": return techTitles;
      case "business": return businessTitles;
      case "world": return worldTitles;
      default: return [...techTitles, ...businessTitles, ...worldTitles];
    }
  };

  const titles = getTitles(category);
  
  return Array.from({ length: count }, (_, i) => ({
    id: `${category}-${i}`,
    title: titles[i % titles.length],
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    category: category === "all" ? categories[i % categories.length] : category,
    source: sources[i % sources.length],
    publishedAt: `${Math.floor(Math.random() * 24)}h ago`,
    readTime: Math.floor(Math.random() * 10) + 2,
    views: Math.floor(Math.random() * 10000) + 100,
    image: i % 3 === 0 ? `https://picsum.photos/600/400?random=${i}` : undefined,
    isBreaking: i === 0 && Math.random() > 0.7,
    isBookmarked: Math.random() > 0.8
  }));
};

export const NewsGrid = ({ category, searchQuery, className }: NewsGridProps) => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadNews = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newArticles = generateMockNews(category === "all" ? "mixed" : category);
    setArticles(newArticles);
    setLoading(false);
  };

  const refreshNews = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newArticles = generateMockNews(category === "all" ? "mixed" : category);
    setArticles(newArticles);
    setRefreshing(false);
  };

  useEffect(() => {
    loadNews();
  }, [category]);

  const handleBookmark = (articleId: string) => {
    setArticles(prev =>
      prev.map(article =>
        article.id === articleId
          ? { ...article, isBookmarked: !article.isBookmarked }
          : article
      )
    );
  };

  const handleShare = (articleId: string) => {
    // Simulate share functionality
    console.log("Sharing article:", articleId);
  };

  const filteredArticles = articles.filter(article =>
    searchQuery === "" ||
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className={cn("flex items-center justify-center py-20", className)}>
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading latest news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold capitalize">
            {category === "all" ? "Latest News" : `${category} News`}
          </h2>
          <p className="text-muted-foreground">
            {filteredArticles.length} articles found
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={refreshNews}
          disabled={refreshing}
          className="gap-2"
        >
          <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
          Refresh
        </Button>
      </div>

      {/* News Grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground">
            {searchQuery ? `No articles found for "${searchQuery}"` : "No articles available"}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article, index) => (
            <NewsCard
              key={article.id}
              article={article}
              onBookmark={handleBookmark}
              onShare={handleShare}
              className={cn(
                "animate-slide-up",
                // Stagger animation
                `animation-delay-${index % 6}`
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};