"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useVoteStore } from "@/store/useVoteStore";

const formSchema = z.object({
  n1: z
    .string()
    .min(1, "N1 is required.")
    .regex(
      /^[A-Z0-9]{12}$/,
      "N1 must be exactly 12 uppercase letters and numbers.",
    ),
});

const AuthStep = () => {
  const { mutate, isPending } = useAuth();
  const { next, setN1 } = useVoteStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { n1: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values.n1, {
      onSuccess: (data) => {
        if (data.is_N1_exist) {
          setN1(values.n1);
          toast.success("Authentication successful");
          next();
        } else {
          toast.error("Invalid N1 code");
          form.setError("n1", { message: "This N1 code does not exist." });
        }
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          toast.error("Invalid N1 code");
          form.setError("n1", { message: "This N1 code does not exist." });
        } else {
          toast.error("Something went wrong. Please try again.");
          form.setError("n1", {
            message: "Something went wrong. Please try again.",
          });
        }
      },
    });
  }

  return (
    <div className="w-full max-w-md mt-50">
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="n1"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>N1 Code</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  className="bg-background"
                  placeholder="Enter your N1 code"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Verifying..." : "Verify"}
        </Button>
      </form>
    </div>
  );
};

export default AuthStep;
