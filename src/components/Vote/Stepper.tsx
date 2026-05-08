"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import {
  KeyRoundIcon,
  SendIcon,
  CheckIcon,
  LoaderCircleIcon,
  ThumbsUpIcon,
} from "lucide-react";
import { useVoteStore } from "@/store/useVoteStore";
import { useVotingStatus } from "@/hooks/useVoteStatus";
import { Spinner } from "@/components/ui/spinner";

import AuthStep from "@/components/Vote/AuthStep";
import VoteStep from "@/components/Vote/VoteStep";
import { VoteNotStarted } from "@/components/Vote/VoteNotStarted";
import { VoteEnded } from "@/components/Vote/VoteEnded";
import { VoteSubmitted } from "@/components/Vote/VoteSubmitted";

const steps = [
  { title: "Authentication", icon: <KeyRoundIcon className="size-4" /> },
  { title: "Submit Vote", icon: <SendIcon className="size-4" /> },
  { title: "Submitted", icon: <ThumbsUpIcon className="size-4" /> },
];

const stepComponents = [AuthStep, VoteStep, VoteSubmitted];

export function VoteStepper() {
  const { currentStep, goTo, n1 } = useVoteStore();
  const { data: status, isLoading, isError } = useVotingStatus();

  const isLastStep = currentStep === steps.length - 1;
  const stepperValue = currentStep + 1;

  function handleStepChange(val: number) {
    const targetStep = val - 1;
    if (targetStep < currentStep && n1) return;
    goTo(targetStep);
  }

  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (isError || !status) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <p className="text-destructive text-sm">
          Failed to load voting status. Please refresh the page.
        </p>
      </div>
    );
  }

  if (status.voting_status === "register") {
    return <VoteNotStarted />;
  }

  if (status.voting_status === "vote_ended") {
    return <VoteEnded />;
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 lg:px-12">
      <Stepper
        value={stepperValue}
        onValueChange={handleStepChange}
        indicators={{
          completed: <CheckIcon className="size-3.5" />,
          loading: <LoaderCircleIcon className="size-3.5 animate-spin" />,
        }}
        className="w-full space-y-8"
      >
        <StepperNav className="gap-3">
          {steps.map((step, index) => (
            <StepperItem
              key={index}
              step={index + 1}
              completed={isLastStep}
              className={cn(
                "relative flex-1",
                index === 0
                  ? "items-start"
                  : index === steps.length - 1
                    ? "items-end"
                    : "items-center",
              )}
            >
              <StepperTrigger
                asChild
                className={cn(
                  "flex grow flex-col justify-center gap-2.5",
                  index === 0
                    ? "items-start"
                    : index === steps.length - 1
                      ? "items-end"
                      : "items-center",
                )}
              >
                <StepperIndicator className="data-[state=inactive]:border-border data-[state=inactive]:text-muted-foreground data-[state=completed]:bg-success size-8 border-2 data-[state=completed]:text-white data-[state=inactive]:bg-transparent">
                  {step.icon}
                </StepperIndicator>
                <div
                  className={cn(
                    "flex flex-col gap-1",
                    index === 0
                      ? "items-start"
                      : index === steps.length - 1
                        ? "items-end"
                        : "items-center",
                  )}
                >
                  <div className="text-muted-foreground text-[10px] font-semibold uppercase">
                    Step {index + 1}
                  </div>
                  <StepperTitle
                    className={cn(
                      "group-data-[state=inactive]/step:text-muted-foreground text-base font-semibold",
                      index === 0
                        ? "text-start"
                        : index === steps.length - 1
                          ? "text-end"
                          : "text-center",
                    )}
                  >
                    {step.title}
                  </StepperTitle>
                  <div>
                    <Badge
                      size="sm"
                      variant="primary-light"
                      className="hidden group-data-[state=active]/step:inline-flex"
                    >
                      In Progress
                    </Badge>
                    <Badge
                      variant="success-light"
                      size="sm"
                      className="hidden group-data-[state=completed]/step:inline-flex"
                    >
                      Completed
                    </Badge>
                    <Badge
                      variant="secondary"
                      size="sm"
                      className="text-muted-foreground hidden group-data-[state=inactive]/step:inline-flex"
                    >
                      Pending
                    </Badge>
                  </div>
                </div>
              </StepperTrigger>

              {steps.length > index + 1 && (
                <StepperSeparator
                  className={cn(
                    "group-data-[state=completed]/step:bg-success absolute top-4 m-0 h-0.5 group-data-[orientation=horizontal]/stepper-nav:flex-none",
                    index === 0
                      ? "left-9 right-[calc(-50%+1rem)]"
                      : "left-[calc(50%+1rem)] right-[calc(-100%+2.25rem)]",
                  )}
                />
              )}
            </StepperItem>
          ))}
        </StepperNav>

        <StepperPanel className="text-sm">
          {stepComponents.map((StepComponent, index) => (
            <StepperContent
              key={index}
              value={index + 1}
              className="flex items-center justify-center w-full"
            >
              <StepComponent />
            </StepperContent>
          ))}
        </StepperPanel>
      </Stepper>
    </div>
  );
}
