"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ForgotPasswordDialog } from "./dialog-password";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "admin" && password === "admin") {
      router.push("/admin/dashboard");
    } else {
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl text-center">Cosecom®</CardTitle>
          <CardDescription className="text-center">
            <p className="mb-2">This login is restricted to administrators.</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@dataraj.com"
                required
              />
            </div>

            <div className="grid gap-2 relative">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <ForgotPasswordDialog>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </ForgotPasswordDialog>
              </div>

              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="absolute bottom-4 right-4 size-5" />
                ) : (
                  <Eye className="absolute bottom-4 right-4 size-5" />
                )}
              </button>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm select-text">
                {errorMessage}
                <span className="block">Email: admin</span>
                <span>Password: admin</span>
              </p>
            )}

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
