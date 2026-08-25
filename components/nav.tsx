import { NavClient } from "@/components/nav-client";
import { localizedPath } from "@/i18n/routing";
import { getDictionary, getRequestLocale } from "@/i18n/server";

export async function Nav() {
  const locale = await getRequestLocale();
  const dictionary = await getDictionary(locale);
  const { nav } = dictionary;
  const links = [
    { href: localizedPath(locale, "/#modes"), label: nav.modes },
    { href: localizedPath(locale, "/#safety"), label: nav.why },
    { href: localizedPath(locale, "/#for"), label: nav.creators },
    { href: localizedPath(locale, "/competitors"), label: nav.compare },
    { href: localizedPath(locale, "/pricing"), label: nav.pricing },
    { href: localizedPath(locale, "/account"), label: nav.account }
  ];

  return <NavClient locale={locale} links={links} labels={nav} language={dictionary.language} />;
}
