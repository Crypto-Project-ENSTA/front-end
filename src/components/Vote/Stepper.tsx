"use client";

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
  FileTextIcon,
  SendIcon,
  CheckIcon,
  LoaderCircleIcon,
} from "lucide-react";
import { useVoteStore } from "@/store/useVoteStore";

import AuthStep from "@/components/Vote/AuthStep";

const steps = [
  { title: "Authentication", icon: <KeyRoundIcon className="size-4" /> },
  { title: "Vote", icon: <FileTextIcon className="size-4" /> },
  { title: "Submit Vote", icon: <SendIcon className="size-4" /> },
];

const stepComponents = [
  AuthStep,
  () => <div>Vote</div>,
  () => <div>Submit Vote</div>,
];

export function VoteStepper() {
  const { currentStep, goTo } = useVoteStore();

  return (
    <Stepper
      value={currentStep + 1}
      onValueChange={(val) => goTo(val - 1)}
      indicators={{
        completed: <CheckIcon className="size-3.5" />,
        loading: <LoaderCircleIcon className="size-3.5 animate-spin" />,
      }}
      className="w-full max-w-5xl space-y-8"
    >
      <StepperNav className="gap-3">
        {steps.map((step, index) => (
          <StepperItem
            key={index}
            step={index + 1}
            className="relative flex-1 items-start"
          >
            <StepperTrigger
              className="flex grow flex-col items-start justify-center gap-2.5"
              asChild
            >
              <StepperIndicator className="data-[state=inactive]:border-border data-[state=inactive]:text-muted-foreground data-[state=completed]:bg-success size-8 border-2 data-[state=completed]:text-white data-[state=inactive]:bg-transparent">
                {step.icon}
              </StepperIndicator>
              <div className="flex flex-col items-start gap-1">
                <div className="text-muted-foreground text-[10px] font-semibold uppercase">
                  Step {index + 1}
                </div>
                <StepperTitle className="group-data-[state=inactive]/step:text-muted-foreground text-start text-base font-semibold">
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
              <StepperSeparator className="group-data-[state=completed]/step:bg-success absolute inset-x-0 inset-s-9 top-4 m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none" />
            )}
          </StepperItem>
        ))}
      </StepperNav>

      <StepperPanel className="text-sm">
        {stepComponents.map((StepComponent, index) => (
          <StepperContent
            key={index}
            value={index + 1}
            className="flex items-center justify-center"
          >
            <StepComponent />
          </StepperContent>
        ))}
      </StepperPanel>
    </Stepper>
  );
}
