import { Card, CardContent } from '@/components/ui/card'
import { 
  Signature, 
  Users, 
  LockKeyhole, 
  Hash, 
  ShieldCheck 
} from 'lucide-react'


const features = [
    { 
        title: 'Blind Signatures', 
        description: 'The Administrator signs each ballot digitally without seeing its content, ensuring complete voter privacy.', 
        icone: <Signature />
    },
    { 
        title: 'Strict Role Separation', 
        description: 'Four independent entities manage separate stages of the election. No single party can alter votes or trace them back to voters.', 
        icone: <Users />
    },
    { 
        title: 'End-to-End Encryption', 
        description: 'Votes are encrypted with the Counter’s public key before storage, keeping them confidential until official counting.', 
        icone: <LockKeyhole />
    },
    { 
        title: 'Cryptographic Hashing', 
        description: 'Voter verification codes (N2) are stored as secure hashes, making it impossible to reconstruct or forge votes.', 
        icone: <Hash />
    },
    { 
        title: 'Public Verifiability', 
        description: 'After counting, all (N2, vote) pairs are published. Voters can verify their ballot was counted without revealing identities.', 
        icone: <ShieldCheck />
    },
]

export default function Features() {
    return (
        <section className="py-16 md:py-32">
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
                            <CardContent className="space-y-2 py-4">
                                <div className="flex flex-row gap-2 text-primary items-center">
                                    {feature.icone}
                                    <h2 className="text-2xl font-medium text-foreground">
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
                            <CardContent className="space-y-2 py-4">
                                <div className="flex flex-row gap-2 text-primary items-center">
                                    {feature.icone}
                                    <h2 className="text-2xl font-medium text-foreground">
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