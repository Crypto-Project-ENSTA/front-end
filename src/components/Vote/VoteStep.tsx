"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useVotingTheme } from "@/hooks/useTheme";
import { useSubmitVote } from "@/hooks/useSubmitVote";
import { useVoteStore } from "@/store/useVoteStore";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  choice: z.string().min(1, "Please select a candidate."),
  n2: z
    .string()
    .min(1, "N2 is required.")
    .regex(
      /^[A-Z0-9]{12}$/,
      "N2 must be exactly 12 uppercase letters and numbers.",
    ),
});

export default function VoteStep() {
  const { data, isLoading, isError } = useVotingTheme();
  const { mutate, isPending } = useSubmitVote();
  const { n1, next, reset } = useVoteStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { choice: "", n2: "" },
  });

  const selectedChoice = form.watch("choice");

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(
      { n2: values.n2, vote: values.choice },
      {
        onSuccess: () => {
          toast.success("Your vote has been submitted successfully.");
          next();
        },
        onError: (error) => {
          console.error("Submit vote error:", error);
          toast.error("Failed to submit your vote. Please try again.");
        },
      },
    );
  }

  if (isLoading)
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );

  if (isError)
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <p className="text-destructive text-sm">
          Failed to load voting options. Please refresh the page.
        </p>
      </div>
    );

  if (!data)
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <p className="text-muted-foreground text-sm">
          No voting session is currently active.
        </p>
      </div>
    );

  return (
    <div className="w-full max-w-xl mt-10 space-y-8">
      <div className="space-y-1">
        <p className="text-muted-foreground text-sm font-medium uppercase tracking-wide">
          Vote for
        </p>
        <h2 className="text-2xl font-semibold tracking-tight">
          {data.vote_theme}
        </h2>
      </div>

      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="choice"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Select a candidate</FieldLabel>
              <div className="mt-2 grid gap-3">
                {data.choices.map((choice) => (
                  <button
                    key={choice}
                    type="button"
                    onClick={() => field.onChange(choice)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors",
                      selectedChoice === choice
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-background text-foreground hover:bg-muted",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                        selectedChoice === choice
                          ? "border-primary"
                          : "border-muted-foreground",
                      )}
                    >
                      {selectedChoice === choice && (
                        <span className="bg-primary size-2 rounded-full" />
                      )}
                    </span>
                    {choice}
                  </button>
                ))}
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <FieldGroup>
          <Controller
            name="n2"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  N2 Verification Code
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  className="bg-background font-mono"
                  placeholder="Enter your N2 code"
                />
                <p className="text-muted-foreground text-xs mt-1">
                  Your N2 code will be embedded in your ballot. Keep it — you
                  will use it to verify your vote was counted.
                </p>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Button
          type="button"
          variant="ghost"
          className="w-full text-muted-foreground"
          onClick={() => {
            reset();
            form.reset();
          }}
        >
          Clear & Start Over
        </Button>

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Submitting..." : "Submit Vote"}
        </Button>
      </form>
    </div>
  );
}
