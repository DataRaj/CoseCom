import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ForgotPasswordDialog({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Password Reset</DialogTitle>
          <DialogDescription>
            We&apos;ve sent a password reset link to your email address.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>
            Please check your email inbox and follow the instructions to reset
            your password.
          </p>
          <p className="mt-2">
            If you don&apos;t receive the email within a few minutes, please
            check your spam folder.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
