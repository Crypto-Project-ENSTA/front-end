"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useVerifyVote } from "@/hooks/useVerifyVote";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VerifyVoteResponse } from "@/types/index";

const formSchema = z.object({
  n2: z
    .string()
    .min(1, "N2 fingerprint is required.")
    .regex(
      /^[A-Z0-9]{12}$/,
      "N2 must be exactly 12 uppercase letters and numbers."
    ),
});

function StatusIcon({ status }: { status: VerifyVoteResponse["status"] }) {
  if (status === "valid")
    return (
      <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-success/15">
        <svg className="size-7 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    );

  if (status === "invalid_signature" || status === "invalid_n2")
    return (
      <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-destructive/15">
        <svg className="size-7 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    );

  return (
    <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-muted">
      <svg className="size-7 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
      </svg>
    </div>
  );
}

function statusLabel(status: VerifyVoteResponse["status"], found: boolean) {
  if (!found) return "Vote Not Found";
  if (status === "valid") return "Vote Counted";
  if (status === "invalid_signature") return "Invalid Signature";
  if (status === "invalid_n2") return "Invalid N2 Fingerprint";
  return "Unknown";
}

export default function VerifyMyVote() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { mutate, data, isPending } = useVerifyVote();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { n2: "" },
  });

  const n2Value = form.watch("n2");

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(
      { n2: values.n2 },
      { onSuccess: () => setDialogOpen(true) }
    );
  }

  return (
    <div className="mx-auto max-w-(--breakpoint-xl) mt-20 px-6 py-24 h-screen">
      <div className="text-center mb-16">
        <strong className="font-medium text-muted-foreground text-sm uppercase tracking-wide">
          Vote Verification
        </strong>
        <h2 className="mx-auto mt-5 max-w-4xl text-balance font-semibold text-4xl leading-[1.2] tracking-tight sm:text-5xl">
          Verify My Vote
        </h2>
        <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
          Enter your N2 fingerprint to confirm whether your vote was received and counted correctly.
        </p>
      </div>

      <div className="mx-auto max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>N2 Fingerprint</CardTitle>
            <CardDescription>
              This is a read-only check — no data will be modified.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="n2"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Your N2 Fingerprint</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        className="bg-background font-mono"
                        placeholder="e.g. A1B2C3D4E5F6"
                      />
                      <FieldDescription>
                        Must be exactly 12 uppercase letters and numbers.
                      </FieldDescription>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
              <Button
                type="submit"
                disabled={isPending || !n2Value.trim()}
                className="w-full"
              >
                {isPending ? <Spinner className="size-4" /> : "Verify Vote"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {data && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="text-center pt-2">
                <StatusIcon status={data.status} />
                <DialogTitle className="text-xl">
                  {statusLabel(data.status, data.found)}
                </DialogTitle>
                <DialogDescription className="mt-2">
                  {data.message}
                </DialogDescription>
              </div>
            </DialogHeader>

            <div className="flex flex-col gap-3 mt-2">
              <div className="flex items-center justify-between rounded-lg border px-4 py-3 text-sm">
                <span className="text-muted-foreground">Status</span>
                <span
                  className={
                    data.status === "valid"
                      ? "font-medium text-success"
                      : data.status != null
                      ? "font-medium text-destructive"
                      : "font-medium text-muted-foreground"
                  }
                >
                  {data.status ?? "not found"}
                </span>
              </div>

              {data.found && data.status === "valid" && data.vote && (
                <div className="flex items-center justify-between rounded-lg border px-4 py-3 text-sm">
                  <span className="text-muted-foreground">Recorded Choice</span>
                  <span className="font-semibold">{data.vote}</span>
                </div>
              )}

              <div className="flex items-center justify-between rounded-lg border px-4 py-3 text-sm">
                <span className="text-muted-foreground">N2 Fingerprint</span>
                <span className="font-mono text-xs truncate max-w-45">{n2Value}</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}