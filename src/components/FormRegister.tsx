"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner"

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRegisterVoter } from "@/hooks/useRegister";
import axios from "axios";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .regex(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address."
    ),
});

const RegisterForm = () => {
  const { mutate, isPending } = useRegisterVoter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values.email, {
      onSuccess: () => {
        toast.success("Your e-mail has been added");
        form.reset();
      },

      onError: (error) => {
        if (axios.isAxiosError(error) && error.response?.status === 409) {
          toast.error("This email already exists");
          form.setError("email", { message: "This email already exists." });
        } else {
          toast.error("Something went wrong. Please try again");
          form.setError("email", { message: "Something went wrong. Please try again." });
        }
      },
    });
  }

  return (
    <div className="w-full max-w-md">
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  className="bg-background"
                  placeholder="you@example.com"
                  type="email"
                />
                <FieldDescription>
                  We'll never share your email with anyone.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Sending..." : "Send"}
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;