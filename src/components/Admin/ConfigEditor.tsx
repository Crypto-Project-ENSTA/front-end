"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { PlusIcon, Trash2Icon } from "lucide-react";

import { useVotingTheme } from "@/hooks/useTheme";
import { useUpdateTheme } from "@/hooks/useUpdateConfig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { type Resolver } from "react-hook-form";

const formSchema = z.object({
  vote_theme: z.string().min(1, "Theme is required."),
  num_voters: z.coerce.number().int().min(1, "Must be at least 1 voter."),
  choices: z
    .array(z.object({ value: z.string().min(1, "Choice cannot be empty.") }))
    .min(2, "At least 2 choices are required."),
});

type FormValues = z.infer<typeof formSchema>;

export default function ThemeEditor() {
  const { data, isLoading } = useVotingTheme();
  const { mutate, isPending } = useUpdateTheme();

  const form = useForm<FormValues, unknown, FormValues>({
    resolver: zodResolver(formSchema) as Resolver<FormValues>,
    defaultValues: {
      vote_theme: "",
      num_voters: 1,
      choices: [{ value: "" }, { value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "choices",
  });

  useEffect(() => {
    if (data) {
      form.reset({
        vote_theme: data.vote_theme,
        num_voters: data.num_voters,
        choices: data.choices.map((c) => ({ value: c })),
      });
    }
  }, [data, form]);

  function onSubmit(values: FormValues) {
    mutate(
      {
        vote_theme: values.vote_theme,
        num_voters: values.num_voters,
        choices: values.choices.map((c) => c.value),
      },
      {
        onSuccess: () => toast.success("Theme updated successfully."),
        onError: () => toast.error("Failed to update theme."),
      },
    );
  }

  if (isLoading)
    return (
      <Card>
        <CardContent className="flex h-40 items-center justify-center">
          <Spinner className="size-6" />
        </CardContent>
      </Card>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vote Theme</CardTitle>
        <CardDescription>
          Configure the vote topic, candidate choices, and maximum voter count.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Theme */}
            <Controller
              name="vote_theme"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Vote Theme</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    className="bg-background"
                    placeholder="e.g. Best Framework 2025"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Max voters */}
            <Controller
              name="num_voters"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Max Voters</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="number"
                    min={1}
                    className="bg-background"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          {/* Choices */}
          <div className="space-y-3">
            <FieldLabel>Choices</FieldLabel>
            {fields.map((field, index) => (
              <Controller
                key={field.id}
                name={`choices.${index}.value`}
                control={form.control}
                render={({ field: f, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex gap-2">
                      <Input
                        {...f}
                        className="bg-background"
                        placeholder={`Choice ${index + 1}`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled={fields.length <= 2}
                        onClick={() => remove(index)}
                        className="shrink-0 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2Icon className="size-4" />
                      </Button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ value: "" })}
              className="gap-2"
            >
              <PlusIcon className="size-4" />
              Add Choice
            </Button>
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
