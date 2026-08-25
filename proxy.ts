import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE } from "@/i18n/config";
import { localeFromPathname } from "@/i18n/routing";

function withLocaleHeader(request: NextRequest, locale: string) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-reelclip-locale", locale);
  return requestHeaders;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = localeFromPathname(pathname);

  if (!locale) {
    return NextResponse.next({
      request: { headers: withLocaleHeader(request, DEFAULT_LOCALE) }
    });
  }

  const url = request.nextUrl.clone();
  const rewrittenPathname = pathname.slice(locale.length + 1) || "/";
  url.pathname = rewrittenPathname;

  return NextResponse.rewrite(url, {
    request: { headers: withLocaleHeader(request, locale) }
  });
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"]
};
