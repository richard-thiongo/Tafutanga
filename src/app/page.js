import {
  CheckCircle2,
  MapPin,
  ShieldCheck,
  SlidersHorizontal,
  Building2,
  HousePlus,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col overflow-x-hidden">
      <section className="w-full">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-10 px-6 py-14 sm:py-20 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm font-medium text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
              Tafutanga: Built for Nairobi & Thika Road
            </div>
            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Find a home in Nairobi & Thika Road.
            </h1>
            <p className="mt-5 max-w-md text-lg font-medium text-muted-foreground">
              Accurate details for houses along Thika Road and across Nairobi. Direct and simple.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-3 text-sm font-bold sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
                Accurate listings
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
                Powerful dashboard
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
                Unit management
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
                Live availability
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/browse"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-95"
              >
                Look for houses
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/landlord/signin"
                className="inline-flex items-center justify-center rounded-2xl border border-border bg-card px-6 py-3 text-sm font-bold hover:bg-muted"
              >
                List your house
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-muted/50" aria-hidden="true" />
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
              <div className="grid grid-cols-1 gap-4">
                <div className="rounded-2xl border border-border bg-background p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="truncate text-base font-bold">Premium Bedsitter, Kilimani</div>
                      <div className="mt-1 text-sm text-muted-foreground">Updated now</div>
                    </div>
                    <div className="shrink-0 rounded-full bg-primary px-3 py-1 text-xs font-black text-primary-foreground uppercase">KES 25k</div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-[10px] font-black uppercase tracking-wider">
                    <div className="rounded-xl bg-muted px-3 py-2 text-center text-muted-foreground">Water</div>
                    <div className="rounded-xl bg-muted px-3 py-2 text-center text-muted-foreground">Secure</div>
                    <div className="rounded-xl bg-muted px-3 py-2 text-center text-muted-foreground">Parking</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-border bg-background p-5 text-center">
                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Units</div>
                    <div className="mt-2 text-2xl font-black">5</div>
                  </div>
                  <div className="rounded-2xl border border-border bg-background p-5 text-center">
                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Live</div>
                    <div className="mt-2 text-2xl font-black">15</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full border-t border-border bg-background">
        <div className="mx-auto w-full max-w-5xl px-6 py-14 sm:py-20 text-center">
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl mb-4">Search or Manage.</h2>
          <p className="mx-auto mb-12 max-w-xl text-muted-foreground">
            Looking for a house? Browse our verified listings. Have properties to manage? Sign up to list them today.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard icon={SlidersHorizontal} title="Look for houses" description="Find homes by budget and area." />
            <FeatureCard icon={ShieldCheck} title="Live Data" description="Real-time availability updates." />
            <FeatureCard icon={Building2} title="Unit Management" description="Register your buildings easily." />
            <FeatureCard icon={LayoutDashboard} title="Modern Tools" description="Centralized property control." />
          </div>
        </div>
      </section>

      <section className="w-full border-t border-border bg-muted/30">
        <div className="mx-auto w-full max-w-5xl px-6 py-14 sm:py-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14 items-center">
            <div>
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">How it works.</h2>
              <p className="mt-2 text-muted-foreground">List your property in minutes.</p>
            </div>
            <ol className="grid gap-4">
              <StepRow step="01" title="Join" description="Create your management account." />
              <StepRow step="02" title="Register" description="Add your building details." />
              <StepRow step="03" title="List" description="Post your room vacancies." />
            </ol>
          </div>
        </div>
      </section>



      <footer className="w-full border-t border-border bg-background">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
            <div className="font-bold">© {new Date().getFullYear()} Tafutanga</div>
            <div className="hidden h-4 w-px bg-border sm:block" aria-hidden="true" />
            <div className="font-medium italic">Made for you by Richard</div>
          </div>
          <div className="flex items-center gap-1 font-medium">Nairobi & Thika Road, Kenya</div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
          <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        {/* min-w-0 ensures the flex child can shrink below its content size for truncation */}
        <div className="min-w-0">
          <div className="truncate font-semibold">{title}</div>
          <div className="mt-1 text-sm text-muted-foreground">{description}</div>
        </div>
      </div>
    </div>
  );
}

function StepRow({ step, title, description }) {
  return (
    <li className="rounded-2xl border border-border bg-background p-5">
      <div className="flex items-start gap-4">
        <div className="mt-0.5 w-12 shrink-0 rounded-full bg-muted px-3 py-1 text-center text-xs font-semibold text-muted-foreground">
          {step}
        </div>
        {/* Using min-w-0 to allow title truncation on small mobile screens */}
        <div className="min-w-0">
          <div className="truncate font-semibold">{title}</div>
          <div className="mt-1 text-sm text-muted-foreground">{description}</div>
        </div>
      </div>
    </li>
  );
}
