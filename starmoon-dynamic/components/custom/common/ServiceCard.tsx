import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'
// import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface Service {
    id: number
    title: string
    description: string
    image: string
    price: string
    features: string[]
    icon: string
}

const ServiceCard = ({ service }: { service: Service }): React.JSX.Element => {
    const router = useRouter();
    
    return (
        <Card className="group relative overflow-hidden border-2 hover:border-primary/20 dark:hover:border-primary/30 transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-primary/10 bg-gradient-to-b from-card to-background dark:from-slate-800/95 dark:to-slate-900 dark:border-slate-700/50 dark:backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-primary/5 dark:to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent dark:from-slate-900/95 dark:via-slate-900/50 dark:to-transparent z-10" />
                <Image
                    src={service.image || '/placeholder.svg'}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300 dark:brightness-90 dark:contrast-110"
                />
            </div>
            <div className="relative z-20 p-6 bg-gradient-to-b from-background/50 to-background dark:from-slate-800/50 dark:to-slate-900/95 dark:backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary dark:group-hover:text-primary/90 transition-colors dark:text-gray-100 dark:group-hover:translate-x-1 dark:group-hover:transition-transform">
                    {service.title}
                </h3>
                <p className="text-muted-foreground dark:text-gray-300/90 mb-4 line-clamp-2 dark:group-hover:text-gray-200 transition-colors">
                    {service.description}
                </p>
                <div className="space-y-3">
                    <div className="flex flex-col gap-2">
                        {service.features.slice(0, 3).map((feature, idx) => (
                            <Badge
                                key={idx}
                                variant="outline"
                                className="border-primary/10 dark:border-primary/20 bg-primary/5 dark:bg-primary/10 text-primary dark:text-primary/90 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors w-fit dark:border-slate-600/50 dark:group-hover:border-primary/30 dark:group-hover:bg-primary/15"
                            >
                                {feature}
                            </Badge>
                        ))}
                    </div>
                    <div className="flex items-center justify-between pt-2">
                        <Button
                            variant="ghost"
                            className="text-primary dark:text-primary/90 text-base p-0 h-auto font-medium hover:text-primary dark:hover:text-primary hover:bg-transparent dark:hover:bg-transparent group/btn dark:group-hover:text-primary/100"
                        >
                            {service.price}
                        </Button>
                        <Button
                            onClick={()=> router.push(`/service/${service.id}`)}
                            size="sm"
                            className="bg-primary/90 hover:bg-primary dark:bg-primary/80 dark:hover:bg-primary shadow-lg shadow-primary/20 dark:shadow-primary/30 transition-all duration-300 dark:group-hover:shadow-primary/40 dark:group-hover:scale-105"
                        >
                            Get Started
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default ServiceCard
