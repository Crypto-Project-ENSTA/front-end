'use client'

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
    icon: Signature,
  },
  {
    title: 'Strict Role Separation',
    description: 'Four independent entities manage separate stages of the election. No single party can alter votes or trace them back to voters.',
    icon: Users,
  },
  {
    title: 'End-to-End Encryption',
    description: 'Votes are encrypted with the Counter’s public key before storage, keeping them confidential until official counting.',
    icon: LockKeyhole,
  },
  {
    title: 'Cryptographic Hashing',
    description: 'Voter verification codes (N2) are stored as secure hashes, making it impossible to reconstruct or forge votes.',
    icon: Hash,
  },
  {
    title: 'Public Verifiability',
    description: 'After counting, all (N2, vote) pairs are published. Voters can verify their ballot was counted without revealing identities.',
    icon: ShieldCheck,
  },
]

export default function Features() {
  return (
    <section className="bg-muted/50 dark:bg-background py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl space-y-6 text-center md:space-y-12">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            The foundation for Transparency and security
          </h2>
          <p className="text-muted-foreground text-lg">
            Our e-voting system is built to ensure every vote is cast with confidence and integrity.
          </p>
        </div>

        {/* 3 cards perfectly horizontal on desktop - smaller & compact */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card 
                key={index} 
                className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all rounded-3xl overflow-hidden"
              >
                <CardContent className="p-5">   {/* less padding */}
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-2xl mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-muted-foreground text-[15px] leading-tight">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}