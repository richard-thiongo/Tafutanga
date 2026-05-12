import { Building2 } from "lucide-react";
import { LandlordGuard } from "../_components/LandlordGuard";
import { LandlordSidebar } from "./_components/LandlordSidebar";

export const metadata = {
  title: "Management",
};

export default function LandlordAppLayout({ children }) {
  return (
    <LandlordGuard>
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-8">
        <div className="rounded-3xl border border-border bg-card p-4 sm:p-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Building2 className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-base font-semibold">Management workspace</div>
              <div className="truncate text-sm text-muted-foreground">
                Manage units and listings for Tafutanga
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <LandlordSidebar />
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </LandlordGuard>
  );
}

