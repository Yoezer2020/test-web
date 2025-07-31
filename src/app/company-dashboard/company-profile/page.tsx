"use client";

import CompanyProfilePage from "@/features/company-dashboard/components/company-profile/components/company-profile";

export default function Page({ params }: { params: { companyId: string } }) {
  return <CompanyProfilePage params={Promise.resolve(params)} />;
}
