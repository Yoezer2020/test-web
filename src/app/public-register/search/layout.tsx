import type React from "react";
import type { Metadata } from "next";
import { PublicHeader } from "@/features/public-register/search/components/public-header";
import PageContainer from "@/components/layout/page-container";
import { Footer } from "@/features/public-register/search/components/footer";

export const metadata: Metadata = {
  title: "Public Register - Business Registry",
  description: "Search and view registered business entities",
};

export default function PublicRegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <PublicHeader />
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
}
