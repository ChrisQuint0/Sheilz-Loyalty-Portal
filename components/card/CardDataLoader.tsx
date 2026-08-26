"use client";

import { useState } from "react";
import { DigitalCard } from "@/components/card/DigitalCard";
import { LoyaltyProgressCard } from "@/components/card/LoyaltyProgressCard";
import { MembershipInfoCard } from "@/components/card/MembershipInfoCard";
import { SkeletonBlock } from "@/components/common/SkeletonBlock";
import type { DashboardSnapshot } from "@/lib/dashboard-data";

const fallbackCard = {
  customerName: "Customer",
  cardNumber: "N/A",
  memberSince: "N/A",
  qrValue: "",
  status: "Active",
  totalPurchases: 0,
  currentStamps: 0,
  targetStamps: 10,
};

export function CardDataLoader() {
  const [data] = useState<DashboardSnapshot | null>(() => {
    if (typeof window === "undefined") return null;

    try {
      const raw = sessionStorage.getItem("sheilz-dashboard-cache");
      return raw ? (JSON.parse(raw) as DashboardSnapshot) : null;
    } catch {
      return null;
    }
  });

  const isLoading = data === null;

  const cardData = data?.card ?? fallbackCard;
  const loyalty = data?.loyalty ?? {
    currentStamps: fallbackCard.currentStamps,
    targetStamps: fallbackCard.targetStamps,
  };

  const isEmptyCustomer = !isLoading && loyalty.currentStamps === 0 && (cardData.totalPurchases ?? 0) === 0;

  if (isLoading) {
    // Show skeleton placeholders while the client cache is initializing
    return (
      <div className="space-y-8" aria-live="polite" aria-busy="true">
        <div className="max-w-sm mx-auto">
          <div className="rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary to-rose-700 p-6 sm:p-8">
            <SkeletonBlock height="h-48" />
            <div className="mt-4">
              <SkeletonBlock height="h-6" width="w-3/4" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <div className="p-6">
              <SkeletonBlock height="h-6" width="w-1/3" className="mb-4" />
              <SkeletonBlock height="h-8" />
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="p-6">
              <SkeletonBlock height="h-6" width="w-1/3" className="mb-4" />
              <div className="space-y-3">
                <SkeletonBlock height="h-4" />
                <SkeletonBlock height="h-4" />
                <SkeletonBlock height="h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 delay-75">
      <DigitalCard
        customerName={cardData.customerName}
        cardNumber={cardData.cardNumber}
        memberSince={cardData.memberSince}
        qrValue={cardData.qrValue}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <LoyaltyProgressCard
            currentStamps={loyalty.currentStamps}
            targetStamps={loyalty.targetStamps}
            isEmpty={isEmptyCustomer}
          />
        </div>

        <div className="md:col-span-2">
          <MembershipInfoCard
            memberSince={cardData.memberSince}
            status={cardData.status}
            totalPurchases={cardData.totalPurchases}
            isCardMissing={cardData.cardNumber === "N/A"}
          />
        </div>
      </div>
    </div>
  );
}
