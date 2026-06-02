"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore }  from "@/stores/auth.store";
import { profileService } from "@/services/profile";
import { profileSchema, passwordSchema, type ProfileInput, type PasswordInput } from "@/lib/validations";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input }  from "@/components/ui/input";
import { Label }  from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, User, Lock, Shield } from "lucide-react";
import { formatDate, initials, fullName } from "@/utils/format";

export default function ProfilePage() {
  const { user, setUser } = useAuthStore();
  const [profileSaving,  setProfileSaving]  = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  const pf = useForm<ProfileInput>({ resolver: zodResolver(profileSchema),
    defaultValues: { first_name: user?.first_name || "", last_name: user?.last_name || "", phone: user?.phone || "" } });

  const pw = useForm<PasswordInput>({ resolver: zodResolver(passwordSchema) });

  const saveProfile = async (data: ProfileInput) => {
    setProfileSaving(true);
    try {
      const r = await profileService.update(data);
      setUser(r.data.data!);
      toast({ title: "Profile updated" });
    } catch (err: any) {
      toast({ title: "Error", description: err?.response?.data?.error, variant: "destructive" });
    } finally { setProfileSaving(false); }
  };

  const savePassword = async (data: PasswordInput) => {
    setPasswordSaving(true);
    try {
      await profileService.changePassword({ currentPassword: data.currentPassword, newPassword: data.newPassword });
      pw.reset();
      toast({ title: "Password changed" });
    } catch (err: any) {
      toast({ title: "Error", description: err?.response?.data?.error, variant: "destructive" });
    } finally { setPasswordSaving(false); }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your account details and security</p>
      </div>

      {/* Overview card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-5">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.avatar_url ?? undefined} />
              <AvatarFallback className="bg-brand-100 text-brand-700 text-xl font-bold">
                {user ? initials(user) : "?"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{user ? fullName(user) : ""}</h2>
              <p className="text-muted-foreground text-sm">{user?.email}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <Badge variant={user?.role === "ADMIN" ? "default" : "secondary"} className="text-xs">
                  <Shield className="h-3 w-3 mr-1" />{user?.role}
                </Badge>
                {user?.is_verified && <Badge variant="success" className="text-xs">Verified</Badge>}
              </div>
            </div>
          </div>
          {user?.created_at && (
            <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-xs text-muted-foreground">Member since</p><p className="font-medium">{formatDate(user.created_at)}</p></div>
              {user.last_login_at && <div><p className="text-xs text-muted-foreground">Last login</p><p className="font-medium">{formatDate(user.last_login_at)}</p></div>}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Personal info */}
      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><User className="h-4 w-4 text-brand-500" /> Personal Information</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={pf.handleSubmit(saveProfile)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First name</Label>
                <Input {...pf.register("first_name")} />
                {pf.formState.errors.first_name && <p className="text-xs text-destructive">{pf.formState.errors.first_name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>Last name</Label>
                <Input {...pf.register("last_name")} />
                {pf.formState.errors.last_name && <p className="text-xs text-destructive">{pf.formState.errors.last_name.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user?.email || ""} disabled className="bg-muted" />
              <p className="text-xs text-muted-foreground">Email cannot be changed</p>
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input {...pf.register("phone")} placeholder="+1 555 0100" />
            </div>
            <Button type="submit" disabled={profileSaving}>
              {profileSaving ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</> : "Save changes"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Password */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2"><Lock className="h-4 w-4 text-brand-500" /> Change Password</CardTitle>
          <CardDescription>Use a strong password with at least 8 characters</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={pw.handleSubmit(savePassword)} className="space-y-4">
            {[
              { name:"currentPassword" as const, label:"Current password" },
              { name:"newPassword"     as const, label:"New password" },
              { name:"confirmNewPassword" as const, label:"Confirm new password" },
            ].map(({ name, label }) => (
              <div key={name} className="space-y-2">
                <Label>{label}</Label>
                <Input type="password" {...pw.register(name)} />
                {pw.formState.errors[name] && <p className="text-xs text-destructive">{pw.formState.errors[name]?.message}</p>}
              </div>
            ))}
            <Button type="submit" variant="outline" disabled={passwordSaving}>
              {passwordSaving ? <><Loader2 className="h-4 w-4 animate-spin" /> Updating...</> : "Update password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
