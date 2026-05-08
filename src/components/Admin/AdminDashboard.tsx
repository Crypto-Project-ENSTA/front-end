"use client";

import { useVotingStatus } from "@/hooks/useVoteStatus";
import { Spinner } from "@/components/ui/spinner";
import VoteControls from "@/components/Admin/VoteControls";
import ThemeEditor from "@/components/Admin/ConfigEditor";
import AdminResults from "@/components/Admin/AdminResults";

export default function AdminDashboard() {
  const { data: status, isLoading, isError } = useVotingStatus();

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );

  if (isError || !status)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-destructive text-sm">Failed to load voting status.</p>
      </div>
    );

  return (
    <div className="mx-auto max-w-6xl mt-20 px-6 py-24 space-y-12 min-h-screen w-full">
      {/* Header */}
      <div>
        <strong className="font-medium text-muted-foreground text-sm uppercase tracking-wide">
          Admin Panel
        </strong>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">
          Dashboard
        </h1>
        <p className="mt-2 text-muted-foreground">
          Current status:{" "}
          <span
            className={
              status.voting_status === "vote_started"
                ? "text-success font-medium"
                : status.voting_status === "vote_ended"
                ? "text-destructive font-medium"
                : "text-muted-foreground font-medium"
            }
          >
            {status.voting_status === "register"
              ? "Registration Open"
              : status.voting_status === "vote_started"
              ? "Voting In Progress"
              : "Voting Ended"}
          </span>
        </p>
      </div>

      {/* Vote controls */}
      <VoteControls status={status.voting_status} />

      {/* Theme editor */}
      <ThemeEditor />

      {/* Results — only when vote ended */}
      {status.voting_status === "vote_ended" && <AdminResults />}
    </div>
  );
}