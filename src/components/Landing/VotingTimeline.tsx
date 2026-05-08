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
            Each voter submits their email to register. The system records
            eligible voters and generates two unique codes: <strong>N1</strong> for
            authentication and <strong>N2</strong> for vote verification.
            The commissioner holds the list of valid N1 codes — no vote can be
            cast without one.
          </p>
          <p className="mb-8 text-xs font-normal text-muted-foreground md:text-lg">
            Before voting, the voter submits their N1 code to the administrator,
            who verifies eligibility with the commissioner and grants access
            to the ballot.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/timeline/register.png"
              alt="Registration page"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60"
            />
            <Image
              src="/timeline/auth.png"
              alt="Authentication step"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Voting Flow",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-muted-foreground md:text-lg">
            The voter selects their candidate and enters their <strong>N2 code</strong>.
            The ballot is masked using blind signatures before being sent to the
            administrator for signing — ensuring the vote content stays hidden
            even from the administrator.
          </p>
          <p className="mb-8 text-xs font-normal text-muted-foreground md:text-lg">
            The signed ballot is unblinded, encrypted with the counter&apso;s public
            key, and submitted anonymously through the anonymizer. No single
            service can link a voter&apso;s identity to their decrypted ballot.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/timeline/vote.png"
              alt="Voting form"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60"
            />
            <Image
              src="/timeline/vote-submitted.png"
              alt="Vote submitted confirmation"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Results & Verification",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-muted-foreground md:text-lg">
            After voting closes, the counter decrypts all ballots using its
            private key and verifies authenticity using the administrator&apos;s
            public key. The commissioner validates each N2 fingerprint against
            stored hashes to reject any fraudulent ballots.
          </p>
          <p className="mb-8 text-xs font-normal text-muted-foreground md:text-lg">
            Valid votes are tallied and published. Any voter can confirm their
            vote was counted by submitting their <strong>N2 code</strong> —
            without revealing their identity or choice to anyone else.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/timeline/results.png"
              alt="Results page"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60"
            />
            <Image
              src="/timeline/verify-my-vote.png"
              alt="Verify my vote page"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60"
            />
            <Image
              src="/timeline/valid-vote.png"
              alt="Valid vote confirmation dialog"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60"
            />
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