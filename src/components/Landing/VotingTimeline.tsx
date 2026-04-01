import React from "react";
import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";

export default function VotingTimeline() {
  const data = [
    {
      title: "Registration & Authentication",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-muted-foreground md:text-lg">
             Each voter receives two unique codes: N1 (authentication) and N2 (verification). The commissioner holds a list of valid N1 codes.
          </p>
           <p className="mb-8 text-xs font-normal text-muted-foreground md:text-lg">
              The voter submits N1 to the administrator, who verifies it with the commissioner to confirm voting eligibility.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image src="https://assets.aceternity.com/templates/startup-1.webp" alt="startup template" width={500} height={500} className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />
            <Image src="https://assets.aceternity.com/templates/startup-2.webp" alt="startup template" width={500} height={500} className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />
            <Image src="https://assets.aceternity.com/templates/startup-3.webp" alt="startup template" width={500} height={500} className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />
            <Image src="https://assets.aceternity.com/templates/startup-4.webp" alt="startup template" width={500} height={500} className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />
          </div>
        </div>
      ),
    },
    {
      title: "Voting Flow",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-muted-foreground md:text-lg">
            The voter selects their vote and forms a ballot containing the vote, N2, and random data.
          </p>
          <p className="mb-8 text-xs font-normal text-muted-foreground md:text-lg">
             Using blind signatures, the voter masks the ballot before sending it to the administrator for signing, ensuring the vote remains hidden.
          </p>
           <p className="mb-8 text-xs font-normal text-muted-foreground md:text-lg">
             The signed ballot is then unblinded, encrypted with the counter’s public key, and sent with N1 to the anonymizer, who validates and records the vote.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image src="https://assets.aceternity.com/pro/hero-sections.png" alt="hero template" width={500} height={500} className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />
            <Image src="https://assets.aceternity.com/features-section.png" alt="feature template" width={500} height={500} className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />
            <Image src="https://assets.aceternity.com/pro/bento-grids.png" alt="bento template" width={500} height={500} className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />
            <Image src="https://assets.aceternity.com/cards.png" alt="cards template" width={500} height={500} className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />
          </div>
        </div>
      ),
    },
    {
      title: "Results & Verification",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-muted-foreground md:text-lg">
             After the voting period ends, the counter decrypts all ballots using its private key and verifies their authenticity using the administrator’s public key.
          </p>
          <p className="mb-4 text-xs font-normal text-muted-foreground md:text-lg">
             The commissioner checks the validity of N2 using stored hash fingerprints to prevent fraudulent votes.
          </p>
          <p className="mb-4 text-xs font-normal text-muted-foreground md:text-lg">
             Valid votes are counted, and published results allow voters to verify their vote using their N2 code without revealing their identity.
             </p>        
          <div className="grid grid-cols-2 gap-4">
            <Image src="https://assets.aceternity.com/pro/hero-sections.png" alt="hero template" width={500} height={500} className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />
            <Image src="https://assets.aceternity.com/features-section.png" alt="feature template" width={500} height={500} className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />
            <Image src="https://assets.aceternity.com/pro/bento-grids.png" alt="bento template" width={500} height={500} className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />
            <Image src="https://assets.aceternity.com/cards.png" alt="cards template" width={500} height={500} className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}