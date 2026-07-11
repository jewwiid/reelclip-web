import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { AccountClient } from "@/components/account-client";

export const metadata: Metadata = {
  title: "Account — ReelClips",
  description: "Manage your ReelClips subscription.",
};

export default async function AccountPage(props: {
  searchParams: Promise<{ checkout?: string }>;
}) {
  const sp = await props.searchParams;
  const justCheckedOut = sp.checkout === "success";

  return (
    <>
      <Nav />
      <main className="px-6 sm:px-10 py-12 sm:py-16 max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-wider text-accent font-bold mb-3">
            Account
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Your subscription
          </h1>
          <p className="text-base text-text-muted mt-4">
            Look up your tier, manage billing, or cancel anytime.
          </p>
        </div>

        {justCheckedOut ? (
          <div className="mb-8 rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm text-text text-center">
            🎉 Subscription active. Look up your account below to confirm.
          </div>
        ) : null}

        <AccountClient />
      </main>
      <Footer />
    </>
  );
}