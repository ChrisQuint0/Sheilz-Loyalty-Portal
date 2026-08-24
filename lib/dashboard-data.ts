import { createSupabaseServerClient } from "@/lib/supabase/server";

export type DashboardSnapshot = {
  customer: {
    firstName: string;
    lastName: string;
  };
  loyalty: {
    currentStamps: number;
    targetStamps: number;
  };
  card: {
    customerName: string;
    cardNumber: string;
    memberSince: string;
    qrValue: string;
    status: string;
    totalPurchases: number;
  };
  recentPurchases: Array<{
    id: string;
    drink: string;
    date: string;
    earnedStamp: boolean;
    isRewardRedeemed?: boolean;
  }>;
};

type LoyaltyEvent = {
  id: string;
  event_type?: string | null;
  description?: string | null;
  points_change?: number | null;
  created_at?: string | null;
};

export async function getDashboardData(email: string | null): Promise<DashboardSnapshot> {
  const supabase = await createSupabaseServerClient();

  const { data: customer, error } = await supabase
    .from("customers")
    .select(
      `
        id,
        First_name,
        last_name,
        email_address,
        loyalty_progress,
        membership_date,
        card_status,
        card_number,
        loyalty_log (
          id,
          event_type,
          description,
          points_change,
          created_at
        )
      `,
    )
    .eq("email_address", email ?? "")
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load dashboard: ${error.message}`);
  }

  const customerRecord = customer as { loyalty_log?: LoyaltyEvent[] } | null;
  const loyaltyEvents = Array.isArray(customerRecord?.loyalty_log)
    ? customerRecord.loyalty_log ?? []
    : [];

  const recentPurchases = loyaltyEvents
    .slice()
    .sort((a, b) => {
      const aTime = a.created_at ? new Date(a.created_at).getTime() : 0;
      const bTime = b.created_at ? new Date(b.created_at).getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, 4)
    .map((event) => {
      const eventType = event.event_type ?? "Loyalty Event";
      const description = event.description ?? eventType;
      const earnedStamp = Number(event.points_change ?? 0) > 0;
      const isRewardRedeemed =
        /redeem|reward/i.test(eventType) || /redeem|reward/i.test(description);

      return {
        id: event.id,
        drink: description,
        date: event.created_at
          ? new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
            }).format(new Date(event.created_at))
          : "Recent",
        earnedStamp,
        isRewardRedeemed: isRewardRedeemed && !earnedStamp,
      };
    });

  const currentStamps = Number(customer?.loyalty_progress ?? 0);
  const targetStamps = 10;
  const cardNumber = customer?.card_number ?? "N/A";
  const memberSince = customer?.membership_date
    ? new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date(customer.membership_date))
    : "N/A";

  return {
    customer: {
      firstName: customer?.First_name ?? "Customer",
      lastName: customer?.last_name ?? "",
    },
    loyalty: {
      currentStamps: Number.isFinite(currentStamps) ? currentStamps : 0,
      targetStamps:
        Number.isFinite(targetStamps) && targetStamps > 0 ? targetStamps : 10,
    },
    card: {
      customerName:
        `${customer?.First_name ?? "Customer"} ${customer?.last_name ?? ""}`.trim(),
      cardNumber,
      memberSince,
      qrValue: cardNumber.replace(/\s+/g, ""),
      status: customer?.card_status === false ? "Inactive" : "Active",
      totalPurchases: loyaltyEvents.length,
    },
    recentPurchases,
  };
}
