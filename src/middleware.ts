// middleware.ts (in your project root)
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isLoginPage = req.nextUrl.pathname === "/auth/login";
    const isApiAuthRoute = req.nextUrl.pathname.startsWith("/api/auth");

    // Allow API auth routes to pass through
    if (isApiAuthRoute) {
      return NextResponse.next();
    }

    // If user is on login page and is authenticated, redirect to dashboard
    if (isLoginPage && isAuth) {
      return NextResponse.redirect(new URL("/user-dashboard", req.url));
    }

    // If user is not authenticated and trying to access protected routes
    if (!isAuth && !isLoginPage) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/auth/login?callbackUrl=${encodeURIComponent(from)}`, req.url)
      );
    }

    // Role-based access control for admin routes
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (token?.role !== "admin") {
        return NextResponse.redirect(new URL("/user-dashboard", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Always allow access to login page, public assets, and API auth routes
        if (
          req.nextUrl.pathname === "/auth/login" ||
          req.nextUrl.pathname.startsWith("/api/auth") ||
          req.nextUrl.pathname.startsWith("/_next") ||
          req.nextUrl.pathname.startsWith("/images")
        ) {
          return true;
        }

        // For protected routes, require a valid token
        return !!token;
      },
    },
  }
);

// Specify which routes this middleware should run on
export const config = {
  matcher: ["/user-dashboard/:path*"],
};
