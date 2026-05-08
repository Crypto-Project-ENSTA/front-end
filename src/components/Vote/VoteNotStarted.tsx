"use client";

import Link from "next/link";
import { CalendarClockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VoteNotStarted() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-24 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-muted">
        <CalendarClockIcon className="size-9 text-muted-foreground" />
      </div>

      <div className="space-y-3 max-w-sm">
        <h2 className="text-2xl font-semibold tracking-tight">
          Voting hasn&apos;t started yet
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          The voting session is not open yet. Make sure you are registered
          so you&apos;re ready when it begins.
        </p>
      </div>

      <Button asChild>
        <Link href="/register">Go to Registration</Link>
      </Button>
    </div>
  );
}