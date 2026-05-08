"use client";

import Link from "next/link";
import { VoteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VoteStarted() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-24 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-success/15">
        <VoteIcon className="size-9 text-success" />
      </div>

      <div className="space-y-3 max-w-sm">
        <h2 className="text-2xl font-semibold tracking-tight">
          Voting is now open!
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          The voting session has started. Head over to cast your vote before
          the session closes.
        </p>
      </div>

      <Button asChild>
        <Link href="/vote">Go to Vote</Link>
      </Button>
    </div>
  );
}