import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Expert = {
    id: number;
    name: string;
    avatar: string;
    title: string;
    rating: number;
    bio: string;
    badge?: string;
    image: string;
    description: string;
    skills: string[];
    reviews: number;
    rate: string;
};

export default function ExpertCard({ expert }: { expert: Expert }) {
    return (
        <Card className={`group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 relative overflow-hidden bg-gradient-to-b from-white to-gray-50/50 ${expert.badge ? 'transform scale-105' : ''}`}>
            {expert.badge && (
                <div className="absolute -right-4 top-6 bg-gradient-to-r from-primary to-primary/80 text-white py-1 px-10 rotate-45 text-sm shadow-lg">
                    {expert.badge}
                </div>
            )}
            <CardHeader className="text-center pb-4 pt-6">
                <div className="mx-auto mb-4 relative group-hover:scale-105 transition-transform duration-300">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Image
                        src={expert.image}
                        width={120}
                        height={120}
                        alt={expert.name}
                        className="rounded-full object-contain border-4 border-primary/10"
                    />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{expert.name}</CardTitle>
                <CardDescription className="text-sm font-medium text-primary/80">{expert.title}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 min-h-[40px]">{expert.description}</p>
                <div className="flex flex-col gap-2">
                    {expert.skills.slice(0, 3).map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs bg-primary/5 hover:bg-primary/10 transition-colors w-fit">
                            {skill}
                        </Badge>
                    ))}
                    {expert.skills.length > 4 && (
                        <Badge variant="secondary" className="text-xs bg-primary/5">+{expert.skills.length - 4}</Badge>
                    )}
                </div>
                <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
                    {/* <div className="flex items-center gap-1">
                        <div className="flex -space-x-1">
                            {[1, 2, 3, 4, 5].map((_, idx) => (
                                <Star key={idx} className={`h-4 w-4 ${idx < Math.floor(expert.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                            ))}
                        </div>
                        <span className="font-medium ml-2">{expert.rating}</span>
                        <span className="text-xs">({expert.reviews} reviews)</span>
                    </div> */}
                    <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">{expert.rate}</div>
                </div>
                <div className="flex flex-col gap-2 pt-2">
                    <Button variant="outline" className="w-full group-hover:bg-primary/5 transition-colors rounded-full">View Profile</Button>
                    <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 rounded-full">Book Now</Button>
                </div>
            </CardContent>
        </Card>
    );
}