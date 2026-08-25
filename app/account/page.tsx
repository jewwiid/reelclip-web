import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { AccountClient } from "@/components/account-client";
import { getDictionary } from "@/i18n/server";

export const metadata: Metadata = {
  title: "Account · ReelClip",
  description: "Manage your ReelClip subscription.",
};

export default async function AccountPage(props: {
  searchParams: Promise<{ checkout?: string }>;
}) {
  const sp = await props.searchParams;
  const justCheckedOut = sp.checkout === "success";
  const { account } = await getDictionary();

  return (
    <>
      <Nav />
      <main className="px-6 sm:px-10 py-12 sm:py-16 max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-wider text-accent font-bold mb-3">
            {account.eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            {account.heading}
          </h1>
          <p className="text-base text-text-muted mt-4">
            {account.intro}
          </p>
        </div>

        {justCheckedOut ? (
          <div className="mb-8 rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm text-text text-center">
            {account.checkoutSuccess}
          </div>
        ) : null}

        <AccountClient />
      </main>
      <Footer />
    </>
  );
}
