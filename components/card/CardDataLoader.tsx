"use client";

import { useState } from "react";
import { DigitalCard } from "@/components/card/DigitalCard";
import { LoyaltyProgressCard } from "@/components/card/LoyaltyProgressCard";
import { MembershipInfoCard } from "@/components/card/MembershipInfoCard";
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

  const cardData = data?.card ?? fallbackCard;
  const loyalty = data?.loyalty ?? {
    currentStamps: fallbackCard.currentStamps,
    targetStamps: fallbackCard.targetStamps,
  };

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
          />
        </div>

        <div className="md:col-span-2">
          <MembershipInfoCard
            memberSince={cardData.memberSince}
            status={cardData.status}
            totalPurchases={cardData.totalPurchases}
          />
        </div>
      </div>
    </div>
  );
}
