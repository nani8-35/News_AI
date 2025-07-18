import { Home, TrendingUp, Globe, Briefcase, Heart, Zap, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: "all", label: "All News", icon: Home, count: "2.1k" },
  { id: "trending", label: "Trending", icon: TrendingUp, count: "847", trending: true },
  { id: "world", label: "World", icon: Globe, count: "456" },
  { id: "business", label: "Business", icon: Briefcase, count: "234" },
  { id: "technology", label: "Technology", icon: Zap, count: "189" },
  { id: "health", label: "Health", icon: Heart, count: "123" },
];

export const Sidebar = ({ isOpen, onClose, activeCategory, onCategoryChange }: SidebarProps) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-72 transform border-r bg-background transition-transform duration-300 ease-in-out md:relative md:top-0 md:h-[calc(100vh-4rem)] md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Mobile Close Button */}
          <div className="flex items-center justify-between p-4 md:hidden">
            <h2 className="text-lg font-semibold">Categories</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Categories */}
          <nav className="flex-1 space-y-1 p-4">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Categories
            </h3>
            
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              
              return (
                <Button
                  key={category.id}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-11",
                    isActive && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => {
                    onCategoryChange(category.id);
                    onClose();
                  }}
                >
                  <Icon className="h-4 w-4" />
                  <span className="flex-1 text-left">{category.label}</span>
                  
                  <div className="flex items-center gap-2">
                    {category.trending && (
                      <div className="h-2 w-2 rounded-full bg-breaking-news animate-pulse-subtle" />
                    )}
                    <Badge
                      variant="secondary"
                      className="text-xs bg-muted text-muted-foreground"
                    >
                      {category.count}
                    </Badge>
                  </div>
                </Button>
              );
            })}
          </nav>

          {/* Settings */}
          <div className="border-t p-4">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};