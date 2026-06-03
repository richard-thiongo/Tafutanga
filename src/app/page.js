"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

/**
 * Performant native Intersection Observer wrapper for minimalist scroll animations.
 */
function FadeInWhenVisible({ children, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Check if browser supports Intersection Observer
    if (typeof window === "undefined" || !window.IntersectionObserver) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Trigger animation once
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -40px 0px" // Trigger slightly before the element fully enters viewport
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transform transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-1 flex-col overflow-x-hidden">
      {/* Hero Section */}
      <section className="w-full animate-hero-reveal">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center px-6 py-14 sm:py-20">
          <div className="flex h-28 w-28 sm:h-36 sm:w-36 items-center justify-center">
            <img
              src="/main-logo.png"
              alt="Tafutanga Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <p className="mt-6 text-lg font-medium text-muted-foreground">
            Are you house hunting or have any available houses?
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row justify-center w-full sm:w-auto">
            <Link
              href="/browse"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-95 transition-all hover:scale-[1.02] active:scale-95"
            >
              Look for houses
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/landlord/signin"
              className="inline-flex items-center justify-center rounded-2xl border border-border bg-card px-6 py-3 text-sm font-bold hover:bg-muted transition-all hover:scale-[1.02] active:scale-95"
            >
              List your house
            </Link>
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section className="w-full border-t border-border bg-muted/30">
        <div className="mx-auto w-full max-w-4xl px-6 py-14 sm:py-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">

            {/* How to look for a house */}
            <div className="flex flex-col gap-6">
              <FadeInWhenVisible>
                <h2 className="font-display text-primary text-2xl font-semibold sm:text-3xl">
                  How to look for a house
                </h2>
              </FadeInWhenVisible>

              <ol className="flex flex-col gap-4">
                <FadeInWhenVisible delay={150}>
                  <li className="rounded-2xl border border-border bg-background p-5">
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 w-10 shrink-0 rounded-full bg-muted px-2.5 py-1 text-center text-xs font-bold text-muted-foreground">
                        01
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold">Browse Listings</div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          Hit the "Look for houses" in the menu at the top.
                        </div>
                      </div>
                    </div>
                  </li>
                </FadeInWhenVisible>
              </ol>
            </div>

            {/* How to list a vacant room */}
            <div className="flex flex-col gap-6">
              <FadeInWhenVisible>
                <h2 className="font-display text-primary text-2xl font-semibold sm:text-3xl">
                  How to list a vacant room
                </h2>
              </FadeInWhenVisible>

              <ol className="flex flex-col gap-4">
                <FadeInWhenVisible delay={150}>
                  <li className="rounded-2xl border border-border bg-background p-5">
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 w-10 shrink-0 rounded-full bg-muted px-2.5 py-1 text-center text-xs font-bold text-muted-foreground">
                        01
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold">Access the Portal</div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          Hit the "List a house" in the menu at the top.
                        </div>
                      </div>
                    </div>
                  </li>
                </FadeInWhenVisible>

                <FadeInWhenVisible delay={300}>
                  <li className="rounded-2xl border border-border bg-background p-5">
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 w-10 shrink-0 rounded-full bg-muted px-2.5 py-1 text-center text-xs font-bold text-muted-foreground">
                        02
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold">Authentication</div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          Create an account or log in.
                        </div>
                      </div>
                    </div>
                  </li>
                </FadeInWhenVisible>

                <FadeInWhenVisible delay={450}>
                  <li className="rounded-2xl border border-border bg-background p-5">
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 w-10 shrink-0 rounded-full bg-muted px-2.5 py-1 text-center text-xs font-bold text-muted-foreground">
                        03
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold">Follow Dashboard Guide</div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          Then follow the guide in the dashboard.
                        </div>
                      </div>
                    </div>
                  </li>
                </FadeInWhenVisible>
              </ol>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-border bg-background">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
            <div className="font-bold">© {new Date().getFullYear()} Tafutanga</div>
            <div className="hidden h-4 w-px bg-border sm:block" aria-hidden="true" />
            <div className="font-medium italic">Made with ❤️ in Kenya</div>
          </div>
          <div className="flex items-center gap-1 font-medium">Nairobi, Kenya</div>
        </div>
      </footer>
    </div>
  );
}
