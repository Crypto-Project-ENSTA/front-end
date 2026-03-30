import { Card, CardContent } from '@/components/ui/card'
import { MdOutlineSecurity } from "react-icons/md";


const features = [
    { title: 'title-1', description: 'description-1', icone: <MdOutlineSecurity />},
    { title: 'title-2', description: 'description-2', icone: <MdOutlineSecurity />},
    { title: 'title-3', description: 'description-3', icone: <MdOutlineSecurity />},
    { title: 'title-4', description: 'description-4', icone: <MdOutlineSecurity />},
    { title: 'title-5', description: 'description-5', icone: <MdOutlineSecurity />},
]

export default function Features() {
    return (
        <section className="bg-muted/50 dark:bg-background py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">The foundation for Transparancy and security</h2>
                    <p className="text-muted-foreground text-lg">
                        Our e-voting system is built to ensuring that every vote is cast with confidence and integrity. With end-to-end encryption, we provide a secure and transparent voting experience for all participants.
                    </p>
                </div>
                <div className="relative z-10 grid grid-cols-6 gap-3 pt-5">

                    {/* Row 1: 3 cards — 2 + 2 + 2 */}
                    {features.slice(0, 3).map((feature, i) => (
                        <Card key={i} className="col-span-full overflow-hidden sm:col-span-3 lg:col-span-2">
                            <CardContent className="pt-6 space-y-2">
                                <div className="flex flex-row gap-2 text-primary">
                                    {feature.icone}
                                    <h2 className="text-lg font-medium text-foreground">
                                        {feature.title}
                                    </h2>
                                </div>
                                <p className="text-muted-foreground">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Row 2: 2 cards — 3 + 3 */}
                    {features.slice(3).map((feature, i) => (
                        <Card key={i} className="col-span-full overflow-hidden lg:col-span-3">
                            <CardContent className="pt-6 space-y-2">
                                <div className="flex flex-row gap-2 text-primary">
                                    {feature.icone}
                                    <h2 className="text-lg font-medium text-foreground">
                                        {feature.title}
                                    </h2>
                                </div>
                                <p className="text-muted-foreground">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}

                </div>
            </div>
        </section>
    )
}