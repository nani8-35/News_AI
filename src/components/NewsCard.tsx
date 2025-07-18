import { Clock, Eye, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  article: {
    id: string;
    title: string;
    summary: string;
    category: string;
    source: string;
    publishedAt: string;
    readTime: number;
    views: number;
    image?: string;
    isBreaking?: boolean;
    isBookmarked?: boolean;
  };
  onBookmark: (id: string) => void;
  onShare: (id: string) => void;
  className?: string;
}

const getCategoryStyles = (category: string) => {
  switch (category.toLowerCase()) {
    case "technology":
      return "category-tech";
    case "business":
      return "category-business";
    case "sports":
      return "category-sports";
    case "health":
      return "category-health";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

export const NewsCard = ({ article, onBookmark, onShare, className }: NewsCardProps) => {
  return (
    <Card className={cn("group overflow-hidden card-shadow hover:elevated-shadow transition-all duration-300 hover:-translate-y-1", className)}>
      <CardContent className="p-0">
        {article.image && (
          <div className="relative aspect-video overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {article.isBreaking && (
              <Badge className="absolute top-3 left-3 breaking-news animate-pulse-subtle">
                BREAKING
              </Badge>
            )}
          </div>
        )}
        
        <div className="p-6">
          <div className="mb-3 flex items-center gap-2">
            <Badge className={cn("text-xs border", getCategoryStyles(article.category))}>
              {article.category}
            </Badge>
            <span className="text-sm text-muted-foreground">{article.source}</span>
          </div>
          
          <h3 className="mb-3 text-xl font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          
          <p className="mb-4 text-muted-foreground line-clamp-3">
            {article.summary}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{article.readTime} min read</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{article.views.toLocaleString()}</span>
              </div>
              
              <span>{article.publishedAt}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onBookmark(article.id)}
                className={cn(
                  "h-8 w-8 p-0",
                  article.isBookmarked && "text-primary"
                )}
              >
                <Bookmark className={cn("h-4 w-4", article.isBookmarked && "fill-current")} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onShare(article.id)}
                className="h-8 w-8 p-0"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};