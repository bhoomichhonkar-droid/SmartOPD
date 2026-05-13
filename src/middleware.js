import { NextResponse } from "next/server";

export function middleware(req) {

  const role = req.cookies.get("role")?.value;
  const url = req.nextUrl.pathname;

  // 🔐 PROTECT HOME PAGE TOO
  if (url === "/") {
    if (!role) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // ADMIN PROTECTION
  if (url.startsWith("/admin")) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // DOCTOR PROTECTION
  if (url.startsWith("/queue")) {
    if (role !== "doctor" && role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}