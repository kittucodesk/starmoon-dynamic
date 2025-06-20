import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ChevronRight, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Product = {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    features: string[];
    badge?: string;
    ribbon?: string;
    pricing: {
        monthly: string;
        yearly: string;
        currency: string;
        discount?: string;
        original_yearly?: string;
    };
};

export default function ProductCard({ product }: { product: Product }) {
    const router = useRouter();

    return (
        <Card className="h-full group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 dark:hover:border-primary/30 bg-gradient-to-b from-white to-gray-50/50 dark:from-slate-800 dark:to-slate-900/50 relative overflow-hidden dark:border-slate-700">
            {product.ribbon && (
                <div className="absolute -right-12 top-6 z-20 transform rotate-45">
                    <div className="bg-primary dark:bg-blue-600 text-white py-1 px-12 text-sm font-medium shadow-lg">
                        {product.ribbon}
                    </div>
                </div>
            )}
            <CardHeader className="px-2 py-3">
                <div className="overflow-hidden rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 relative">
                    <Image
                        src={product.image}
                        width={300}
                        height={200}
                        alt={product.title}
                        className="mx-auto aspect-video w-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.badge && (
                        <Badge className="absolute top-2 left-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-primary dark:text-blue-400 border-2 border-primary/20 dark:border-blue-400/30 shadow-lg">
                            {product.badge}
                        </Badge>
                    )}
                </div>
            </CardHeader>
            <CardContent className="px-2 py-3">
                <CardTitle className="text-xl font-medium line-clamp-1 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors dark:text-white">{product.title}</CardTitle>
                <div className="flex flex-col items-start gap-2 mt-3">
                    {product.features?.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center">
                            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 dark:bg-primary/20 mr-2">
                                <CheckCircle className="h-3 w-3 text-primary dark:text-blue-400 shrink-0" />
                            </div>
                            <span className="text-sm text-muted-foreground dark:text-gray-300">{feature}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 px-2 py-3 border-t dark:border-slate-700 bg-gradient-to-b from-transparent to-primary/5 dark:to-primary/10">
                <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col">
                        {product.pricing?.original_yearly && (
                            <span className="text-sm text-muted-foreground dark:text-gray-400 line-through">
                                {product.pricing.original_yearly}
                            </span>
                        )}
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 dark:from-blue-400 dark:to-blue-300">
                                {product.pricing?.yearly}
                            </span>
                            {product.pricing?.discount && (
                                <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs">
                                    {product.pricing.discount}
                                </Badge>
                            )}
                        </div>
                    </div>
                    <Button size="sm" className="rounded-full h-10 w-10 bg-primary/10 dark:bg-primary/20 hover:bg-primary text-primary dark:text-blue-400 hover:text-white transition-colors">
                        <ShoppingCart className="w-4 h-4" />
                    </Button>
                </div>
                <Button variant="outline" size="sm" className="w-full hover:bg-primary hover:text-white dark:border-slate-600 dark:text-gray-200 dark:hover:bg-primary dark:hover:text-white transition-colors">
                    View Details
                </Button>
            </CardFooter>
        </Card>
    );
}