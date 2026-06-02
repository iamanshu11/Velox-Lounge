"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import { forgotSchema } from "@/lib/validations";
import { authService } from "@/services/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [done, setDone] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<{ email: string }>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: { email: string }) => {
    try { await authService.forgotPassword(data.email); } catch { /* no-op */ }
    setDone(true);
  };

  if (done) {
  return (
    <div className="w-full max-w-lg rounded-2xl border bg-card p-8 shadow-2xl transition-all duration-300 hover:shadow-2xl">
      <div className="flex flex-col items-center text-center">
        <Image
          src="/logo.png"
          alt="Logo"
          width={120}
          height={40}
          priority
          className="h-auto w-auto object-contain"
        />

        <div className="mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-8 w-8 text-primary" />
        </div>

        <h2 className="mt-6 text-2xl font-bold tracking-tight">
          Check Your Email
        </h2>

        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          If an account exists for this email address, we've sent a password
          reset link.
        </p>

        <Link href="/login" className="mt-8 w-full">
          <Button
            variant="outline"
            className="h-11 w-full rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sign In
          </Button>
        </Link>
      </div>
    </div>
  );
}

  return (
  <div className="w-full max-w-lg rounded-2xl border bg-card p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
    <div className="flex flex-col items-center mb-10">
      <Image
        src="/logo.png"
        alt="Logo"
        width={120}
        height={40}
        priority
        className="h-auto w-auto object-contain"
      />

      <h2 className="mt-6 text-2xl font-bold tracking-tight text-center">
        Reset Password
      </h2>

      <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground">
        Enter your email address and we'll send you a password reset link.
      </p>
    </div>

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="email">
          Email Address
        </Label>

        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="h-11"
          {...register("email")}
        />

        {errors.email && (
          <p className="text-xs text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="h-11 w-full rounded-md font-medium"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending Reset Link...
          </>
        ) : (
          "Send Reset Link"
        )}
      </Button>
    </form>

    <div className="my-6 h-px bg-border" />

    <p className="text-center text-sm text-muted-foreground">
      Remember your password?{" "}
      <Link
        href="/login"
        className="font-semibold text-primary hover:underline"
      >
        Back to Sign In
      </Link>
    </p>
  </div>
);
}
