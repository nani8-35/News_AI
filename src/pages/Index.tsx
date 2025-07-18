import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { NewsGrid } from "@/components/NewsGrid";
import { ChatBot } from "@/components/ChatBot";
import heroImage from "@/assets/news-hero.jpg";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Zap } from "lucide-react";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for dark mode preference
    const darkMode = localStorage.getItem("darkMode") === "true" || 
      (!localStorage.getItem("darkMode") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    setIsDarkMode(darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, []);

  const handleThemeToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onMenuClick={() => setSidebarOpen(true)}
        onSearch={setSearchQuery}
        isDarkMode={isDarkMode}
        onThemeToggle={handleThemeToggle}
      />
      
      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        
        <main className="flex-1 md:ml-0">
          {/* Hero Section */}
          {activeCategory === "all" && searchQuery === "" && (
            <section className="relative overflow-hidden border-b news-gradient">
              <div className="container py-16 md:py-24">
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary/10 text-primary border-primary/20">
                        <Zap className="h-3 w-3 mr-1" />
                        AI-Powered
                      </Badge>
                      <Badge className="breaking-news">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        LIVE
                      </Badge>
                    </div>
                    
                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                      Stay Informed with{" "}
                      <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        AI-Powered
                      </span>{" "}
                      News
                    </h1>
                    
                    <p className="text-xl text-muted-foreground max-w-2xl">
                      Get real-time news aggregation, intelligent summaries, and personalized 
                      recommendations. Chat with our AI assistant for instant insights and analysis.
                    </p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse-subtle" />
                        <span>10k+ articles daily</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse-subtle" />
                        <span>Real-time updates</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse-subtle" />
                        <span>AI-powered insights</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <img
                      src={heroImage}
                      alt="News aggregator interface"
                      className="rounded-lg shadow-2xl animate-fade-in"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-lg" />
                  </div>
                </div>
              </div>
            </section>
          )}
          
          {/* News Content */}
          <div className="container py-8">
            <NewsGrid
              category={activeCategory}
              searchQuery={searchQuery}
            />
          </div>
        </main>
      </div>
      
      <ChatBot />
    </div>
  );
};

export default Index;
