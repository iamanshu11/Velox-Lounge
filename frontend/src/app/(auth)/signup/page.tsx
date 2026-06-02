"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { signupSchema, type SignupInput } from "@/lib/validations";
import { authService } from "@/services/auth";
import { useAuthStore } from "@/stores/auth.store";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [show, setShow] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupInput) => {
    try {
      const res = await authService.signup({
        email: data.email, password: data.password,
        first_name: data.first_name, last_name: data.last_name, phone: data.phone,
      });
      const { user, token } = res.data.data!;
      setAuth(user, token);
      toast({ title: "Account created!", description: `Welcome, ${user.first_name}!` });
      router.push("/dashboard");
    } catch (err: any) {
      toast({ title: "Signup failed", description: err?.response?.data?.error || "Something went wrong", variant: "destructive" });
    }
  };

  return (
  <div className="w-full max-w-lg rounded-2xl border bg-card p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
    <div className="mb-8 text-center flex flex-col items-center">
       <Image
                src="/logo.png"
                alt="Logo"
                width={120}
                height={40}
                priority
                className="h-auto w-auto object-contain mb-4"
              />
      <h2 className="text-2xl font-bold">Create Account</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Join DragonPass to access premium lounges worldwide
      </p>
    </div>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input
            id="first_name"
            placeholder="John"
            {...register("first_name")}
          />
          {errors.first_name && (
            <p className="text-xs text-destructive">
              {errors.first_name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            id="last_name"
            placeholder="Doe"
            {...register("last_name")}
          />
          {errors.last_name && (
            <p className="text-xs text-destructive">
              {errors.last_name.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">
          Phone
          <span className="ml-1 text-xs text-muted-foreground">
            (Optional)
          </span>
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+91 9876543210"
          {...register("phone")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>

        <div className="relative">
          <Input
            id="password"
            type={show ? "text" : "password"}
            placeholder="Minimum 8 characters"
            {...register("password")}
          />

          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            {show ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="text-xs text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">
          Confirm Password
        </Label>

        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          {...register("confirmPassword")}
        />

        {errors.confirmPassword && (
          <p className="text-xs text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full h-11"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>

    <p className="mt-6 text-center text-sm text-muted-foreground">
      Already have an account?{" "}
      <Link
        href="/login"
        className="font-medium text-primary hover:underline"
      >
        Sign In
      </Link>
    </p>
  </div>
);
}
