"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";
import { resetSchema } from "@/lib/validations";
import { authService } from "@/services/auth";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

type ResetForm = { token: string; password: string; confirmPassword: string };

export default function ResetPasswordPage() {
  const router = useRouter();
  const token = useSearchParams().get("token") || "";
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetForm>({
    resolver: zodResolver(resetSchema),
    defaultValues: { token },
  });

  const onSubmit = async (data: ResetForm) => {
    try {
      await authService.resetPassword(data.token, data.password);
      setDone(true);
    } catch (err: any) {
      toast({
        title: "Reset failed",
        description: err?.response?.data?.error || "Link may be expired",
        variant: "destructive",
      });
    }
  };

  if (done) {
    return (
      <div className="w-full max-w-lg rounded-2xl border bg-card p-8 shadow-xl transition-all duration-300 hover:shadow-2xl text-center">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-primary" />
        </div>

        <h2 className="mt-6 text-2xl font-bold">Password Updated</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Your password has been reset successfully.
        </p>

        <Link href="/login" className="block mt-6">
          <Button className="w-full">Sign In</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg rounded-2xl border bg-card p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold">Set New Password</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Choose a strong password for your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <input type="hidden" {...register("token")} />

        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>

          <div className="relative">
            <Input
              id="password"
              type={show ? "text" : "password"}
              placeholder="Enter new password"
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
          <Label htmlFor="confirmPassword">Confirm Password</Label>

          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            {...register("confirmPassword")}
          />

          {errors.confirmPassword && (
            <p className="text-xs text-destructive">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full h-11" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating Password...
            </>
          ) : (
            "Update Password"
          )}
        </Button>

        <div className="text-center">
          <Link href="/login" className="text-sm text-primary hover:underline">
            Back to Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
