import RegisterForm from "@/components/FormRegister"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mb-20 text-center">
        <h1 className="text-4xl font-bold">Welcome to the Voting System</h1>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Please enter your email to register for the voting system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
      <div className="mt-20 text-center">
        <p className="mt-1 text-sm text-muted-foreground">
          4 Places Available
        </p>
      </div>
    </div>
  )
}