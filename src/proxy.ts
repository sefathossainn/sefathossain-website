import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Refreshes the Supabase session cookie and gates /admin. Unauthenticated
 * requests to any /admin route (except the login page) are redirected to login.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase isn't configured, don't hard-fail the app.
  if (!url || !anon) return response;

  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/login";

  if (!user && !isLogin) {
    const redirect = request.nextUrl.clone();
    redirect.pathname = "/admin/login";
    redirect.searchParams.set("next", pathname);
    return NextResponse.redirect(redirect);
  }

  if (user && isLogin) {
    const home = request.nextUrl.clone();
    home.pathname = "/admin";
    home.search = "";
    return NextResponse.redirect(home);
  }

  return response;
}

export const config = { matcher: ["/admin/:path*"] };
