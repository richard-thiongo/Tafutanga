import Link from "next/link";
import { Building2 } from "lucide-react";
import { LandlordRedirectIfAuthed } from "../_components/LandlordRedirectIfAuthed";

export const metadata = {
  title: "Landlord access",
};

export default function LandlordAuthLayout({ children }) {
  return (
    <LandlordRedirectIfAuthed>
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Building2 className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="min-w-0 leading-tight">
              <div className="truncate text-base font-semibold">Tafutanga</div>
              <div className="truncate text-sm text-muted-foreground">Landlord access</div>
            </div>
          </Link>

          <Link
            href="/"
            className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Back to home
          </Link>
        </div>

        <div className="mt-10">{children}</div>
      </div>
    </LandlordRedirectIfAuthed>
  );
}

